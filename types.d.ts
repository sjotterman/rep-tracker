export declare interface User {
  name: string;
  sub: string;
  // TODO: add more attributes and refactor to shared file
}

export interface Exercise {
  _id: string;
  name: string;
  description: string;
  reps: number;
}

export interface Set {
  _id: string;
  userId: string;
  exercise: {
    _id: string;
    name: string;
  };
  reps: number;
  exercise: string;
  createdAt: string;
  // TODO: add time completed
  // Todo: probably should remove "Exercise", since we have the id
}
