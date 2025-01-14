import { StatusBar } from 'expo-status-bar';
import { View, Text, SafeAreaView } from 'react-native';

export default function HomePage() {
  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="p-10">
        <Text className="text-xl font-bold text-green-700">Welcome</Text>
      </View>
      <StatusBar style="light" />
    </SafeAreaView>
  );
}
