import { useClerk, useUser } from '@clerk/clerk-expo';
import { FontAwesome } from '@expo/vector-icons';
import { Redirect } from 'expo-router';
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
        <Pressable className="p-2" onPress={() => signOut()}>
          <FontAwesome name="power-off" size={30} color="red" />
        </Pressable>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} className="pb-4">
        {/* Daily quote */}
        <DailyQuote />
        <View className="border-b-hairline border-t-hairline m-4 flex-row items-center justify-around border-gray-300 p-2">
          {/* Calorie track circle */}
          <MainNutritionTrack />
          {/* Step track */}
          <StepCounter />
          {/* Water Intake home */}
          <MainWaterIntake
            label="Water"
            color="#3498db"
            unit="ml"
            storageKey="waterIntakeData"
            goal={2000}
            timeRanges={[6, 9, 12, 15, 18, 21]}
            incrementValue={200}
          />
        </View>
        {/* Calendar for streak */}
        <StreakTrack />
      </ScrollView>
      <StatusBar barStyle="light-content" />
    </SafeAreaView>
  );
}
