import React from "react";
import { Set } from "../types";
import { Button, Feed } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { addSet, deleteSet } from "../redux/actions/setsActions";

interface RecentRepsProps {
  sets: Set[];
}

const RecentReps: React.FC<RecentRepsProps> = ({ sets }) => {
  //TODO: refactor out need for dispatch here
  const dispatch = useDispatch();
  return (
    <Feed>
      {sets.map((set: Set, index: number) => {
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
                dispatch(deleteSet(set._id));
              }}
            >
              X
            </Button>
          </Feed.Event>
        );
      })}
    </Feed>
  );
};

export default RecentReps;
