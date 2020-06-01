import { createActionString, createActionType } from "../../../utils";

export const LOGIN = createActionType("LOGIN", "Auth");
export const REGISTER = createActionType("REGISTER", "Auth");
export const UPDATE_SESSION_TOKEN = createActionString(
  "UPDATE_SESSION_TOKEN",
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

export const logOut = () => ({
  type: LOGOUT.START
});
