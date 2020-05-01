//Action Types
export const ADD_SET = "ADD_SET";
export const DELETE_SET = "DELETE_SET";

//Action Creator
export const addSet = (userId, exerciseId, exercise, reps) => {
  return {
    type: ADD_SET,
    payload: {
      userId,
      exerciseId,
      //todo: get rid of exercise
      exercise,
      reps,
    },
  };
};

export const deleteSet = (id) => ({
  type: DELETE_SET,
  payload: {
    id,
  },
});
