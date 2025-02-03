import { router } from 'expo-router';
import { useState } from 'react';
import { View, Text } from 'react-native';

import { Button } from './Button';
import SelectionComponentList from './SelectionComponentList';

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
      <Text className="border-b-hairline border-gray-500 py-2 text-center text-2xl font-bold text-white">
        Create Workout
      </Text>
      <SelectionComponentList />
      <View className="m-10 gap-5">
        <Button title="Create Workout" onPress={createWorkout} className=" bg-green-700" />
        <Button title="Cancel" onPress={router.back} className="bg-red-600" />
      </View>
    </View>
  );
}
