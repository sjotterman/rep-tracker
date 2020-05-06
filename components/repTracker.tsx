import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Grid, GridColumn, Input } from "semantic-ui-react";
import type { User, Set, Exercise } from "../types";
import { addSet, getSets } from "../redux/actions/setsActions";
import { setRepCount } from "../redux/actions/exerciseActions";
import RecentReps from "./recentReps";

interface RepTrackerProps {
  user: User;
}

const RepTracker: React.FC<RepTrackerProps> = ({ user }) => {
  // TODO: fix loading status, probably with redux
  const loading = false;
  const sets: Set[] = useSelector((state: any) => state.sets);
  const exercises: Exercise[] = useSelector((state: any) => state.exercises);
  const dispatch = useDispatch();
  // TODO: Try to figure out how to call this in getInitialProps
  // currently not working because we can't get auth server side
  useEffect(() => {
    dispatch(getSets());
  }, [user]);
  if (loading) {
    return <div>Loading...</div>;
  }
  //TODO: refactor out rep add widget
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
                        addSet(exercise._id, exercise.name, exercise.reps)
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
