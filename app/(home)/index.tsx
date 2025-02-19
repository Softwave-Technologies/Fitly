import { useClerk, useUser } from '@clerk/clerk-expo';
import { FontAwesome } from '@expo/vector-icons';
import { Redirect } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, Text, SafeAreaView, Image, Pressable } from 'react-native';

import WaterIntake from '~/components/WaterIntake';

export default function HomePage() {
  const { user } = useUser();
  const { signOut } = useClerk();

  if (!user) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  const handleWorkoutCreate = () => {};

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <View className="border-b-hairline flex-row items-center gap-5 border-gray-300 p-4">
        {user?.imageUrl && (
          <Image source={{ uri: user.imageUrl }} className="h-16 w-16 rounded-full" />
        )}
        <View className="flex-1">
          <Text className="text-lg text-white">Welcome Back!</Text>
          <Text className="text-xl font-bold text-white">{user?.fullName}</Text>
        </View>
        <Pressable className="p-2" onPress={() => signOut()}>
          <FontAwesome name="power-off" size={30} color="red" />
        </Pressable>
      </View>
      {/* Nutrition and water track */}
      <View>
        <Text className="p-4 text-xl font-bold text-green-500">Daily Water Intake</Text>
        <WaterIntake />
      </View>
      {/* Create workout */}
      {/* Created workout text and steps */}
      <StatusBar style="light" />
    </SafeAreaView>
  );
}
