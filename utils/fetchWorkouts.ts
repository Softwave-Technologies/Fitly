import { supabase } from './/supabase';

export const fetchWorkouts = async () => {
  const { data, error } = await supabase.from('workouts').select('*');
  if (error) console.error('Error fetching workouts:', error);
  return data;
};
