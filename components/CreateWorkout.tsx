import { useState } from 'react';
import { View, Text } from 'react-native';

import { Button } from './Button';

export default function CreateWorkout() {
  const [workout, setWorkout] = useState(null);
  const [area, setArea] = useState('');

  const createWorkout = async () => {};
  return (
    <View>
      <Text className="py-2 text-center text-xl font-bold text-white ">Create Workout</Text>
      <View className="flex-row justify-around p-4">
        <Text className="text-bold text-green-500">Legs</Text>
        <Text className="text-bold text-green-500">Chest</Text>
        <Text className="text-bold text-green-500">Arms</Text>
        <Text className="text-bold text-green-500">Full Body</Text>
      </View>
      <Button title="Create Workout" onPress={createWorkout} className="m-10 bg-green-700" />
    </View>
  );
}
