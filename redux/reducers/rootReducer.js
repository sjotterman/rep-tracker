import counterReducer from "./counterReducer";
import setsReducer from "./setsReducer";
import { combineReducers } from "redux";
import exercisesReducer from "./exercisesReducer";

const rootReducer = combineReducers({
  counter: counterReducer,
  sets: setsReducer,
  exercises: exercisesReducer,
});

export default rootReducer;
