//Action Types
export const ADD_EXERCISE = "ADD_EXERCISE";
export const GET_EXERCISES = "GET_EXERCISES";
export const DELETE_EXERCISE = "DELETE_EXERCISE";
export const SET_REP_COUNT = "SET_REP_COUNT";

import fetch from "isomorphic-unfetch";
import { Exercise } from "../../types";
//Action Creator
export const addExercise = () => ({
  type: ADD_EXERCISE,
});

export const getExercises = () => async (dispatch: Function) => {
  // TODO: dispatch "loading" action of some sort
  // TODO: replace URL with env var
  const response = await fetch("http://localhost:3000/api/exercises");
  if (!response.ok) {
    console.log("Error getting exercises");
    console.log(await response.json());
  }
  const json = await response.json();
  const { exercises } = json.data;
  //TODO: refactor application so I don't have to add "reps" here
  // Maybe add it in the reducer?
  dispatch({
    type: GET_EXERCISES,
    payload: {
      exercises: exercises.map((exercise: Exercise) => {
        return { ...exercise, reps: 1 };
      }),
    },
  });
};

export const setRepCount = (id: string, reps: number) => ({
  type: SET_REP_COUNT,
  payload: {
    id,
    reps,
  },
});

export const deleteExercise = () => ({
  type: DELETE_EXERCISE,
});
