import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

import { Workout } from '~/types/types';

export default function WorkoutListItem() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const data = await AsyncStorage.getItem('workout');
      if (data) {
        setWorkouts(JSON.parse(data).workout);
      }
    };
    fetchWorkouts();
  }, []);
  return (
    <View className="flex-1 p-4">
      <Text className="border-b-hairline border-gray-300 pb-2 text-2xl font-bold text-white">
        Workouts
      </Text>
      {workouts.length > 0 ? (
        workouts.map((workout, index) => (
          <View key={index} className="mb-4 rounded bg-gray-800 p-2">
            <Text className="font-bold text-white">{workout.name}</Text>
            <Text className="text-white">Sets: {workout.sets}</Text>
            <Text className="text-white">Reps: {workout.reps}</Text>
            <Text className="text-white">Rest Time: {workout.rest_time}</Text>
            <Text className="text-white">Duration: {workout.duration_seconds} seconds</Text>
            <Text className="text-white">Calories Burned: {workout.calories_burned}</Text>
            <Text className="text-white">Description: {workout.description}</Text>
            <Text className="text-white">Muscle Groups: {workout.muscle_groups.join(', ')}</Text>
          </View>
        ))
      ) : (
        <Text className="text-white">No workouts found.</Text>
      )}
    </View>
  );
}
