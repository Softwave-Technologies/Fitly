import { router } from 'expo-router';
import { useState } from 'react';
import { View, Text } from 'react-native';

import { Button } from './Button';

export default function CreateWorkout() {
  const [workout, setWorkout] = useState(null);
  const [area, setArea] = useState('');
  const [difficulty, setDifficulty] = useState('');

  const createWorkout = async () => {
    router.push('/(home)');
  };
  const cancelWorkoutCreating = async () => {};
  return (
    <View>
      <Text className="py-2 text-center text-2xl font-bold text-white ">Create Workout</Text>
      <View className="flex-row justify-around p-4">
        <Text className="text-bold text-green-500">Legs</Text>
        <Text className="text-bold text-green-500">Chest</Text>
        <Text className="text-bold text-green-500">Arms</Text>
        <Text className="text-bold text-green-500">Full Body</Text>
      </View>
      <View className="flex-row justify-around p-4">
        <Text className="text-semibold text-blue-300">Beginner</Text>
        <Text className="text-semibold text-blue-300">Intermediate</Text>
        <Text className="text-semibold text-blue-300">Advanced</Text>
      </View>
      <View className="m-10 gap-5">
        <Button title="Create Workout" onPress={createWorkout} className=" bg-green-700" />
        <Button title="Cancel" onPress={router.back} className="bg-red-600" />
      </View>
    </View>
  );
}
