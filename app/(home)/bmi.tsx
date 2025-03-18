import { SafeAreaView, View, Text } from 'react-native';

export default function BMI() {
  return (
    <View className="flex-1 bg-gray-900">
      <SafeAreaView>
        <View className="border-b-hairline border-gray-300 p-6">
          <Text className="text-2xl font-bold text-green-500">BMI Calculator</Text>
        </View>
      </SafeAreaView>
    </View>
  );
}
