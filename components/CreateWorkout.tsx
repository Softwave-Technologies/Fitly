import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import { useWorkoutStore } from '../store/useWorkoutStore';

export default function CreateWorkout({
  onClose,
  userId,
}: {
  onClose: () => void;
  userId: string;
}) {
  const { addWorkout } = useWorkoutStore();

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [instructions, setInstructions] = useState('');
  const [exercises, setExercises] = useState<
    { name: string; sets: string; description: string; instructions: string }[]
  >([]);

  const [exerciseName, setExerciseName] = useState('');
  const [exerciseSets, setExerciseSets] = useState('');
  const [exerciseDescription, setExerciseDescription] = useState('');
  const [exerciseInstructions, setExerciseInstructions] = useState('');

  const handleAddExercise = () => {
    if (exerciseName.trim() === '' || exerciseSets.trim() === '') return;
    setExercises([
      ...exercises,
      {
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
  };

  const handleRemoveExercise = (index: number) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  const handleSaveWorkout = async () => {
    if (!name.trim() || exercises.length === 0) return;

    await addWorkout(userId, { name, category, description, instructions }, exercises);
    onClose();
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1">
        <Text className="border-b border-gray-300 p-4 text-2xl font-bold text-green-500">
          Create Workout
        </Text>

        <ScrollView className="px-4 py-2">
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Workout Name"
            placeholderTextColor="white"
            className="m-2 rounded-lg bg-gray-700 p-3 text-white"
          />
          <TextInput
            value={category}
            onChangeText={setCategory}
            placeholder="Category"
            placeholderTextColor="white"
            className="m-2 rounded-lg bg-gray-700 p-3 text-white"
          />
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="Description"
            placeholderTextColor="white"
            multiline
            className="m-2 h-20 rounded-lg bg-gray-700 p-3 text-white"
          />
          <TextInput
            value={instructions}
            onChangeText={setInstructions}
            placeholder="Instructions"
            placeholderTextColor="white"
            multiline
            className="m-2 h-20 rounded-lg bg-gray-700 p-3 text-white"
          />

          {/* Exercise Inputs */}
          <View className="mt-4">
            <Text className="text-lg font-semibold text-white">Add Exercises</Text>
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
            <TextInput
              value={exerciseDescription}
              onChangeText={setExerciseDescription}
              placeholder="Description"
              placeholderTextColor="white"
              multiline
              className="m-2 rounded-lg bg-gray-700 p-3 text-white"
            />
            <TextInput
              value={exerciseInstructions}
              onChangeText={setExerciseInstructions}
              placeholder="Instructions"
              placeholderTextColor="white"
              multiline
              className="m-2 rounded-lg bg-gray-700 p-3 text-white"
            />

            <TouchableOpacity
              onPress={handleAddExercise}
              className="m-2 rounded-lg bg-green-500 p-3">
              <Text className="text-center font-bold text-white">Add Exercise</Text>
            </TouchableOpacity>
          </View>

          {/* Display Added Exercises */}
          {exercises.length > 0 && (
            <View className="mt-4">
              <Text className="text-lg font-semibold text-white">Exercises:</Text>
              {exercises.map((exercise, index) => (
                <View
                  key={index}
                  className="m-2 flex-row items-center justify-between rounded-lg bg-gray-800 p-3">
                  <Text className="text-white">
                    {exercise.name} - {exercise.sets} sets
                  </Text>
                  <TouchableOpacity
                    onPress={() => handleRemoveExercise(index)}
                    className="ml-2 rounded-lg bg-red-500 p-2">
                    <Text className="text-white">X</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}

          {/* Save Workout */}
          <TouchableOpacity onPress={handleSaveWorkout} className="m-2 rounded-lg bg-blue-500 p-3">
            <Text className="text-center font-bold text-white">Save Workout</Text>
          </TouchableOpacity>

          {/* Close Button */}
          <TouchableOpacity onPress={onClose} className="m-2 rounded-lg bg-gray-600 p-3">
            <Text className="text-center font-bold text-white">Cancel</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
