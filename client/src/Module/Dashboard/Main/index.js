import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button } from "reactstrap";
import Progress from "../../../_shared/components/Progress";
import { ThemeProvider } from "styled-components";
import StyledSideNav from "../../../_shared/styles/sideNav";
import StyledMain from "../../../_shared/styles/mainContainer";
import { capitalizeFirstLetter } from "../../../utils";
import SideNav from "../SideNav";
import SingleTodoDetails from "./SingleTodoDetails";
import { getCurrentUser, fetchTodos, createTodo } from "../../../redux/actions";
import FormDialog from "../../../_shared/components/Dialog/FormDialog";
import TodoFormDialog from "../_shared/TodoFormDialog";
import Cry from "../_shared/cry";
import Moment from "moment";

const themeDark = {
  bgColor: "#353535",
  bgColor2: "#353535",
  sideBgColor: "#353535",
  sideBorder: "1px solid #17a2b8",
  sideBorder2: "0.5px solid #17a2b8",
  border: "0.5px solid #aaa",
  color: "#f5f5f5",
  iconColor: "#17a2b8",
  reverseColor: "#353535"
};
const themeLight = {
  bgColor: "whitesmoke",
  bgColor2: "#17a2b8",
  sideBgColor: "#17a2b8",
  sideBorder2: "0.5px solid #fff",
  sideBorder: "none",
  border: "0.1px solid rgba(100, 200, 200, 0.5)",
  color: "#353535",
  iconColor: "#fff",
  reverseColor: "#f5f5f5"
};

const Main = props => {
  const {
    user,
    fetchTodos,
    todos,
    isFetchingTodo,
    createTodo,
    isCreatingTodo,
    match: { params }
  } = props;
  const [date, setDate] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [viewTodoForm, setViewTodoForm] = useState(false);
  const [nightMode, setNightMode] = useState(
    JSON.parse(localStorage.getItem(`toggleNightMode/${user.id}`))
  );

  // call greeting function
  const callGreeting = () => {
    const myDate = new Date();
    var hrs = myDate.getHours();
    var greet;
    if (hrs < 12) {
      greet = "Good Morning";
    } else if (hrs >= 12 && hrs <= 17) {
      greet = "Good Afternoon";
    } else if (hrs >= 17 && hrs <= 24) {
      greet = "Good Evening";
    }
    return greet;
  };

  useEffect(() => {
    localStorage.setItem(
      `toggleNightMode/${user.id}`,
      JSON.stringify(nightMode)
    );
  }, [nightMode, user.id]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  useEffect(() => {
    setTimeout(() => {
      setDate(new Date());
      callGreeting();
    }, 60000);
  }, [date]);

  const updateDone = update => {
    if (!update && dialogOpen) {
      setViewTodoForm(false);
      setDialogOpen(false);
    }
  };

  const handleSubmit = value => {
    setDialogOpen(true);
    createTodo(value);
  };

  return (
    <ThemeProvider theme={nightMode ? themeDark : themeLight}>
      <StyledSideNav>
        <SideNav
          id={params}
          nightMode={nightMode}
          setNightMode={() => setNightMode(prev => !prev)}
        />
      </StyledSideNav>
      <StyledMain>
        <div className="mb-4">
          <h4 className="pt-3 mb-0 text font-weight-bold">
            {callGreeting()},{" "}
            <strong className="h3 text-info">
              {capitalizeFirstLetter(user && user.username)}
            </strong>
          </h4>
          <h6 className="text">{Moment(date).format("LLL")}</h6>
        </div>
        {!isFetchingTodo ? (
          !todos.length ? (
            <div className="text-center">
              <Cry />
              <h4 className=" text">You do not have a todo yet</h4>
              <Button
                color="info"
                className="px-5"
                onClick={() => setViewTodoForm(prev => !prev)}
              >
                Create Todo
              </Button>
            </div>
          ) : (
            <div>
              <SingleTodoDetails id={params} nightMode={nightMode} />
            </div>
          )
        ) : (
          <div className="pt-5">
            <Progress className="alt" />
          </div>
        )}
      </StyledMain>
      <FormDialog
        title="Create new Todo"
        size="md"
        titleBadgeColor={"info"}
        showDialog={viewTodoForm}
        handleClose={() => setViewTodoForm(prev => !prev)}
        formProps={{
          updateDone,
          onSubmit: handleSubmit,
          formLoading: isCreatingTodo,
          nightMode
        }}
        nightMode={nightMode}
        FormComponent={TodoFormDialog}
      />
    </ThemeProvider>
  );
};

const dispatchProps = {
  getCurrentUser,
  fetchTodos,
  createTodo
};

const mapStateToProps = state => ({
  user: state.auth.user.data,
  todos: state.todo.byList,
  isFetchingTodo: state.ui.loading["fetchTodos"],
  isCreatingTodo: state.ui.loading["createTodo"]
});

export default connect(mapStateToProps, dispatchProps)(Main);
