import { create } from 'zustand';

import { supabase } from '../utils/supabase';

type Exercise = {
  name: string;
  sets: number;
  reps: number;
};

type Workout = {
  id: string;
  name: string;
  image: string;
  exercises: Exercise[];
};

type UserProgress = {
  workout_id: string;
  completed_at: string;
};

type WorkoutState = {
  workouts: Workout[];
  userProgress: UserProgress[];
  fetchWorkouts: () => Promise<void>;
  fetchUserProgress: (userId: string) => Promise<void>;
  logWorkoutCompletion: (userId: string, workoutId: string) => Promise<void>;
};

export const useWorkoutStore = create<WorkoutState>((set) => ({
  workouts: [],
  userProgress: [],

  // Fetch all workouts
  fetchWorkouts: async () => {
    const { data, error } = await supabase.from('workouts').select('*');
    if (error) console.error('Error fetching workouts:', error);
    set({ workouts: data || [] });
  },

  // Fetch user progress (Requires userId from Clerk)
  fetchUserProgress: async (userId) => {
    if (!userId) return;

    const { data, error } = await supabase
      .from('user_progress')
      .select('workout_id, completed_at')
      .eq('user_id', userId);

    if (error) console.error('Error fetching progress:', error);
    set({ userProgress: data || [] });
  },

  // Log a workout completion
  logWorkoutCompletion: async (userId, workoutId) => {
    if (!userId) return;

    const { error } = await supabase.from('user_progress').insert([
      {
        user_id: userId,
        workout_id: workoutId,
        completed_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error('Error logging workout:', error);
      return;
    }

    // Update Zustand state immediately
    set((state) => ({
      userProgress: [
        ...state.userProgress,
        { workout_id: workoutId, completed_at: new Date().toISOString() },
      ],
    }));
  },
}));
