import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { ReactComponent as Undrawn } from "../../../_shared/assets/images/undraw_no_data_qbuo.svg";
import { capIstLetterSentence } from "../../../utils";
import Progress from "../../../_shared/components/Progress";
import TaskForm from "../_shared/TaskForm";
import Status from "../_shared/Status";
import FormDialog from "../../../_shared/components/Dialog/FormDialog";
import TaskList from "./TaskList";
import { Button } from "reactstrap";
import {
  fetchTodo,
  createTask,
  editTask,
  deleteTask
} from "../../../redux/actions";

const SingleTodoDetails = props => {
  const {
    fetchTodo,
    createTask,
    editTask,
    deleteTask,
    todo,
    isFetchingTodo,
    isCreatingTask,
    nightMode,
    isUpdatingStatus,
    id: { id }
  } = props;
  const [todoId, setTodoId] = useState("");
  const [viewTaskForm, setViewTaskForm] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    fetchTodo(id);
  }, [fetchTodo, id]);

  const updateDone = update => {
    if (!update && dialogOpen) {
      setViewTaskForm(false);
      setDialogOpen(false);
    }
  };

  const handleSubmit = value => {
    setDialogOpen(true);
    createTask(value, todoId);
  };

  const handleTaskEdit = (value, taskId) => {
    editTask(value, todo._id, taskId);
  };

  const handleDelete = taskId => {
    deleteTask(todo._id, taskId);
  };

  return (
    <Fragment>
      {!isFetchingTodo && todo ? (
        <div
          className={` p-2 shadow-sm ${
            !nightMode ? " border border-light" : "border border-dark"
          } `}
        >
          <h4 className="h4 text font-weight-bold">
            <i className="fa fa-briefcase pr-4 text-info h5" />
            {capIstLetterSentence(todo.title)}
            <span
              className={`ml-3 badge badge-pill badge-${
                Status(todo).statusClassName
              }`}
            >
              <small>
                {!isUpdatingStatus ? (
                  todo.status
                ) : (
                  <Progress className="alt text-left" />
                )}
              </small>
            </span>
          </h4>
          <h6 className=" mt-2 text pl-4 ml-3 ">
            {capIstLetterSentence(todo.description)}
          </h6>
        </div>
      ) : (
        <Progress className="alt text-left" />
      )}
      {!isFetchingTodo && todo ? (
        !todo.tasks.length ? (
          <div className="ml-5 text-center mt-5">
            <Undrawn />
            <div>
              <h4 className=" text">Your task list is empty</h4>
              <Button
                color="info"
                className=" px-5"
                onClick={() => (
                  setViewTaskForm(prev => !prev), setTodoId(todo._id)
                )}
              >
                Add Task
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-4 mt-5">
              <span className="h5 mt-5">
                <i className="far fa-clipboard text-info mr-2"></i>
                <span className="text ">Your Tasks</span>
              </span>
              <span className="float-right">
                <Button
                  color="info"
                  onClick={() => (
                    setViewTaskForm(prev => !prev), setTodoId(todo._id)
                  )}
                >
                  <i className="fas fa-plus" /> Add Task
                </Button>
              </span>
            </div>
            {todo.tasks.map(({ description, _id }) => {
              return (
                <TaskList
                  key={_id}
                  taskId={_id}
                  description={description}
                  onEdit={handleTaskEdit}
                  onDelete={handleDelete}
                />
              );
            })}
          </div>
        )
      ) : (
        <Progress className="alt" />
      )}
      <FormDialog
        title="Add Task"
        size="sm"
        titleBadgeColor={"info"}
        showDialog={viewTaskForm}
        handleClose={() => setViewTaskForm(prev => !prev)}
        formProps={{
          updateDone,
          onSubmit: handleSubmit,
          formLoading: isCreatingTask,
          nightMode
        }}
        nightMode={nightMode}
        FormComponent={TaskForm}
      />
    </Fragment>
  );
};

const dispatchProps = {
  fetchTodo,
  createTask,
  editTask,
  deleteTask
};

const mapStateToProps = state => ({
  todo: state.todo.current,
  isFetchingTodo: state.ui.loading["fetchTodo"],
  isCreatingTask: state.ui.loading["createTask"],
  isUpdatingStatus: state.ui.loading["todoStatusUpdate"]
});

export default connect(mapStateToProps, dispatchProps)(SingleTodoDetails);
