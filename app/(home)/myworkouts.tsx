import { useAuth } from '@clerk/clerk-expo';
import { FontAwesome } from '@expo/vector-icons';
import { FlashList } from '@shopify/flash-list';
import { useEffect, useState } from 'react';
import { View, Text, Pressable, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CreateWorkout from '~/components/CreateWorkout';
import WorkoutListItem from '~/components/WorkoutListItem';
import { useWorkoutStore } from '~/store/useWorkoutStore';

export default function WorkoutHistory() {
  const { userId } = useAuth();
  const { fetchWorkouts, workouts } = useWorkoutStore();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (userId) {
      fetchWorkouts(userId);
    }
  }, []);

  return (
    <View className="flex-1 bg-gray-900">
      <SafeAreaView className="flex-1">
        <View className="border-b-hairline border-gray-300 p-6">
          <Text className="text-2xl font-bold text-green-500">Create Your Own Workout</Text>
        </View>
        <View className="flex-1 p-4">
          {workouts.length > 0 ? (
            <FlashList
              data={workouts}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <WorkoutListItem item={item} />}
            />
          ) : (
            <Text className="text-center text-lg font-semibold text-white">
              No workouts have been found! Lets create one!
            </Text>
          )}
        </View>
        <Pressable
          className="absolute bottom-4 right-4 rounded-full bg-green-500 p-4"
          onPress={() => {}}>
          <FontAwesome name="plus" size={20} color="black" onPress={() => setModalVisible(true)} />
        </Pressable>
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <CreateWorkout onClose={() => setModalVisible(false)} />
        </Modal>
      </SafeAreaView>
    </View>
  );
}
