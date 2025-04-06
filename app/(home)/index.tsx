import { useClerk, useUser } from '@clerk/clerk-expo';
import { FontAwesome } from '@expo/vector-icons';
import { Redirect, router } from 'expo-router';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  Pressable,
  ScrollView,
  Platform,
  StatusBar,
} from 'react-native';

import DailyQuote from '~/components/DailyQuote';
import MainNutritionTrack from '~/components/MainNutritionTrack';
import MainWaterIntake from '~/components/MainWaterIntake';
import StepCounter from '~/components/StepCounter';
import StreakTrack from '~/components/StreakTrack';

export default function HomePage() {
  const { user } = useUser();
  const { signOut } = useClerk();

  if (!user) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  return (
    <SafeAreaView
      className="flex-1 bg-gray-900"
      style={{ paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
      <View className="border-b-hairline flex-row items-center gap-5 border-gray-300 p-4">
        {user?.imageUrl && (
          <Image source={{ uri: user.imageUrl }} className="h-16 w-16 rounded-full" />
        )}
        <View className="flex-1">
          <Text className="text-lg text-white">Welcome Back!</Text>
          <Text className="text-xl font-bold text-white">{user?.fullName}</Text>
        </View>
        <Pressable className="flex-row gap-5 p-1">
          <FontAwesome
            name="user"
            size={30}
            color="gray"
            onPress={() => router.push('../profile')}
          />
          <FontAwesome name="sign-out" size={30} color="red" onPress={() => signOut()} />
        </Pressable>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} className="mb-20 pb-4">
        {/* Calendar for streak */}
        <StreakTrack />
        <View className="border-b-hairline border-t-hairline m-4 flex-row items-center justify-around border-gray-300 p-2">
          {/* Calorie track circle */}
          <MainNutritionTrack />
          {/* Step track */}
          <StepCounter />
          {/* Water Intake home */}
          <MainWaterIntake
            label="Water"
            color="#3498db"
            storageKey="weeklyWaterIntake"
            goal={2500}
          />
        </View>
        {/* Daily quote */}
        <DailyQuote />
      </ScrollView>
      <StatusBar barStyle="light-content" />
    </SafeAreaView>
  );
}
