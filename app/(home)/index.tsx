import { useClerk, useUser } from '@clerk/clerk-expo';
import { FontAwesome, FontAwesome5, FontAwesome6 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Redirect, useFocusEffect } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import { Button } from '../../components/Button';

import CircularProgress from '~/components/ProgressCircle';

export default function HomePage() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const [waterIntake, setWaterIntake] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [waterData, setWaterData] = useState<number[]>([0, 0, 0, 0, 0, 0]);

  const [loading, setLoading] = useState(true);
  const waterGoal = 2000;

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

  const checkAndResetData = async () => {
    try {
      const storedData = await AsyncStorage.getItem('waterIntakeData');
      const storedDate = await AsyncStorage.getItem('lastUpdateDate');

      const today = new Date().toISOString().split('T')[0];

      if (storedDate !== today) {
        await AsyncStorage.setItem('waterIntakeData', JSON.stringify([0, 0, 0, 0, 0, 0]));
        await AsyncStorage.setItem('lastUpdateDate', today);
        setWaterData([0, 0, 0, 0, 0, 0]);
      } else if (storedData) {
        setWaterData(JSON.parse(storedData));
      }
    } catch (error) {
      console.error('Error loading water data:', error);
    } finally {
      setLoading(false);
    }
  };

  const addWaterIntake = () => {};

  useFocusEffect(
    useCallback(() => {
      fetchProgressData();
      checkAndResetData();
    }, [])
  );

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
        <View>
          <CircularProgress progress={waterIntake} goal={waterGoal} />
          <View className="flex-row items-center justify-center gap-4">
            <Button
              title="Add Water"
              className="m-2 w-1/2"
              style={{ backgroundColor: 'royalblue' }}
              onPress={addWaterIntake}
            />
            <View className="items-center gap-1 rounded-xl bg-[#4169e1] p-4">
              <FontAwesome6 name="glass-water" size={15} color="white" />
              <Text className="font-semibold text-white">200 ml</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <StatusBar style="light" />
    </SafeAreaView>
  );
}
