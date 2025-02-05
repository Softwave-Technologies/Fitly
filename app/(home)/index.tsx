import { useUser } from '@clerk/clerk-expo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, Image, ScrollView } from 'react-native';

import CreateWorkout from '~/components/CreateWorkout';

// Define the structure of a workout
interface Workout {
  name: string;
  sets: number;
  reps: string;
  rest_time: string;
  duration_seconds: number;
  calories_burned: number;
  description: string;
  muscle_groups: string[];
}

export default function HomePage() {
  const { user } = useUser();
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
      <View className="flex-1 p-4">
        <Text className="border-b-hairline border-gray-300 pb-2 text-2xl font-bold text-white">
          Workouts
        </Text>
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
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
                <Text className="text-white">
                  Muscle Groups: {workout.muscle_groups.join(', ')}
                </Text>
              </View>
            ))
          ) : (
            <Text className="text-white">No workouts found.</Text>
          )}
        </ScrollView>
      </View>
      {/* Calorie track */}
      <StatusBar style="light" />
    </SafeAreaView>
  );
}
