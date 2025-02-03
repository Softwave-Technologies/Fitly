import { useUser } from '@clerk/clerk-expo';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { View, Text, SafeAreaView, Image } from 'react-native';

export default function HomePage() {
  const { user } = useUser();
  const [workout, setWorkout] = useState(null);

  const createWorkuout = async () => {};

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-row items-center justify-between p-10">
        <Text className="text-2xl font-bold text-green-600">Welcome {user?.firstName} !</Text>
        {user?.imageUrl && (
          <Image source={{ uri: user.imageUrl }} className="h-16 w-16 rounded-full" />
        )}
      </View>
      <StatusBar style="light" />
    </SafeAreaView>
  );
}
