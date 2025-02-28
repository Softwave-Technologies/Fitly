import { useClerk, useUser } from '@clerk/clerk-expo';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Redirect } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { ProgressBar } from 'react-native-paper';

export default function HomePage() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const [waterIntake, setWaterIntake] = useState(0);
  const [loading, setLoading] = useState(true);
  const waterGoal = 2000;

  useEffect(() => {
    const fetchProgressData = async () => {
      try {
        const storedWater = await AsyncStorage.getItem('waterIntakeData');
        const waterArray = storedWater ? JSON.parse(storedWater) : [0, 0, 0, 0, 0, 0];
        const totalWater = waterArray.reduce((acc: any, val: any) => acc + val, 0);

        setWaterIntake(totalWater);
      } catch (error) {
        console.error('Error fetching progress data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProgressData();
  }, []);

  if (!user) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  if (loading) {
    return <ActivityIndicator size="large" />;
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
        <View className="border-hairline m-4  gap-4 rounded-md border-gray-300 p-4">
          <View className="flex-row items-center gap-2 self-center">
            <Text className="text-md text-center font-semibold text-white">
              Water Intake Today {waterIntake} / {waterGoal} ml
            </Text>
            {waterIntake / waterGoal >= 1 && <FontAwesome name="check" size={20} color="green" />}
          </View>
          <ProgressBar progress={waterIntake / waterGoal} color="green" className="p-2" />
        </View>
      </ScrollView>
      <StatusBar style="light" />
    </SafeAreaView>
  );
}
