import { useUser } from '@clerk/clerk-expo';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { View, Text, SafeAreaView, Image } from 'react-native';

const motivationalQuotes = [
  'Push yourself, because no one else will do it for you.',
  "Don't stop when you're tired. Stop when you're done.",
  'Your only limit is you. Keep going!',
  'The secret of getting ahead is getting started.',
];

export default function HomePage() {
  const { user } = useUser();
  const [workout, setWorkout] = useState(null);

  //random quote for user
  const quote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

  const fetchWorkuout = async () => {};

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-row items-center justify-between p-10">
        <Text className="text-2xl font-bold text-green-600">Welcome {user?.firstName} !</Text>
        {user?.imageUrl && (
          <Image source={{ uri: user.imageUrl }} className="h-16 w-16 rounded-full" />
        )}
      </View>
      <View className="p-4">
        <Text className="text-center text-xl font-bold text-green-500">"{quote}"</Text>
      </View>
      <StatusBar style="light" />
    </SafeAreaView>
  );
}
