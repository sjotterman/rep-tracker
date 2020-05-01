import { applyMiddleware, createStore, compose } from "redux";
import logger from "redux-logger";
import rootReducer from "./reducers/rootReducer";

const middlewares = [];
if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}
const store = compose(applyMiddleware(...middlewares))(createStore)(
  rootReducer
);
export default store;
