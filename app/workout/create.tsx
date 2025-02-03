import { SafeAreaView, View } from 'react-native';

import CreateWorkout from '~/components/CreateWorkout';

export default function CreateScreen() {
  return (
    <View className="flex-1 bg-black">
      <SafeAreaView>
        <CreateWorkout />
      </SafeAreaView>
    </View>
  );
}
