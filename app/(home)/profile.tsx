import { useUser } from '@clerk/clerk-expo';
import { View, Text, SafeAreaView } from 'react-native';

export default function Profile() {
  const { user } = useUser();
  return (
    <View className="flex-1 bg-black">
      <SafeAreaView>
        <View className="p-4">
          <Text className="text-2xl font-bold text-white">Profile Page</Text>
        </View>
        <View className="p-4">
          <Text className="text-white">Hello {user?.fullName}</Text>
        </View>
      </SafeAreaView>
    </View>
  );
}
