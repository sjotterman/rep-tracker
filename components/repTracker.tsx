import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Grid, GridColumn, Input, Feed } from "semantic-ui-react";
import useFetch from "use-http";

interface User {
  name: string;
  sub: string;
  // TODO: add more attributes and refactor to shared file
}

interface Exercise {
  _id: string;
  name: string;
  description: string;
  reps: number;
}

interface Set {
  userId: string;
  exerciseId: string;
  reps: number;
  exercise: string;
  createdAt?: string;
  // TODO: add time completed
  // Todo: probably should remove "Exercise", since we have the id
}

interface RepTrackerProps {
  user: User;
}

const RepTracker: React.FC<RepTrackerProps> = ({ user }) => {
  const [setsInLog, setSetsInLog] = useState<Set[]>([]);
  const emptyExercises: Exercise[] = [];
  const [displayExercises, setDisplayExercises] = useState(emptyExercises);
  // TODO: remove set
  const { get, post, loading, error } = useFetch(
    //TODO: remove hardcoded url
    "http://localhost:3000",
    {}
  );
  useEffect(() => {
    loadInitialExercises();
    loadInitialSets();
  }, []);

  async function loadInitialExercises() {
    const { data } = await get("/api/exercises");
    if (!error) {
      const { exercises: initialExercises } = data;
      setDisplayExercises(
        initialExercises.map((exercise: any) => {
          return { ...exercise, reps: 1 };
        })
      );
    }
  }
  async function loadInitialSets() {
    const { data } = await get("/api/sets");
    if (!error) {
      const { sets: initialSets } = data;
      setSetsInLog(initialSets);
    }
  }

  async function addSetForUser(set: Set) {
    const { data: postResponseData } = await post("/api/sets", set);
    console.log({ postResponseData });
    const { set: newSet } = postResponseData;
    // TODO: set actual returned sets
    const newSets: Set[] = [...setsInLog, newSet];

    setSetsInLog(newSets);
  }

  const updateReps = (exerciseId: string, reps: number) => {
    console.log({ exerciseId, reps });
    // TODO: Extract this logic from component
    // Possibly to useReducer
    setDisplayExercises(
      displayExercises.map((exercise: any) => {
        if (exercise._id === exerciseId) {
          return { ...exercise, reps };
        } else {
          return exercise;
        }
      })
    );
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  // TODO: refactor out this component
  return (
    <div>
      <p>{user.name}</p>
      <h4>Recent Reps</h4>
      <Feed>
        {setsInLog.slice(setsInLog.length - 5).map((set: Set, index) => {
          const setDate: Date = new Date(set.createdAt ?? "");
          return (
            <Feed.Event
              key={index}
              icon="check"
              date={`${setDate.toDateString()} ${setDate.getHours()}:${setDate.getMinutes()}`}
              summary={`You did ${set.reps} ${set.exercise}`}
            />
          );
        })}
      </Feed>
      <div>
        <h3>Log exercise</h3>
        <Grid columns="12">
          {displayExercises.map((exercise, index) => {
            return (
              <Grid.Row key={index}>
                <Grid.Column width={2}>{exercise.name}</Grid.Column>
                <GridColumn width={2}>
                  <Button
                    onClick={() =>
                      updateReps(
                        exercise._id,
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
                        exercise._id,
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
                      updateReps(exercise._id, parseInt(e.target.value));
                    }}
                  ></Input>
                </Grid.Column>
                <Grid.Column width={1}>
                  <Button
                    onClick={() => {
                      addSetForUser({
                        userId: user.sub,
                        exercise: exercise.name,
                        exerciseId: exercise._id,
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
