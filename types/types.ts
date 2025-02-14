export type WorkoutResponse = {
  workouts: Workout[];
};

export type Workout = {
  name: string;
  exercises: {
    name: string;
    sets: number;
    reps: string;
    rest_time: string;
    duration_seconds: number;
    calories_burned: number;
    description: string;
    muscle_groups: string[];
  }[];
};
