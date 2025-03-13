import { SafeAreaView, View, Text } from 'react-native';

export default function Videos() {
  return (
    <View className="flex-1 bg-gray-900">
      <SafeAreaView className="flex-1">
        <View className="border-b-hairline border-gray-300 p-6">
          <Text className="text-2xl font-bold text-green-500">Exercise Videos</Text>
        </View>
      </SafeAreaView>
    </View>
  );
}
