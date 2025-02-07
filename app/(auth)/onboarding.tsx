import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Text, SafeAreaView, View, Image, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';

//@ts-ignore
import onboard1 from '../../assets/onboarding/onboard1.jpg';
//@ts-ignore
import onboard2 from '../../assets/onboarding/onboard2.jpg';
//@ts-ignore
import onboard3 from '../../assets/onboarding/onboard3.jpg';

import { Button } from '~/components/Button';

export default function OnboardingPage() {
  return (
    <SafeAreaView className="flex-1 bg-black">
      <Text className="text-center text-3xl font-bold text-green-600">Fitly</Text>
      <Swiper loop={false} showsPagination dotColor="white">
        <View className="items-center justify-center gap-7 p-10">
          <Image
            source={onboard1}
            style={{
              height: Dimensions.get('window').height / 2,
              width: Dimensions.get('window').width - 50,
              borderRadius: 30,
            }}
          />
          <Text className="text-center text-2xl font-bold text-white">
            Stay on Top of Your Fitness Journey
          </Text>
          <Text className="text-center text-lg font-semibold text-gray-400">
            Easily log and track your workouts with real-time progress updates. From running to
            weightlifting, monitor every move and stay motivated to achieve your fitness goals.
          </Text>
        </View>
        <View className="items-center justify-center gap-7 p-10">
          <Image
            source={onboard2}
            style={{
              height: Dimensions.get('window').height / 2,
              width: Dimensions.get('window').width - 50,
              borderRadius: 30,
            }}
          />
          <Text className="text-center text-2xl font-bold text-white">
            Challenge Yourself, Compete with Others
          </Text>
          <Text className="text-center text-lg font-semibold text-gray-400">
            Push your limits by joining exciting fitness challenges. Compete with friends, climb
            leaderboards, and unlock your true potential in a supportive community.
          </Text>
        </View>
        <View className="items-center justify-center gap-7 p-10">
          <Image
            source={onboard3}
            style={{
              height: Dimensions.get('window').height / 2,
              width: Dimensions.get('window').width - 50,
              borderRadius: 30,
            }}
          />
          <Text className="text-center text-2xl font-bold text-white">Celebrate Your Success</Text>
          <Text className="text-center text-lg font-semibold text-gray-400">
            Share your fitness milestones with friends and inspire others. Whether it’s completing a
            challenge or reaching a personal best, let your achievements shine.
          </Text>
          <Button
            title="Get Started"
            onPress={() => router.push('/(auth)/sign-in')}
            style={{ width: Dimensions.get('window').width - 100 }}
          />
        </View>
      </Swiper>
      <StatusBar style="light" />
    </SafeAreaView>
  );
}
