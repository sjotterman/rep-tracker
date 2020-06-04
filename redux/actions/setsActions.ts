//Action Types
import fetch from "isomorphic-unfetch";
import { Set } from "../../types";

export const ADD_SET = "ADD_SET";
export const DELETE_SET = "DELETE_SET";
export const GET_SETS = "GET_SETS";

export const getSets = () => async (dispatch: Function) => {
  // TODO: dispatch "loading" action of some sort
  // TODO: replace URL with env var
  try {
    const response = await fetch("http://localhost:3000/api/sets");
    if (!response.ok) {
      console.log("Error getting sets");
      return;
    }
    const json = await response.json();
    const { sets } = json.data;
    dispatch({
      type: GET_SETS,
      payload: {
        sets,
      },
    });
  } catch (e) {
    console.log({ e });
  }
};

//Action Creator
//TODO: reduce number of parameters?
export const addSet = (
  exerciseId: string,
  exercise: string,
  reps: number
) => async (dispatch: Function) => {
  console.log("addSet()");
  const createSet = {
    exerciseId,
    exercise,
    reps,
  };
  const response = await fetch("http://localhost:3000/api/sets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(createSet),
  });
  if (!response?.ok) {
    console.log("Error adding sets");
    return;
  }
  let set: Set;
  const json = await response.json();
  // TODO: fix nesting of set here
  set = json.data.set;
  dispatch({
    type: ADD_SET,
    payload: {
      set,
    },
  });
};

export const deleteSet = (id: string) => ({
  type: DELETE_SET,
  payload: {
    id,
  },
});
