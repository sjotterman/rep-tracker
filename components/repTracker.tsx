import React from "react";
import { useState } from "react";
// import { useFetchUserData } from "../lib/userData";
import { Button, Grid, GridColumn, Input, Feed } from "semantic-ui-react";

interface User {
  name: string;
  // TODO: add more attributes and refactor to shared file
}

interface Set {
  exerciseId: number;
  reps: number;
  exercise: string;
  // Todo: probably should remove "Exercise", since we have the id
}

interface RepTrackerProps {
  user: User;
}

const RepTracker: React.FC<RepTrackerProps> = ({ user }) => {
  //   const { userData, loading: userDataLoading } = useFetchUserData();
  const dummySets = [
    { exercise: "Push-ups", exerciseId: 2, reps: 1 },
    { exercise: "Push-ups", exerciseId: 2, reps: 1 },
  ];

  // TODO: log sets to database
  const [sets, setSets] = useState(dummySets);
  const appendSet = (set: Set) => {
    setSets([...sets, set]);
  };
  // TODO: remove set
  const dummyExercises = [
    { id: 1, name: "Pull ups", reps: 1 },
    { id: 2, name: "Push-ups", reps: 1 },
    { id: 3, name: "Squats", reps: 1 },
  ];
  const [exercises, setExercises] = useState(dummyExercises);

  const updateReps = (exerciseId: number, reps: number) => {
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
        {sets.map((set, index) => {
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
                      updateReps(
                        exercise.id,
                        parseInt(exercise.reps.toString()) - 1
                      )
                    }
                  >
                    -
                  </Button>
                </GridColumn>
                <Grid.Column width={2}>
                  <Button
                    onClick={() =>
                      updateReps(
                        exercise.id,
                        parseInt(exercise.reps.toString()) + 1
                      )
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
                      updateReps(exercise.id, parseInt(e.target.value));
                    }}
                  ></Input>
                </Grid.Column>
                <Grid.Column width={1}>
                  <Button
                    onClick={() => {
                      appendSet({
                        exercise: exercise.name,
                        exerciseId: exercise.id,
                        reps: exercise.reps,
                      });
                    }}
                  >
                    Log
                  </Button>
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
