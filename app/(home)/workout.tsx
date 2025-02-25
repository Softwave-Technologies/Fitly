import { FlashList } from '@shopify/flash-list';
import { View, Text, SafeAreaView } from 'react-native';

import preWorkouts from '../../assets/data/preWorkouts.json';

import WorkoutsList from '~/components/WorkoutsList';

export default function WorkoutPage() {
  return (
    <View className="flex-1 bg-gray-900">
      <SafeAreaView>
        <View className="border-b-hairline border-gray-300 p-6">
          <Text className="text-2xl font-bold text-green-500">Workout</Text>
        </View>
        <View className="p-4">
          <Text className="text-lg font-semibold text-white">Our Workouts</Text>
          <FlashList
            data={preWorkouts}
            renderItem={({ item }) => <WorkoutsList workout={item} />}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}
