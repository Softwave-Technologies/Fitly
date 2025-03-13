import { useAuth } from '@clerk/clerk-expo';
import { FontAwesome } from '@expo/vector-icons';
import { FlashList } from '@shopify/flash-list';
import { Link } from 'expo-router';
import { useState, useEffect } from 'react';
import { View, Text, Pressable, SafeAreaView, Modal, Alert } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import preMadeWorkouts from '../../assets/data/preWorkouts.json';

import CreateWorkout from '~/components/CreateWorkout';
import WorkoutListItem from '~/components/WorkoutListItem';
import { useWorkoutStore } from '~/store/useWorkoutStore';

export default function WorkoutsScreen() {
  const [isCreating, setIsCreating] = useState(false); // Toggle between views
  const [modalVisible, setModalVisible] = useState(false);
  const { userId } = useAuth();
  const { fetchWorkouts, workouts, deleteWorkout } = useWorkoutStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      fetchWorkouts(userId);
    }
    setLoading(false);
  }, []);

  const handleDeleteWorkout = (id: string) => {
    Alert.alert('Delete Workout', 'Are you sure you want to delete this workout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => deleteWorkout(id),
      },
    ]);
  };

  const preMadeList = preMadeWorkouts.map((workout) => ({
    ...workout,
    exercises: workout.exercises.map((exercise) => ({
      ...exercise,
      workout_id: workout.id.toString(),
    })),
  }));

  return (
    <View className="flex-1 bg-gray-900">
      <SafeAreaView className="flex-1">
        {/* Toggle Buttons */}
        <View className="border-b-hairline border-gray-300 p-6">
          <Text className="text-2xl font-bold text-green-500">Workouts</Text>
        </View>
        <View className="flex-row gap-5 self-center py-4">
          <Pressable
            onPress={() => setIsCreating(false)}
            className={`w-2/5 items-center rounded-lg px-4 py-2 ${!isCreating ? 'bg-green-600' : 'bg-gray-500'}`}>
            <Text className="font-semibold text-white">Pre-Made Workouts</Text>
          </Pressable>

          <Pressable
            onPress={() => setIsCreating(true)}
            className={` w-2/5 items-center rounded-lg px-4 py-2 ${isCreating ? 'bg-green-600' : 'bg-gray-500'}`}>
            <Text className="font-semibold text-white">Create Workout</Text>
          </Pressable>
        </View>

        {/* Conditional Rendering */}
        {isCreating ? (
          // Create Workout Section
          <View className="flex-1 p-4">
            {loading ? (
              <ActivityIndicator className="self-center" size="large" />
            ) : workouts.length > 0 ? (
              <FlashList
                data={workouts}
                estimatedItemSize={workouts.length}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <View className="flex-row items-center gap-2">
                    <WorkoutListItem item={item} />
                    <View className="gap-2">
                      <Link asChild href={`/edit/${item.id}`}>
                        <Pressable>
                          <FontAwesome name="edit" size={25} color="gray" />
                        </Pressable>
                      </Link>
                      <Pressable
                        onPress={() => handleDeleteWorkout(item.id.toString())}
                        className="justify-end">
                        <FontAwesome name="trash" size={25} color="red" />
                      </Pressable>
                    </View>
                  </View>
                )}
              />
            ) : (
              <Text className="text-center text-lg font-semibold text-white">
                No workouts found! Let's create one!
              </Text>
            )}

            {/* Floating Button for Creating Workout */}
            <Pressable
              className="absolute bottom-4 right-4 rounded-full bg-green-500 p-4"
              onPress={() => setModalVisible(true)}>
              <FontAwesome name="plus" size={20} color="black" />
            </Pressable>

            {/* Modal for Creating Workout */}
            <Modal
              animationType="slide"
              transparent={false}
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}>
              <CreateWorkout userId={userId ?? ''} onClose={() => setModalVisible(false)} />
            </Modal>
          </View>
        ) : (
          // Pre-Made Workouts Section
          <View className="flex-1 p-4">
            <Text className="text-lg font-semibold text-white">Choose Your Workout</Text>
            <FlashList
              data={preMadeList}
              estimatedItemSize={10}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <WorkoutListItem item={item} />}
            />
          </View>
        )}
      </SafeAreaView>
    </View>
  );
}
