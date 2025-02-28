import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { View, Text, SafeAreaView, Pressable, TextInput, ScrollView } from 'react-native';

import { Button } from '~/components/Button';
import { useWorkoutStore } from '~/store/useWorkoutStore';
import { Exercise } from '~/types/types';

export default function EditPage() {
  const { id } = useLocalSearchParams();
  const { workouts, updateWorkout } = useWorkoutStore();
  const workout = workouts.find((workout) => workout.id.toString() === id);

  const [name, setName] = useState(workout?.name || '');
  const [category, setCategory] = useState(workout?.category || '');
  const [description, setDescription] = useState(workout?.description || '');
  const [instructions, setInstructions] = useState(workout?.instructions || '');
  const [exercises, setExercises] = useState<Exercise[]>(workout?.exercises || []);

  const [exerciseName, setExerciseName] = useState('');
  const [exerciseSets, setExerciseSets] = useState('');
  const [exerciseDescription, setExerciseDescription] = useState('');
  const [exerciseInstructions, setExerciseInstructions] = useState('');

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
          {/* Main Workout Fields */}
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Workout Name"
            className="m-2 rounded-lg bg-gray-700 p-3 text-white"
            placeholderTextColor="white"
          />
          <TextInput
            value={category}
            onChangeText={setCategory}
            placeholder="Category"
            className="m-2 rounded-lg bg-gray-700 p-3 text-white"
            placeholderTextColor="white"
          />
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="Description"
            className="m-2 h-20 rounded-lg bg-gray-700 p-3 text-white"
            placeholderTextColor="white"
            multiline
          />
          <TextInput
            value={instructions}
            onChangeText={setInstructions}
            placeholder="Instructions"
            className="m-2 h-20 rounded-lg bg-gray-700 p-3 text-white"
            placeholderTextColor="white"
            multiline
          />

          {/* Display Existing Exercises */}
          <Text className="mt-4 p-4 text-lg font-semibold text-white">Exercises</Text>
          {exercises.map((exercise, index) => (
            <View
              key={index}
              className="m-2 flex-row items-center justify-between rounded-lg bg-gray-800 p-3">
              <View className="flex-1">
                <TextInput
                  value={exercise.name}
                  onChangeText={(text) =>
                    setExercises((prev) =>
                      prev.map((ex, i) => (i === index ? { ...ex, name: text } : ex))
                    )
                  }
                  placeholder="Exercise Name"
                  className="m-1 rounded-lg bg-gray-700 p-2 text-white"
                  placeholderTextColor="white"
                />
                <TextInput
                  value={exercise.sets}
                  onChangeText={(text) =>
                    setExercises((prev) =>
                      prev.map((ex, i) => (i === index ? { ...ex, sets: text } : ex))
                    )
                  }
                  placeholder="Sets"
                  className="m-1 rounded-lg bg-gray-700 p-2 text-white"
                  placeholderTextColor="white"
                />
                <TextInput
                  value={exercise.description}
                  onChangeText={(text) =>
                    setExercises((prev) =>
                      prev.map((ex, i) => (i === index ? { ...ex, description: text } : ex))
                    )
                  }
                  placeholder="Description"
                  className="m-1 rounded-lg bg-gray-700 p-2 text-white"
                  placeholderTextColor="white"
                  multiline
                />
                <TextInput
                  value={exercise.instructions}
                  onChangeText={(text) =>
                    setExercises((prev) =>
                      prev.map((ex, i) => (i === index ? { ...ex, instructions: text } : ex))
                    )
                  }
                  placeholder="Instructions"
                  className="m-1 rounded-lg bg-gray-700 p-2 text-white"
                  placeholderTextColor="white"
                  multiline
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
            className="m-2 rounded-lg bg-gray-700 p-3 text-white"
            placeholderTextColor="white"
          />
          <TextInput
            value={exerciseSets}
            onChangeText={setExerciseSets}
            keyboardType="numeric"
            placeholder="Sets"
            className="m-2 rounded-lg bg-gray-700 p-3 text-white"
            placeholderTextColor="white"
          />
          <TextInput
            value={exerciseDescription}
            onChangeText={setExerciseDescription}
            placeholder="Description"
            className="m-2 rounded-lg bg-gray-700 p-3 text-white"
            placeholderTextColor="white"
            multiline
          />
          <TextInput
            value={exerciseInstructions}
            onChangeText={setExerciseInstructions}
            placeholder="Instructions"
            className="m-2 rounded-lg bg-gray-700 p-3 text-white"
            placeholderTextColor="white"
            multiline
          />
          <Pressable
            onPress={() => {
              setExercises([
                ...exercises,
                {
                  workout_id: id.toString(),
                  name: exerciseName,
                  sets: exerciseSets,
                  description: exerciseDescription,
                  instructions: exerciseInstructions,
                },
              ]);
              setExerciseName('');
              setExerciseSets('');
              setExerciseDescription('');
              setExerciseInstructions('');
            }}
            className="m-2 rounded-lg bg-green-500 p-3">
            <Text className="text-center font-bold text-white">Add Exercise</Text>
          </Pressable>
        </ScrollView>

        {/* Update Button */}
        <Button
          title="Update"
          onPress={() => {
            updateWorkout(
              workout.id.toString(),
              {
                name,
                category,
                description,
                instructions,
              },
              exercises
            );
            router.push('/myworkouts');
          }}
          className="m-8 mb-10 bg-green-600 text-white"
        />
      </SafeAreaView>
    </View>
  );
}
