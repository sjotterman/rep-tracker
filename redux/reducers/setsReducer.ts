import { ADD_SET, DELETE_SET, GET_SETS } from "../actions/setsActions";
import { Set } from "../../types";

const initialState: Set[] = [];

const setsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_SET: {
      const { exerciseId, userId, reps, exercise } = action.payload;
      const newSet: Set = {
        _id: Date.now().toString(),
        userId,
        exerciseId,
        reps,
        exercise,
        createdAt: "2020-05-01T11:12:30.0000Z",
      };
      return [...state, newSet];
    }
    case GET_SETS: {
      const { sets } = action.payload;
      return [...sets];
    }
    case DELETE_SET: {
      const { id } = action.payload;
      return state.filter((set) => {
        return set._id != id;
      });
    }
    default:
      return [...state];
  }
};

export default setsReducer;
