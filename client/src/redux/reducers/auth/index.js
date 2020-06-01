import {
  LOGIN,
  LOGOUT,
  UPDATE_SESSION_TOKEN,
  GET_CURRENT_USER,
  UPDATE_USER,
  navigateTo
} from "../../actions";

const initialState = {
  user: {
    data: undefined,
    session: undefined
  },
  current: null,
  byId: {},
  byList: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CURRENT_USER.SUCCESS:
    case LOGIN.SUCCESS:
      return Object.assign({}, state, {
        user: {
          ...state.user,
          data: action.payload
        }
      });
    case UPDATE_SESSION_TOKEN:
      return Object.assign({}, state, {
        user: {
          ...state.user,
          session: action.payload
        }
      });
    case UPDATE_USER.SUCCESS:
      const current = state.current
        ? { ...state.current, ...action.payload }
        : action.payload;
      const update = { current };
      if (state.byId[current._id]) {
        update.byId = { ...state.byId, [current._id]: current };
        update.byList = Object.values(update.byId);
      }
      return Object.assign({}, state, update);
    case LOGOUT.START:
      return initialState;
    default:
      return state;
  }
};
