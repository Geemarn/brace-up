import {
  apiRequest,
  navigateTo,
  POST,
  PUT,
  GET,
  LOGOUT,
  LOGIN,
  REGISTER,
  RESET_PASSWORD,
  FETCH_UPDATE_PASSWORD,
  GET_CURRENT_USER,
  UPDATE_PASSWORD,
  UPDATE_USER
} from "../../actions/index";
import { toast } from "react-toastify";

const login = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === LOGIN.START) {
    dispatch(
      apiRequest({
        method: POST,
        url: "/users/login",
        key: "login",
        onSuccess: data => {
          dispatch({ type: LOGIN.SUCCESS, payload: data });
          dispatch(navigateTo("/dashboard"));
        },
        ...action.meta
      })
    );
  }
};

const register = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === REGISTER.START) {
    dispatch(
      apiRequest({
        method: POST,
        url: "/users/register",
        key: "register",
        onSuccess: data => {
          dispatch({ type: REGISTER.SUCCESS, payload: data });
          dispatch(navigateTo("/"));
        },
        ...action.meta
      })
    );
  }
};

const getCurrentUser = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === GET_CURRENT_USER.START) {
    dispatch(
      apiRequest({
        method: GET,
        url: "/users/current",
        key: "getCurrentUser",
        onSuccess: GET_CURRENT_USER.SUCCESS,
        ...action
      })
    );
  }
};

const updateUser = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === UPDATE_USER.START) {
    const { key, userId, ...rest } = action.meta;
    dispatch(
      apiRequest({
        method: PUT,
        url: `driver/${userId}`,
        key: key || "updateUser",
        onSuccess: UPDATE_USER.SUCCESS,
        ...rest
      })
    );
  }
};

const resetPassword = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === RESET_PASSWORD.START) {
    dispatch(
      apiRequest({
        method: POST,
        url: "/users/reset-password",
        key: "resetPassword",
        nextRoute: "/",
        ...action.meta
      })
    );
  }
};

const updatePassword = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === UPDATE_PASSWORD.START) {
    const { token } = action.meta;
    dispatch(
      apiRequest({
        method: POST,
        url: `/users/reset/${token}`,
        key: "updatePassword",
        onSuccess: () => {
          dispatch(navigateTo("/"));
        },
        ...action.meta
      })
    );
  }
};

const fetchUpdatePassword = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === FETCH_UPDATE_PASSWORD.START) {
    const { token, ...rest } = action.meta;
    dispatch(
      apiRequest({
        method: GET,
        url: `/users/reset/${token}`,
        key: "fetchUpdatePassword",
        ...rest
      })
    );
  }
};

const logOut = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === LOGOUT.START) {
    dispatch(navigateTo("/"));
    toast.dismiss();
    toast.info("Bye, see you soon");
  }
};

export default [
  login,
  register,
  getCurrentUser,
  logOut,
  updateUser,
  resetPassword,
  fetchUpdatePassword,
  updatePassword
];
