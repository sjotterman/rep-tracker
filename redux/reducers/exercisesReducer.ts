// import { ADD_SET, DELETE_SET } from "../actions/setsActions";
import { Exercise } from "../../types";
import { SET_REP_COUNT } from "../actions/exerciseActions";

const initialState: Exercise[] = [
  {
    _id: "1",
    name: "pull-ups",
    description: "pull-ups",
    reps: 1,
  },
  {
    _id: "2",
    name: "push-ups",
    description: "push-ups",
    reps: 1,
  },
];

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
    default:
      return [...state];
  }
};

export default exercisesReducer;
