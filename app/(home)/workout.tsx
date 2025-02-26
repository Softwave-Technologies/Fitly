import { FlashList } from '@shopify/flash-list';
import { useState } from 'react';
import { View, Text, SafeAreaView } from 'react-native';

import preMadeWorkouts from '../../assets/data/preWorkouts.json';

export default function WorkoutPage() {
  const [workouts, setWorkouts] = useState(preMadeWorkouts);

  return (
    <View className="flex-1 bg-gray-900">
      <SafeAreaView className="flex-1">
        <View className="border-b-hairline border-gray-300 p-6">
          <Text className="text-2xl font-bold text-green-500">Workouts</Text>
        </View>
        <View className="flex-1 p-4">
          <Text className="text-lg font-semibold text-white">
            Choose Your Workout or Create Your Own
          </Text>
          <FlashList
            data={workouts}
            keyExtractor={(item) => item.id}
            estimatedItemSize={10}
            renderItem={({ item }) => (
              <View className="m-2 rounded-lg bg-gray-200 p-4">
                <Text className="text-lg font-semibold">{item.name}</Text>
                {item.exercises.map((exercise, index) => (
                  <Text key={index}>
                    {exercise.name} - {exercise.sets}
                  </Text>
                ))}
              </View>
            )}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}
