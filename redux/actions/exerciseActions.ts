//Action Types
export const ADD_EXERCISE = "ADD_EXERCISE";
export const DELETE_EXERCISE = "DELETE_EXERCISE";
export const SET_REP_COUNT = "SET_REP_COUNT";

//Action Creator
export const addExercise = () => ({
  type: ADD_EXERCISE,
});

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
