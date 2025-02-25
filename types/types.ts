export type Program = {
  id: string;
  name: string;
  description?: string;
};

export type Workout = {
  id: string;
  program_id: string;
  name: string;
  description?: string;
};

export type Exercise = {
  id: string;
  workout_id: string;
  name: string;
  sets: number;
  reps: number;
};
