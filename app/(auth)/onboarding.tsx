import { Text, SafeAreaView, View } from 'react-native';
import Swiper from 'react-native-swiper';

export default function OnboardingPage() {
  return (
    <SafeAreaView className="flex-1 bg-black">
      <Swiper loop={false} showsPagination dotColor="white">
        <View>
          <Text className="text-center text-2xl font-bold text-white">Onboarding</Text>
        </View>
        <View>
          <Text>Workout</Text>
        </View>
        <View>
          <Text>Tracking</Text>
        </View>
      </Swiper>
    </SafeAreaView>
  );
}
