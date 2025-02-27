import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WorkoutHistory() {
  return (
    <View className="flex-1 bg-gray-900">
      <SafeAreaView>
        <Text className="border-b-hairline border-gray-300 p-6 text-2xl font-bold text-green-500">
          Workout History
        </Text>
      </SafeAreaView>
    </View>
  );
}
