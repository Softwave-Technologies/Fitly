import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useState } from 'react';
import { View, Alert } from 'react-native';

import { Button } from './Button';
import SelectionComponentList from './SelectionComponentList';

import getWorkout from '~/utils/getWorkout';

export default function CreateWorkout() {
  const [focus, setFocus] = useState('');
  const [level, setLevel] = useState('');
  const [duration, setDuration] = useState('');
  const createWorkout = async () => {
    if (!focus || !level || !duration) {
      Alert.alert('Please select all options');
      return;
    }

    try {
      console.log('Fetching workout with:', { focus, level, duration });
      const result = await getWorkout(focus, level, duration);

      if (!result) {
        console.error('Error: getWorkout returned null or undefined');
        Alert.alert('Error fetching workout. Please try again.');
        return;
      }

      console.log('Workout received:', result);
      await AsyncStorage.setItem('workout', JSON.stringify(result));
      router.push('/(home)');
    } catch (error) {
      console.error('Error while generating workout!', error);
      Alert.alert('Failed to generate workout. Please try again.');
    }
  };

  return (
    <View>
      <SelectionComponentList setFocus={setFocus} setLevel={setLevel} setDuration={setDuration} />
      <View className="m-10 gap-5">
        <Button
          title="Create Workout"
          onPress={createWorkout}
          style={{ backgroundColor: 'green' }}
        />
      </View>
    </View>
  );
}
