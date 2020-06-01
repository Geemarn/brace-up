import { applyMiddleware, createStore, compose } from "redux";
import { createLogger } from "redux-logger";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import throttle from "lodash.throttle";
import customMiddleWares from "./middlewares";
import appReducers from "./reducers";

export const history = createBrowserHistory();

const rootReducer = (state, action) => {
  if (action.type === "RESET_APP_STATE") {
    state = undefined;
  }
  return appReducers(history)(state, action);
};

// add and aply the middleWares
const middleWares = [...customMiddleWares, routerMiddleware(history)];

//include redux logger if not in production
if (process.env.NODE_ENV !== "production") {
  middleWares.push(createLogger());
}

let parseMiddleware = applyMiddleware(...middleWares);

//include dev tools if not in roduction
if (
  process.env.NODE_ENV !== "production" &&
  window.__REDUX_DEVTOOLS_EXTENSION__
) {
  parseMiddleware = compose(
    parseMiddleware,
    window.__REDUX_DEVTOOLS_EXTENSION__()
  );
}

//persist data to LS
const persistedState = loadState();

// create the store
const store = createStore(rootReducer, persistedState, parseMiddleware);

//subscribe to store
store.subscribe(
  throttle(() => {
    saveState({ auth: store.getState().auth });
  }, 1000)
);
console.log("STORE::::::", store);

export default store;

function loadState() {
  try {
    const serializedState = localStorage.getItem("brace-up");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
}

function saveState(state) {
  try {
    localStorage.setItem("brace-up", JSON.stringify(state));
  } catch (e) {}
}
