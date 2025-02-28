import { Entypo } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import workouts from '../../assets/data/preWorkouts.json';

import { useWorkoutStore } from '~/store/useWorkoutStore';

export default function WorkoutDetails() {
  const { id } = useLocalSearchParams();
  const { workouts: userWorkouts } = useWorkoutStore();

  let selectedWorkout = workouts.find((workout) => workout.id.toString() === id);

  if (!selectedWorkout) {
    selectedWorkout = userWorkouts.find((workout) => workout.id.toString() === id);
  }

  if (!selectedWorkout) {
    return (
      <SafeAreaView className="flex-1 bg-gray-900 p-4">
        <Text className="text-center text-white">Workout not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <View className="flex-1 bg-gray-900">
      <SafeAreaView className="p-4">
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Back Button */}
          <Pressable className="absolute right-1 top-1 z-10" onPress={() => router.back()}>
            <Entypo name="cross" size={25} color="white" />
          </Pressable>

          {/* Title Section */}
          <Text className="border-b border-gray-700 pb-3 text-2xl font-bold text-green-400">
            {selectedWorkout.name}
          </Text>
          <Text className="mt-1 text-lg font-semibold text-gray-300">
            {selectedWorkout.category}
          </Text>

          {/* Workout Details Section */}
          <View className="mt-4 rounded-lg bg-gray-800 p-4 shadow-md">
            <Text className="text-md text-gray-300">🔥 {selectedWorkout.description}</Text>
            <Text className="text-md mt-2 text-gray-300">📝 {selectedWorkout.instructions}</Text>
          </View>

          {/* Exercises List */}
          <View className="mt-6">
            <Text className="text-xl font-semibold text-green-400">Exercises:</Text>
            {selectedWorkout.exercises.map((exercise) => (
              <View key={exercise.name} className="mt-4 gap-1 rounded-lg bg-gray-800 p-4 shadow-md">
                <Text className="text-lg font-semibold text-white">💪 {exercise.name}</Text>
                <Text className="mt-1 text-gray-300">- {exercise.description}</Text>
                <Text className="text-gray-300">- {exercise.instructions}</Text>
                <Text className="mt-2 font-bold text-green-400">Sets: {exercise.sets}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
