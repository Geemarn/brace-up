import {
  FETCH_TODOS,
  FETCH_TODO,
  CREATE_TODO,
  TODO_STATUS_UPDATE,
  DELETE_TODO,
  CREATE_TASK,
  EDIT_TASK,
  DELETE_TASK
} from "../../actions";

const initialState = {
  current: null,
  byList: []
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_TODOS.SUCCESS:
      return {
        ...state,
        byList: payload
      };
    case TODO_STATUS_UPDATE.SUCCESS:
    case DELETE_TASK.SUCCESS:
    case EDIT_TASK.SUCCESS:
    case CREATE_TASK.SUCCESS:
    case FETCH_TODO.SUCCESS:
      return {
        ...state,
        current: payload
      };
    case CREATE_TODO.SUCCESS:
      return {
        ...state,
        current: payload,
        byList: [payload, ...state.byList]
      };
    case DELETE_TODO.SUCCESS:
      return {
        ...state,
        current: null,
        byList: state.byList.filter(todo => todo._id !== payload)
      };
    default:
      return state;
  }
};
