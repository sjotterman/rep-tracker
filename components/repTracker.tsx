import React from "react";
import { useSelector, useDispatch } from "react-redux";
// import { useState } from "react";
import { Button, Grid, GridColumn, Input, Feed } from "semantic-ui-react";
import type { User, Set, Exercise } from "../types";
import { addSet, deleteSet } from "../redux/actions/setsActions";
import { setRepCount } from "../redux/actions/exerciseActions";
import RecentReps from "./recentReps";

interface RepTrackerProps {
  user: User;
}

const RepTracker: React.FC<RepTrackerProps> = ({ user }) => {
  const loading = false; // remove later
  const sets: Set[] = useSelector((state: any) => state.sets);
  const exercises: Exercise[] = useSelector((state: any) => state.exercises);
  const dispatch = useDispatch();
  // TODO: remove set
  if (loading) {
    return <div>Loading...</div>;
  }
  // TODO: refactor out this component
  return (
    <div>
      <p>{user.name}</p>
      <h4>Recent Reps</h4>
      <RecentReps sets={sets} />
      <div>
        <h3>Log exercise</h3>
        <Grid columns="12">
          {exercises.map((exercise, index) => {
            return (
              <Grid.Row key={index}>
                <Grid.Column width={2}>{exercise.name}</Grid.Column>
                <GridColumn width={2}>
                  <Button
                    onClick={() => {
                      dispatch(setRepCount(exercise._id, exercise.reps - 1));
                    }}
                  >
                    -
                  </Button>
                </GridColumn>
                <Grid.Column width={2}>
                  <Button
                    onClick={() => {
                      dispatch(setRepCount(exercise._id, exercise.reps + 1));
                    }}
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
                      dispatch(
                        setRepCount(exercise._id, parseInt(e.target.value))
                      );
                    }}
                  ></Input>
                </Grid.Column>
                <Grid.Column width={1}>
                  <Button
                    onClick={() => {
                      dispatch(
                        addSet(
                          "fdsfsd",
                          exercise._id,
                          exercise.name,
                          exercise.reps
                        )
                      );
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
