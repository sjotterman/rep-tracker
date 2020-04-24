import React from "react";
import { useFetchUserData } from "../lib/userData";
import { List, Button, Grid, GridColumn, Input, Feed } from "semantic-ui-react";

const RepTracker = ({ user }) => {
  const { userData, loading: userDataLoading } = useFetchUserData();
  const dummyExercises = [
    { id: 1, name: "Pull ups" },
    { id: 2, name: "Push-ups" },
    { id: 3, name: "Squats" },
  ];
  return (
    <div>
      <p>{user.name}</p>
      <h4>Recent Reps</h4>
      {/* <List divided relaxed>
        {userData?.sets.map((set, index) => {
          return (
            <List.Item key={index}>
              <List.Content>
                <List.Header>{`${set.reps} ${set.exercise}`}</List.Header>
              </List.Content>
            </List.Item>
          );
        })}
      </List> */}
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
          {dummyExercises.map((exercise, index) => {
            return (
              <Grid.Row key={index}>
                <Grid.Column width={2}>{exercise.name}</Grid.Column>
                <Grid.Column width={2}>
                  <Button>+</Button>
                </Grid.Column>
                <GridColumn width={2}>
                  <Button>-</Button>
                </GridColumn>
                <Grid.Column width={5}>
                  <Input fluid label="reps"></Input>
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
