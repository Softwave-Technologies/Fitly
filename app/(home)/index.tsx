import { useUser } from '@clerk/clerk-expo';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { View, Text, SafeAreaView, Image } from 'react-native';

import { Button } from '~/components/Button';

export default function HomePage() {
  const { user } = useUser();
  const [workout, setWorkout] = useState(null);
  const [workoutArea, setWorkoutArea] = useState<string>('');

  const createWorkout = async () => {};

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="border-b-hairline flex-row items-center justify-between border-gray-300 p-10">
        <Text className="text-2xl font-bold text-green-600">Welcome {user?.firstName} !</Text>
        {user?.imageUrl && (
          <Image source={{ uri: user.imageUrl }} className="h-16 w-16 rounded-full" />
        )}
      </View>
      <Text className="py-2 text-center text-xl font-bold text-white ">Create Workout</Text>
      <View className="flex-row justify-around p-4">
        <Text className="text-bold text-green-500">Legs</Text>
        <Text className="text-bold text-green-500">Chest</Text>
        <Text className="text-bold text-green-500">Arms</Text>
        <Text className="text-bold text-green-500">Full Body</Text>
      </View>
      <Button title="Create Workout" onPress={createWorkout} className="m-10 bg-green-700" />
      <StatusBar style="light" />
    </SafeAreaView>
  );
}
