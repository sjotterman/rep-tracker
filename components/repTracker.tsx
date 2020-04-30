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
  _id?: string;
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
  const { get, post, del, loading, error } = useFetch(
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
    const { set: newSet } = postResponseData;
    // TODO: set actual returned sets
    const newSets: Set[] = [...setsInLog, newSet];

    setSetsInLog(newSets);
  }

  async function deleteSet(setId: string) {
    const { error } = await del(`/api/sets/${setId}`);
    // TODO: refactor so I don't use two API calls
    if (error) {
      console.log(error);
      return;
    }
    const { data } = await get("/api/sets");
    console.log({ data });
    if (!error) {
      const { sets: initialSets } = data;
      setSetsInLog(initialSets);
    }
  }

  const updateReps = (exerciseId: string, reps: number) => {
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
            <Feed.Event key={index}>
              <Feed.Label icon="check" />
              <Feed.Summary>
                <Feed.Date>
                  {`${setDate.toDateString()} ${setDate.getHours()}:${setDate.getMinutes()}`}
                </Feed.Date>
                {`You did ${set.reps} ${set.exercise}`}
              </Feed.Summary>
              <Button
                onClick={() => {
                  console.log(`clicked delete on ${set._id}`);
                  // FIX: this function call
                  deleteSet(set._id ?? "");
                }}
              >
                X
              </Button>
            </Feed.Event>
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
