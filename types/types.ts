export type Workout = {
  id: number;
  name: string;
  description: string;
  instructions: string;
  category: string;
  exercises: { name: string; sets: string; instructions: string; description: string }[];
};
