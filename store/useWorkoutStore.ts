import { create } from 'zustand';

import { supabase } from '../utils/supabase';

import { Workout, Exercise } from '~/types/types';

interface WorkoutStore {
  workouts: Workout[];
  loading: boolean;
  fetchWorkouts: (userId: string) => Promise<void>;
  addWorkout: (
    userId: string,
    workout: Omit<Workout, 'id' | 'exercises'>,
    exercises: Exercise[]
  ) => Promise<void>;
  updateWorkout: (
    id: string,
    updatedWorkout: Partial<Workout>,
    updatedExercises: Exercise[]
  ) => Promise<void>;
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
        .select('*, exercises(*)')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      set({ workouts: data || [], loading: false });
    } catch (error) {
      console.error('Error fetching workouts:', error);
      set({ loading: false });
    }
  },

  addWorkout: async (userId, workout, exercises) => {
    if (!userId) return;

    try {
      const { data: workoutData, error: workoutError } = await supabase
        .from('workouts')
        .insert([{ ...workout, user_id: userId }])
        .select('*')
        .single();

      if (workoutError) throw workoutError;

      const formattedExercises = exercises.map((exercise) => ({
        ...exercise,
        workout_id: workoutData.id,
      }));

      const { error: exercisesError } = await supabase.from('exercises').insert(formattedExercises);

      if (exercisesError) throw exercisesError;

      set((state) => ({
        workouts: [{ ...workoutData, exercises }, ...state.workouts],
      }));
    } catch (error) {
      console.error('Error adding workout:', error);
    }
  },

  updateWorkout: async (id, updatedWorkout, updatedExercises) => {
    try {
      const { data: workoutData, error: workoutError } = await supabase
        .from('workouts')
        .update(updatedWorkout)
        .eq('id', id)
        .select('*')
        .single();

      if (workoutError) throw workoutError;

      for (const exercise of updatedExercises) {
        const { error: exerciseError } = await supabase
          .from('exercises')
          .update({
            name: exercise.name,
            sets: exercise.sets,
            description: exercise.description,
            instructions: exercise.instructions,
          })
          .eq('id', exercise.id);

        if (exerciseError) throw exerciseError;
      }

      set((state) => ({
        workouts: state.workouts.map((workout) =>
          workout.id.toString() === id
            ? { ...workout, ...workoutData, exercises: updatedExercises }
            : workout
        ),
      }));
    } catch (error) {
      console.error('Error updating workout:', error);
    }
  },

  deleteWorkout: async (id) => {
    try {
      await supabase.from('exercises').delete().eq('workout_id', id);
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
