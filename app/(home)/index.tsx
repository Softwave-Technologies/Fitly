import { useUser } from '@clerk/clerk-expo';
import { StatusBar } from 'expo-status-bar';
import { View, Text, SafeAreaView, Image } from 'react-native';

import CreateWorkout from '~/components/CreateWorkout';

export default function HomePage() {
  const { user } = useUser();

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <View className="border-b-hairline flex-row items-center justify-between border-gray-300 p-10">
        <Text className="text-2xl font-bold text-white">Welcome {user?.firstName} !</Text>
        {user?.imageUrl && (
          <Image source={{ uri: user.imageUrl }} className="h-16 w-16 rounded-full" />
        )}
      </View>
      {/* Create workout */}
      <View>
        <CreateWorkout />
      </View>
      {/* Created workout text and steps */}
      {/* Calorie track */}
      <StatusBar style="light" />
    </SafeAreaView>
  );
}
