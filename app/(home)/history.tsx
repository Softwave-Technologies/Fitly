import { View, Text, SafeAreaView, ScrollView } from 'react-native';

import WorkoutListItem from '~/components/WorkoutListItem';

export default function SavedWorkoutsPage() {
  return (
    <View className="flex-1 bg-gray-900">
      <SafeAreaView className="flex-1">
        <Text className="p-4 text-center text-2xl font-bold text-white">Workout History</Text>
        <ScrollView style={{ paddingBottom: 20 }}>
          <WorkoutListItem />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
