export type Workout = {
  id: number;
  name: string;
  description: string;
  instructions: string;
  category: string;
  exercises: Exercise[];
};

export type Exercise = {
  workout_id: string;
  name: string;
  sets: string;
  instructions: string;
  description: string;
};
