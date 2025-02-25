import { View, Text, SafeAreaView } from 'react-native';

export default function WorkoutPage() {
  return (
    <View className="flex-1 bg-gray-900">
      <SafeAreaView>
        <View className="border-b-hairline border-gray-300 p-6">
          <Text className="text-2xl font-bold text-green-500">Workouts</Text>
        </View>
        <View className="p-4">
          <Text className="text-lg font-semibold text-white">Choose Your Workout</Text>
        </View>
      </SafeAreaView>
    </View>
  );
}
