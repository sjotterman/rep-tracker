import { applyMiddleware, createStore, compose } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import rootReducer from "./reducers/rootReducer";

const middlewares = [thunk];
if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}
const makeStore = (initialState) => {
  return compose(applyMiddleware(...middlewares))(createStore)(
    rootReducer,
    initialState
  );
};

export default makeStore;
