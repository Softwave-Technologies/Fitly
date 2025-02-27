import { FlashList } from '@shopify/flash-list';
import { useState } from 'react';
import { View, Text, SafeAreaView } from 'react-native';

import preMadeWorkouts from '../../assets/data/preWorkouts.json';

import WorkoutListItem from '~/components/WorkoutListItem';
import { Workout } from '~/types/types';

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
            estimatedItemSize={10}
            keyExtractor={(item: Workout) => item.id.toString()}
            renderItem={({ item }) => <WorkoutListItem item={item} />}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}
