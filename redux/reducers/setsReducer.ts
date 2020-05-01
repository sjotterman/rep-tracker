import { ADD_SET, DELETE_SET } from "../actions/setsActions";
import { Set } from "../../types";

const initialState: Set[] = [
  {
    _id: "fdssd",
    userId: "fdsfsd",
    exerciseId: "1",
    reps: 77,
    exercise: "push-ups",
    createdAt: "2020-05-01T11:12:30.0000Z",
  },
];

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
