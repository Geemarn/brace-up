import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import SideNavList from "./SideNavList";
import DropdownItemContainer from "../../../_shared/styles/DropdownItemContainer";
import StyledNightMode from "../../../_shared/styles/nightMode";
import PropTypes from "prop-types";
import FormDialog from "../../../_shared/components/Dialog/FormDialog";
import ConfirmDialog from "../../../_shared/components/Dialog/ConfirmDialog";
import TodoFormDialog from "../_shared/TodoFormDialog";
import { Collapse, Button } from "reactstrap";
import DropdownItem from "./DropdownItem";
import StyleFooter from "../../../_shared/styles/footer";
import StyleLogout from "../../../_shared/styles/logout";
import {
  logOut,
  navigateTo,
  fetchTodos,
  createTodo,
  deleteTodo,
  todoStatusUpdate
} from "../../../redux/actions";

const propTypes = {
  logout: PropTypes.func
};

const SideNav = props => {
  const {
    logOut,
    navigateTo,
    fetchTodos,
    createTodo,
    todos,
    todo,
    user,
    nightMode,
    setNightMode,
    todoStatusUpdate,
    isDeletingTodo,
    id: { id },
    isCreatingTodo,
    deleteTodo
  } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [viewTodoForm, setViewTodoForm] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(
    localStorage.getItem(`todoCurrentList/${user.id}`)
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dconfirmDialogOpen, setConfirmDialogOpen] = useState(false);

  useEffect(() => {
    if (id !== undefined) {
      localStorage.setItem(`todoCurrentList/${user.id}`, id);
    }
  }, [id, user.id]);

  useEffect(() => {
    if (currentIdx) {
      navigateTo(`/dashboard/${currentIdx}`);
    }
  }, [currentIdx, navigateTo]);

  // useEffect(() => {
  //   fetchTodos();
  // }, [fetchTodos]);

  const handleCurrentTodoOnclick = todo => {
    setCurrentIdx(prev => todo._id);
    navigateTo(`/dashboard/${todo._id}`);
  };

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

  const updateStatus = value => {
    const payload = {
      status: value
    };
    if (todo && todo.status !== value) {
      todoStatusUpdate(payload, id);
    }
  };

  const handleDelete = () => {
    deleteTodo(id);
    setConfirmDialogOpen(false);
    const todoId = todos && todos.findIndex(todo => todo._id === id);
    // navigate to after delete
    if (todoId === todos.length - 1 && todos.length !== 1) {
      navigateTo(`/dashboard/${todos && todos[0] && todos[0]._id}`);
    } else if (todos.length === 1) {
      navigateTo(`/dashboard/${""}`);
    } else {
      navigateTo(
        `/dashboard/${todos && todos[todoId + 1] && todos[todoId + 1]._id}`
      );
    }
    //remove all task checks in LS
    const keys = todo.tasks.map(task => task._id);
    for (var key of keys) {
      localStorage.removeItem(`checker-${key}`);
    }
  };

  return (
    <Fragment>
      <div>
        <div className="mb-4 text-center">
          <span className="px-2 pb-1 pt-4 bg-light shadow rounded">
            <span className="h3 font-weight-bold text-info ">Brace</span>
            <span className="h1 text-success font-weight-bolder">UP</span>
          </span>
        </div>
        <StyledNightMode>
          <span>Nightmode </span>
          <label className="switch">
            <input
              type="checkbox"
              checked={nightMode}
              onChange={setNightMode}
            />
            <span className="slider round" />
          </label>
        </StyledNightMode>
        <SideNavList
          text={"My Todo"}
          icon={"fas fa-briefcase"}
          dropDown={true}
          borderBottom
          openToggle={isOpen}
          onClick={() => setIsOpen(prev => !prev)}
        />
        <Collapse isOpen={isOpen}>
          <div
            style={{
              backgroundImage:
                "radial-gradient(circle, #fff, rgba(50, 200, 255, 0.1), #fff)"
            }}
          >
            {todos.length < 1 ? (
              <div className="p-3">
                <div className="display-5 text-center">
                  <strong>You do not have a todo yet</strong>
                </div>
              </div>
            ) : (
              <DropdownItemContainer>
                {todos.map((todo, idx) => {
                  return (
                    <DropdownItem
                      key={idx}
                      text={todo.title}
                      current={id === todo._id ? true : false}
                      onClick={() => handleCurrentTodoOnclick(todo)}
                      onClickDelete={() => setConfirmDialogOpen(prev => !prev)}
                    />
                  );
                })}
              </DropdownItemContainer>
            )}
            <div className="text-right">
              <Button
                color="info"
                size="xs"
                className=" my-3 mr-2"
                onClick={() => setViewTodoForm(prev => !prev)}
              >
                Create new todo
              </Button>
            </div>
          </div>
        </Collapse>
        <SideNavList
          text={"Pending"}
          icon={`far fa-dot-circle ${
            todo && todo.status === "Pending" ? "text-warning" : ""
          }`}
          className="pt-3"
          onClickStatus={() => updateStatus("Pending")}
        />
        <SideNavList
          text={"In progress"}
          icon={`fas fa-spinner ${
            todo && todo.status === "Progress" ? "text-warning" : ""
          }`}
          onClickStatus={() => updateStatus("Progress")}
        />
        <SideNavList
          text={"Conpleted"}
          icon={`far fa-check-circle ${
            todo && todo.status === "Completed" ? "text-warning" : ""
          }`}
          onClickStatus={() => updateStatus("Completed")}
        />
        <StyleLogout onClick={logOut}>
          <SideNavList text={"Log Out"} icon={"fas fa-sign-out-alt"} />
        </StyleLogout>
        <StyleFooter>
          &copy; {new Date().getFullYear()}, Adegoke@ReactMaster
        </StyleFooter>
      </div>
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
      <ConfirmDialog
        loading={isDeletingTodo}
        showDialog={dconfirmDialogOpen}
        onHide={() => setConfirmDialogOpen(false)}
        handleClose={() => setConfirmDialogOpen(prev => !prev)}
        handleConfirm={handleDelete}
        nightMode={nightMode}
      />
    </Fragment>
  );
};
SideNav.propTypes = propTypes;

const dispatchProps = {
  logOut,
  navigateTo,
  fetchTodos,
  createTodo,
  deleteTodo,
  todoStatusUpdate
};

const mapStateToProps = state => ({
  user: state.auth.user.data,
  todos: state.todo.byList,
  todo: state.todo.current,
  isCreatingTodo: state.ui.loading["createTodo"],
  isDeletingTodo: state.ui.loading["deleteTodo"]
});

export default connect(mapStateToProps, dispatchProps)(SideNav);
