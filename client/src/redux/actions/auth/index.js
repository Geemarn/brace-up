import { createActionString, createActionType } from "../../../utils";

export const LOGIN = createActionType("LOGIN", "Auth");
export const REGISTER = createActionType("REGISTER", "Auth");
export const UPDATE_SESSION_TOKEN = createActionString(
  "UPDATE_SESSION_TOKEN",
  "auth"
);
export const RESET_PASSWORD = createActionType("RESET_PASSWORD", "auth");
export const UPDATE_PASSWORD = createActionType("UPDATE_PASSWORD", "auth");
export const FETCH_UPDATE_PASSWORD = createActionType(
  "FETCH_UPDATE_PASSWORD",
  "auth"
);
export const GET_CURRENT_USER = createActionType(
  "GET_CURRENT_USER",
  "auth/user"
);

export const UPDATE_USER = createActionType("UPDATE_USER", "auth/user");
export const LOGOUT = createActionType("LOGOUT", "auth");

export const login = payload => ({
  type: LOGIN.START,
  meta: { payload }
});

export const register = payload => ({
  type: REGISTER.START,
  meta: { payload }
});

export const updateSessionToken = token => ({
  type: UPDATE_SESSION_TOKEN,
  payload: token
});

export const getCurrentUser = () => ({
  type: GET_CURRENT_USER.START
});

export const updateUser = (userId, payload = {}, param = {}) => ({
  type: UPDATE_USER.START,
  meta: {
    userId,
    payload,
    param
  }
});

export const resetPassword = payload => ({
  type: RESET_PASSWORD.START,
  meta: { payload }
});

export const updatePassword = (payload, token) => ({
  type: UPDATE_PASSWORD.START,
  meta: { payload, token }
});

export const fetchUpdatePassword = token => ({
  type: FETCH_UPDATE_PASSWORD.START,
  meta: { token }
});

export const logOut = () => ({
  type: LOGOUT.START
});
