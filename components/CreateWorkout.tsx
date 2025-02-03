import { router } from 'expo-router';
import { useState } from 'react';
import { View, Text, Alert } from 'react-native';

import { Button } from './Button';
import SelectionComponentList from './SelectionComponentList';

import getWorkout from '~/utils/getWorkout';

export default function CreateWorkout() {
  const [workout, setWorkout] = useState<any>(null);
  const [focus, setFocus] = useState('');
  const [level, setLevel] = useState('');
  const [duration, setDuration] = useState('');

  const createWorkout = () => {
    const result = getWorkout({ focus, level, duration });
    if (!result) {
      Alert.alert('Error while generating workout!');
      return;
    }
    setWorkout(result);
    router.push('/(home)', workout);
  };

  return (
    <View>
      <Text className="border-b-hairline border-gray-500 py-2 text-center text-2xl font-bold text-white">
        Create Workout
      </Text>
      <SelectionComponentList setFocus={setFocus} setLevel={setLevel} setDuration={setDuration} />
      <View className="m-10 gap-5">
        <Button title="Create Workout" onPress={createWorkout} className=" bg-green-700" />
        <Button title="Cancel" onPress={router.back} className="bg-red-600" />
      </View>
    </View>
  );
}
