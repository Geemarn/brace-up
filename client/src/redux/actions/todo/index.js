import { createActionType } from "../../../utils";

export const FETCH_TODOS = createActionType("FETCH_TODOS", "Todo");
export const FETCH_TODO = createActionType("FETCH_TODO", "Todo");
export const CREATE_TODO = createActionType("CREATE_TODO", "Todo");
export const TODO_STATUS_UPDATE = createActionType(
  "TODO_STATUS_UPDATE",
  "Todo"
);
export const CREATE_TASK = createActionType("CREATE_TASK", "Todo");
export const EDIT_TASK = createActionType("EDIT_TASK", "Todo");
export const DELETE_TODO = createActionType("DELETE_TODO", "Todo");
export const DELETE_TASK = createActionType("DELETE_TASK", "Todo");

export const fetchTodos = () => ({
  type: FETCH_TODOS.START
});

export const fetchTodo = id => ({
  type: FETCH_TODO.START,
  payload: id
});

export const createTodo = payload => ({
  type: CREATE_TODO.START,
  payload
});

export const todoStatusUpdate = (payload, todoId) => ({
  type: TODO_STATUS_UPDATE.START,
  meta: {
    payload,
    todoId
  }
});

export const createTask = (payload, todoId) => ({
  type: CREATE_TASK.START,
  meta: {
    payload,
    todoId
  }
});

export const editTask = (payload, todoId, taskId) => ({
  type: EDIT_TASK.START,
  meta: {
    payload,
    todoId,
    taskId
  }
});

export const deleteTodo = id => ({
  type: DELETE_TODO.START,
  payload: { id }
});

export const deleteTask = (todoId, taskId) => ({
  type: DELETE_TASK.START,
  meta: { todoId, taskId }
});
