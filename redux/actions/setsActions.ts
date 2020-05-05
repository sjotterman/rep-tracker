//Action Types
export const ADD_SET = "ADD_SET";
export const DELETE_SET = "DELETE_SET";
export const GET_SETS = "GET_SETS";

export const getSets = () => async (dispatch: Function) => {
  // TODO: dispatch "loading" action of some sort
  // TODO: replace URL with env var
  const response = await fetch("http://localhost:3000/api/sets");
  if (!response.ok) {
    console.log("Error getting sets");
    console.log(await response.json());
  }
  const json = await response.json();
  const { sets } = json.data;
  console.log({ sets });
  dispatch({
    type: GET_SETS,
    payload: {
      sets,
    },
  });
};

//Action Creator
//TODO: reduce number of parameters?
export const addSet = (
  userId: string,
  exerciseId: string,
  exercise: string,
  reps: number
) => {
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

export const deleteSet = (id: string) => ({
  type: DELETE_SET,
  payload: {
    id,
  },
});
