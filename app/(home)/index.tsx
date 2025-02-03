import { useUser } from '@clerk/clerk-expo';
import { FontAwesome } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, Text, SafeAreaView, Image, Pressable } from 'react-native';

export default function HomePage() {
  const { user } = useUser();

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <View className="border-b-hairline flex-row items-center justify-between border-gray-300 p-10">
        <Text className="text-2xl font-bold text-green-600">Welcome {user?.firstName} !</Text>
        {user?.imageUrl && (
          <Image source={{ uri: user.imageUrl }} className="h-16 w-16 rounded-full" />
        )}
      </View>
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
