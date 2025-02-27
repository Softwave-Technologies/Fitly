import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

export default function CreateWorkout({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [instructions, setInstructions] = useState('');
  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1">
        <Text className="border-b-hairline border-gray-300 p-4 text-2xl font-bold text-green-500">
          Create Workout
        </Text>
        <View className="py-2">
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Name"
            placeholderTextColor="white"
            className="m-2 rounded-lg bg-gray-700 p-3 text-white"
          />
          <TextInput
            value={category}
            onChangeText={setCategory}
            placeholder="Category"
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
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
