import { create } from 'zustand';

import { supabase } from '../utils/supabase';

import { Workout } from '~/types/types';

interface WorkoutStore {
  workouts: Workout[];
  loading: boolean;
  fetchWorkouts: (userId: string) => Promise<void>;
  addWorkout: (userId: string, workout: Omit<Workout, 'id' | 'created_at'>) => Promise<void>;
  updateWorkout: (id: string, updatedWorkout: Partial<Workout>) => Promise<void>;
  deleteWorkout: (id: string) => Promise<void>;
}

export const useWorkoutStore = create<WorkoutStore>((set) => ({
  workouts: [],
  loading: false,

  fetchWorkouts: async (userId) => {
    if (!userId) return;

    set({ loading: true });

    try {
      const { data, error } = await supabase
        .from('workouts')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      set({ workouts: data || [], loading: false });
    } catch (error) {
      console.error('Error fetching workouts:', error);
      set({ loading: false });
    }
  },

  addWorkout: async (userId, workout) => {
    if (!userId) return;

    try {
      const { data, error } = await supabase
        .from('workouts')
        .insert([{ ...workout, user_id: userId }])
        .select('*')
        .single();

      if (error) throw error;

      set((state) => ({ workouts: [data, ...state.workouts] }));
    } catch (error) {
      console.error('Error adding workout:', error);
    }
  },

  updateWorkout: async (id, updatedWorkout) => {
    try {
      const { data, error } = await supabase
        .from('workouts')
        .update(updatedWorkout)
        .eq('id', id)
        .select('*')
        .single();

      if (error) throw error;

      set((state) => ({
        workouts: state.workouts.map((workout) =>
          workout.id.toString() === id ? { ...workout, ...data } : workout
        ),
      }));
    } catch (error) {
      console.error('Error updating workout:', error);
    }
  },

  deleteWorkout: async (id) => {
    try {
      const { error } = await supabase.from('workouts').delete().eq('id', id);

      if (error) throw error;

      set((state) => ({
        workouts: state.workouts.filter((workout) => workout.id.toString() !== id),
      }));
    } catch (error) {
      console.error('Error deleting workout:', error);
    }
  },
}));
