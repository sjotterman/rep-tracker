// import { ADD_SET, DELETE_SET } from "../actions/setsActions";
import { Exercise } from "../../types";
import { SET_REP_COUNT, GET_EXERCISES } from "../actions/exerciseActions";

const initialState: Exercise[] = [];

// remove the "any" later
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const exercisesReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_REP_COUNT: {
      const { id, reps } = action.payload;
      return state.map((exercise) => {
        if (exercise._id === id) {
          return {
            ...exercise,
            reps: reps,
          };
        }
        return exercise;
      });
    }
    case GET_EXERCISES: {
      const { exercises } = action.payload;
      return [...exercises];
    }
    default:
      return [...state];
  }
};

export default exercisesReducer;
