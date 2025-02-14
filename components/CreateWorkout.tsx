import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useState } from 'react';
import { View, Alert, Text, TouchableOpacity } from 'react-native';

import { Button } from './Button';
import SelectionComponentList from './SelectionComponentList';
import { WorkoutResponse, Workout } from '../types/types';

import getWorkout from '~/utils/getWorkout';

export default function CreateWorkout() {
  const [focus, setFocus] = useState('');
  const [level, setLevel] = useState('');
  const [duration, setDuration] = useState('');
  const [workouts, setWorkouts] = useState<Workout[] | null>(null);
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);

  const createWorkout = async () => {
    if (!focus || !level || !duration) {
      Alert.alert('Please select all options');
      return;
    }

    try {
      console.log('Fetching workout with:', { focus, level, duration });
      const result: WorkoutResponse | null = await getWorkout(focus, level, duration);

      if (!result || !result.workouts || result.workouts.length === 0) {
        console.error('Error: getWorkout returned no valid workouts');
        Alert.alert('Error fetching workout. Please try again.');
        return;
      }

      setWorkouts(result.workouts);
    } catch (error) {
      console.error('Error while generating workout!', error);
      Alert.alert('Failed to generate workout. Please try again.');
    }
  };

  const saveWorkout = async () => {
    if (!selectedWorkout) {
      Alert.alert('Please select a workout first.');
      return;
    }

    try {
      await AsyncStorage.setItem('workout', JSON.stringify(selectedWorkout));
      router.push('/(home)');
    } catch (error) {
      console.error('Error saving workout:', error);
      Alert.alert('Failed to save workout. Please try again.');
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

      {workouts && (
        <View>
          <Text className="text-xl font-bold">Select a Workout</Text>
          {workouts.map((workout, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedWorkout(workout)}
              style={{
                padding: 10,
                backgroundColor: selectedWorkout === workout ? 'blue' : 'gray',
                marginVertical: 5,
              }}>
              <Text className="text-white">{workout.name}</Text>
            </TouchableOpacity>
          ))}
          <Button title="Save Workout" onPress={saveWorkout} style={{ backgroundColor: 'blue' }} />
        </View>
      )}
    </View>
  );
}
