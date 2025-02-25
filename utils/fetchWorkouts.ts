import { useWorkoutStore } from '../store/useWorkoutStore';
import { supabase } from '../utils/supabase';

export const fetchWorkouts = async () => {
  const { data, error } = await supabase.from('workouts').select('*');

  if (error) {
    console.error('Error fetching workouts:', error);
    return;
  }

  // Update Zustand state
  useWorkoutStore.setState({ workouts: data || [] });
};
