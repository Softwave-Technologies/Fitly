import { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, Pressable } from 'react-native';

import NutritionTrack from '~/components/NutritionTrack';
import WaterIntake from '~/components/WaterIntake';

export default function TrackingPage() {
  const [isOnWater, setIsOnWater] = useState(true);
  return (
    <View className="flex-1 bg-gray-900">
      <SafeAreaView className="flex-1">
        <View className="border-b-hairline border-gray-300 p-6">
          <Text className="text-2xl font-bold text-green-500">Water and Nutrition Tracking</Text>
        </View>
        <View className="flex-row gap-5 self-center py-4">
          <Pressable
            onPress={() => setIsOnWater(true)}
            className={`w-2/5 items-center rounded-lg px-4 py-2 ${isOnWater ? 'bg-green-600' : 'bg-gray-500'}`}>
            <Text className="font-semibold text-white">Water</Text>
          </Pressable>

          <Pressable
            onPress={() => setIsOnWater(false)}
            className={` w-2/5 items-center rounded-lg px-4 py-2 ${!isOnWater ? 'bg-green-600' : 'bg-gray-500'}`}>
            <Text className="font-semibold text-white">Nutrition</Text>
          </Pressable>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {isOnWater ? (
            <View>
              <Text className="p-2 pl-6 text-xl font-bold text-white">Daily Water Intake</Text>
              <WaterIntake />
            </View>
          ) : (
            <View>
              <Text className="p-2 pl-6 text-xl font-bold text-white">Nutrition Track</Text>
              <NutritionTrack />
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
