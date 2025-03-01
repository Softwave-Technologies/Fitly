import { useClerk, useUser } from '@clerk/clerk-expo';
import { FontAwesome } from '@expo/vector-icons';
import { Redirect } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, Text, SafeAreaView, Image, Pressable, ScrollView } from 'react-native';

import DailyQuote from '~/components/DailyQuote';
import MainWaterIntake from '~/components/MainWaterIntake';
import StepCounter from '~/components/StepCounter';

export default function HomePage() {
  const { user } = useUser();
  const { signOut } = useClerk();

  if (!user) {
    return <Redirect href="/(auth)/sign-in" />;
  }

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
      <ScrollView showsVerticalScrollIndicator={false} className="pb-4">
        {/* Water Intake home */}
        <MainWaterIntake />
        {/* Daily quote */}
        <DailyQuote />
        {/* Step track */}
        <StepCounter />
      </ScrollView>
      <StatusBar style="light" />
    </SafeAreaView>
  );
}
