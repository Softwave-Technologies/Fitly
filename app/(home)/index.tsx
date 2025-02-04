import { useUser } from '@clerk/clerk-expo';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, Image, Pressable } from 'react-native';

export default function HomePage() {
  const { user } = useUser();
  const [workout, setWorkout] = useState(null);

  useEffect(() => {
    const fetchWorkout = async () => {
      const data = await AsyncStorage.getItem('workout');
      if (data) {
        setWorkout(JSON.parse(data));
      }
    };
    fetchWorkout();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <View className="border-b-hairline flex-row items-center justify-between border-gray-300 p-10">
        <Text className="text-2xl font-bold text-white">Welcome {user?.firstName} !</Text>
        {user?.imageUrl && (
          <Image source={{ uri: user.imageUrl }} className="h-16 w-16 rounded-full" />
        )}
      </View>
      {!workout && (
        <View className="flex-1 items-center p-2">
          <Text className="text-lg font-semibold text-red-600">
            No ongoing workout data has ben found!
          </Text>
        </View>
      )}
      {/* Created workout text and steps */}

      {/* Calorie track */}
      {/* Create workout */}
      <View className="absolute bottom-7 right-7 rounded-full bg-green-500">
        <Link asChild href="/workout/create">
          <Pressable className="m-4">
            <FontAwesome name="plus" color="white" size={20} />
          </Pressable>
        </Link>
      </View>
      <StatusBar style="light" />
    </SafeAreaView>
  );
}
