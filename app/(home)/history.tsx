import { View, Text, SafeAreaView } from 'react-native';

export default function SavedWorkoutsPage() {
  return (
    <View className="flex-1 bg-gray-900">
      <SafeAreaView>
        <Text className="p-4 text-center text-2xl font-bold text-white">Workout History</Text>
      </SafeAreaView>
    </View>
  );
}
