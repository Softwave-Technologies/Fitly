import { useUser } from '@clerk/clerk-expo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, Image } from 'react-native';

import CreateWorkout from '~/components/CreateWorkout';

export default function HomePage() {
  const { user } = useUser();
  const [workout, setWorkout] = useState(null);

  useEffect(() => {
    const fetchWorkout = async () => {
      const data = await AsyncStorage.getItem('workout');
      if (data) {
        setWorkout(JSON.parse(data));
      }
    };
    fetchWorkout();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <View className="border-b-hairline flex-row items-center justify-between border-gray-300 p-10">
        <Text className="text-2xl font-bold text-white">Welcome {user?.firstName} !</Text>
        {user?.imageUrl && (
          <Image source={{ uri: user.imageUrl }} className="h-16 w-16 rounded-full" />
        )}
      </View>
      {/* Create workout */}
      <View>
        <CreateWorkout />
      </View>
      {/* Created workout text and steps */}
      <View className="p-4">
        <Text className="border-b-hairline border-gray-300 pb-2 text-2xl font-bold text-white">
          Workouts
        </Text>
      </View>
      {/* Calorie track */}
      <StatusBar style="light" />
    </SafeAreaView>
  );
}
