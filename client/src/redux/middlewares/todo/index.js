import {
  apiRequest,
  navigateTo,
  POST,
  PUT,
  GET,
  FETCH_TODOS,
  FETCH_TODO,
  CREATE_TODO,
  CREATE_TASK,
  TODO_STATUS_UPDATE,
  EDIT_TASK,
  DELETE_TODO,
  DELETE_TASK,
  DELETE
} from "../../actions/index";

const fetchTodos = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === FETCH_TODOS.START) {
    dispatch(
      apiRequest({
        method: GET,
        url: "/todos",
        key: "fetchTodos",
        onSuccess: FETCH_TODOS.SUCCESS,
        ...action
      })
    );
  }
};

const fetchTodo = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === FETCH_TODO.START) {
    const id = action.payload;
    dispatch(
      apiRequest({
        method: GET,
        url: `/todos/${id}`,
        key: "fetchTodo",
        onSuccess: data => {
          dispatch({ type: FETCH_TODO.SUCCESS, payload: data });
          dispatch(navigateTo(`/dashboard/${data._id}`));
        },
        ...action
      })
    );
  }
};

const createTodo = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === CREATE_TODO.START) {
    dispatch(
      apiRequest({
        method: POST,
        url: `/todos`,
        key: "createTodo",
        onSuccess: data => {
          dispatch({ type: CREATE_TODO.SUCCESS, payload: data });
          dispatch(navigateTo(`/dashboard/${data._id}`));
        },
        ...action
      })
    );
  }
};

const todoStatusUpdate = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === TODO_STATUS_UPDATE.START) {
    const { todoId } = action.meta;
    dispatch(
      apiRequest({
        method: PUT,
        url: `/todos/${todoId}/status`,
        key: "todoStatusUpdate",
        onSuccess: TODO_STATUS_UPDATE.SUCCESS,
        ...action.meta
      })
    );
  }
};

const createTask = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === CREATE_TASK.START) {
    const { todoId, ...rest } = action.meta;
    dispatch(
      apiRequest({
        method: POST,
        url: `/todos/tasks/${todoId}`,
        key: "createTask",
        onSuccess: CREATE_TASK.SUCCESS,
        ...rest
      })
    );
  }
};

const editTask = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === EDIT_TASK.START) {
    const { todoId, taskId, ...rest } = action.meta;
    dispatch(
      apiRequest({
        method: PUT,
        url: `/todos/tasks/${todoId}/${taskId}`,
        key: "editTask",
        onSuccess: EDIT_TASK.SUCCESS,
        ...rest
      })
    );
  }
};

const deleteTodo = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === DELETE_TODO.START) {
    const { id } = action.payload;
    dispatch(
      apiRequest({
        method: DELETE,
        url: `/todos/${id}`,
        key: "deleteTodo",
        onSuccess: DELETE_TODO.SUCCESS,
        ...action
      })
    );
  }
};

const deleteTask = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === DELETE_TASK.START) {
    const { todoId, taskId, ...rest } = action.meta;
    dispatch(
      apiRequest({
        method: DELETE,
        url: `/todos/tasks/${todoId}/${taskId}`,
        key: "deleteTask",
        onSuccess: DELETE_TASK.SUCCESS,
        ...rest
      })
    );
  }
};

export default [
  fetchTodos,
  fetchTodo,
  createTodo,
  todoStatusUpdate,
  createTask,
  editTask,
  deleteTodo,
  deleteTask
];
