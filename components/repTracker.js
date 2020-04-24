import React from "react";
import { useState } from "react";
import { useFetchUserData } from "../lib/userData";
import { List, Button, Grid, GridColumn, Input, Feed } from "semantic-ui-react";

const RepTracker = ({ user }) => {
  const { userData, loading: userDataLoading } = useFetchUserData();
  const dummyExercises = [
    { id: 1, name: "Pull ups", reps: 1 },
    { id: 2, name: "Push-ups", reps: 1 },
    { id: 3, name: "Squats", reps: 1 },
  ];
  const [exercises, setExercises] = useState(dummyExercises);

  const updateReps = (exerciseId, reps) => {
    console.log({ exerciseId, reps });
    // TODO: Extract this logic from component
    // Possibly to useReducer
    setExercises(
      exercises.map((exercise) => {
        if (exercise.id === exerciseId) {
          return { ...exercise, reps };
        } else {
          return exercise;
        }
      })
    );
  };
  return (
    <div>
      <p>{user.name}</p>
      <h4>Recent Reps</h4>
      <Feed>
        {userData?.sets.map((set, index) => {
          return (
            <Feed.Event
              key={index}
              icon="check"
              date="today"
              summary={`You did ${set.reps} ${set.exercise}`}
            />
          );
        })}
      </Feed>
      <div>
        <h3>Log exercise</h3>
        <Grid columns="12">
          {exercises.map((exercise, index) => {
            return (
              <Grid.Row key={index}>
                <Grid.Column width={2}>{exercise.name}</Grid.Column>
                <GridColumn width={2}>
                  <Button
                    onClick={() =>
                      updateReps(exercise.id, parseInt(exercise.reps) - 1)
                    }
                  >
                    -
                  </Button>
                </GridColumn>
                <Grid.Column width={2}>
                  <Button
                    onClick={() =>
                      updateReps(exercise.id, parseInt(exercise.reps) + 1)
                    }
                  >
                    +
                  </Button>
                </Grid.Column>
                <Grid.Column width={5}>
                  <Input
                    fluid
                    label="reps"
                    value={exercise.reps}
                    type="number"
                    onChange={(e) => {
                      console.log(e.target.value);
                      updateReps(exercise.id, e.target.value);
                    }}
                  ></Input>
                </Grid.Column>
                <Grid.Column width={1}>
                  <Button>Log</Button>
                </Grid.Column>
              </Grid.Row>
            );
          })}
        </Grid>
      </div>
    </div>
  );
};

export default RepTracker;
