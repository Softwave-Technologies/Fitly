import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { Program, Workout, Exercise } from '../types/types';
import { supabase } from '../utils/supabase';

interface WorkoutStore {
  programs: Program[];
  workouts: Record<string, Workout[]>;
  exercises: Exercise[];

  fetchPrograms: () => Promise<void>;
  fetchWorkouts: (programId: string) => Promise<void>;
  fetchExercises: () => Promise<void>;
}

const useWorkoutStore = create<WorkoutStore>()(
  persist(
    (set) => ({
      programs: [],
      workouts: {},
      exercises: [],

      fetchPrograms: async () => {
        const { data, error } = await supabase.from('programs').select('*');
        if (error) {
          console.error('Error fetching programs:', error);
          return;
        }
        set({ programs: data as Program[] });
      },

      fetchWorkouts: async (programId: string) => {
        const { data, error } = await supabase
          .from('workouts')
          .select('*')
          .eq('program_id', programId);

        if (error) {
          console.error('Error fetching workouts:', error);
          return;
        }
        set((state) => ({
          workouts: { ...state.workouts, [programId]: data as Workout[] },
        }));
      },

      fetchExercises: async () => {
        const { data, error } = await supabase.from('exercises').select('*');
        if (error) {
          console.error('Error fetching exercises:', error);
          return;
        }
        set({ exercises: data as Exercise[] });
      },
    }),
    { name: 'workout-store' }
  )
);

export default useWorkoutStore;
