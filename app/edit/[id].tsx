import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { View, Text, SafeAreaView, Pressable, TextInput, ScrollView } from 'react-native';

import { Button } from '~/components/Button';
import { useWorkoutStore } from '~/store/useWorkoutStore';

export default function EditPage() {
  const { id } = useLocalSearchParams();
  const { workouts, updateWorkout } = useWorkoutStore();
  const workout = workouts.find((workout) => workout.id.toString() === id);

  const [name, setName] = useState(workout?.name || '');
  const [category, setCategory] = useState(workout?.category || '');
  const [description, setDescription] = useState(workout?.description || '');
  const [instructions, setInstructions] = useState(workout?.instructions || '');
  const [exercises, setExercises] = useState(workout?.exercises || []);
  const [exerciseName, setExerciseName] = useState('');
  const [exerciseSets, setExerciseSets] = useState('');

  if (!workout) {
    return (
      <View className="flex-1 items-center justify-center gap-4 bg-gray-900">
        <Text className="text-white">No workout data has been found!</Text>
        <Pressable onPress={() => router.back()}>
          <Text className="font-bold text-blue-300">BACK</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-900">
      <SafeAreaView className="flex-1">
        <View className="border-b-hairline flex-row items-center border-gray-300 p-6">
          <Text className="flex-1 text-2xl font-bold text-green-500">Edit Your Workout</Text>
          <Pressable onPress={() => router.push('/myworkouts')}>
            <Text className="font-bold text-red-500">CANCEL</Text>
          </Pressable>
        </View>
        <ScrollView className="flex-1 p-2" showsVerticalScrollIndicator={false}>
          <TextInput
            defaultValue={workout.name}
            onChangeText={setName}
            placeholder="Workout Name"
            className="m-2 rounded-lg bg-gray-700 p-3 text-white"
            placeholderTextColor="white"
          />
          <TextInput
            defaultValue={workout.category}
            onChangeText={setCategory}
            placeholder="Category"
            placeholderTextColor="white"
            className="m-2 rounded-lg bg-gray-700 p-3 text-white"
          />
          <TextInput
            defaultValue={workout.description}
            onChangeText={setDescription}
            placeholder="Description"
            placeholderTextColor="white"
            multiline
            className="m-2 h-20 rounded-lg bg-gray-700 p-3 text-white"
          />
          <TextInput
            defaultValue={workout.instructions}
            onChangeText={setInstructions}
            placeholder="Instructions"
            placeholderTextColor="white"
            multiline
            className="m-2 h-20 rounded-lg bg-gray-700 p-3 text-white"
          />

          {/* Display Existing Exercises */}
          <Text className="mt-4 p-4 text-lg font-semibold text-white">Exercises</Text>
          {exercises?.map((exercise, index) => (
            <View
              key={index}
              className="m-2 flex-row items-center justify-between rounded-lg bg-gray-800 p-3">
              <View className="flex-1">
                <TextInput
                  value={exercise.name}
                  onChangeText={(text) => {
                    setExercises((prev) =>
                      prev.map((ex, i) => (i === index ? { ...ex, name: text } : ex))
                    );
                  }}
                  placeholder="Exercise Name"
                  placeholderTextColor="white"
                  className="m-1 rounded-lg bg-gray-700 p-2 text-white"
                />
                <TextInput
                  value={exercise.sets}
                  onChangeText={(text) => {
                    setExercises((prev) =>
                      prev.map((ex, i) => (i === index ? { ...ex, sets: text } : ex))
                    );
                  }}
                  placeholder="Sets"
                  placeholderTextColor="white"
                  className="m-1 rounded-lg bg-gray-700 p-2 text-white"
                />
              </View>
              <Pressable
                onPress={() => setExercises(exercises.filter((_, i) => i !== index))}
                className="ml-2 rounded-lg bg-red-500 p-2">
                <Text className="text-white">X</Text>
              </Pressable>
            </View>
          ))}

          {/* Add New Exercise */}
          <Text className="mt-4 p-4 text-lg font-semibold text-white">Add New Exercise</Text>
          <TextInput
            value={exerciseName}
            onChangeText={setExerciseName}
            placeholder="Exercise Name"
            placeholderTextColor="white"
            className="m-2 rounded-lg bg-gray-700 p-3 text-white"
          />
          <TextInput
            value={exerciseSets}
            onChangeText={setExerciseSets}
            placeholder="Sets"
            placeholderTextColor="white"
            className="m-2 rounded-lg bg-gray-700 p-3 text-white"
          />
          <Pressable
            onPress={() => {
              if (exerciseName.trim() && exerciseSets.trim()) {
                setExercises([
                  ...exercises,
                  { name: exerciseName, sets: exerciseSets, description: '', instructions: '' },
                ]);
                setExerciseName('');
                setExerciseSets('');
              }
            }}
            className="m-2 rounded-lg bg-green-500 p-3">
            <Text className="text-center font-bold text-white">Add Exercise</Text>
          </Pressable>
        </ScrollView>

        {/* Update Button */}
        <Button
          title="Update"
          onPress={() => {
            updateWorkout(workout.id.toString(), {
              name,
              category,
              description,
              instructions,
              exercises,
            });
            router.push('/myworkouts');
          }}
          className="m-8 mb-10 bg-green-600 text-white"
        />
      </SafeAreaView>
    </View>
  );
}
