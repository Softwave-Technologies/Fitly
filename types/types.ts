export type Workout = {
  id: number;
  name: string;
  description: string;
  instructions: string;
  category: string;
  exercises: Exercise[];
};

export type Exercise = {
  name: string;
  sets: string;
  instructions: string;
  description: string;
};
