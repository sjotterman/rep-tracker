import { ADD_SET, DELETE_SET, GET_SETS } from "../actions/setsActions";
import { Set } from "../../types";

const initialState: Set[] = [];

const setsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_SET: {
      const { set } = action.payload;
      return [...state, set];
    }
    case GET_SETS: {
      const { sets } = action.payload;
      console.log({ sets });
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
