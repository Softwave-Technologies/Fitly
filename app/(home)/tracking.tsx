import { View, Text, SafeAreaView, ScrollView } from 'react-native';

import NutritionTrack from '~/components/NutritionTrack';
import WaterIntake from '~/components/WaterIntake';

export default function TrackingPage() {
  return (
    <View className="flex-1 bg-gray-900">
      <SafeAreaView className="flex-1">
        <View className="border-b-hairline border-gray-300 p-6">
          <Text className="text-2xl font-bold text-green-500">Water and Nutrition Tracking</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <Text className="p-2 pl-6 text-xl font-bold text-white">Daily Water Intake</Text>
            <WaterIntake />
          </View>
          <View>
            <Text className="p-2 pl-6 text-xl font-bold text-white">Nutrition Track</Text>
            <NutritionTrack />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
