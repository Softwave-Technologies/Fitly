import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { View, Text } from 'react-native';

import CircularProgress from './ProgressCircle';

export default function MainNutritionTrack() {
  const [progress, setProgress] = useState(0);
  const [goal, setGoal] = useState(10000);
  const [data, setData] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchProgressData = async () => {
    setLoading(true);

    const storedData = await AsyncStorage.getItem('meals');
    const storedGoal = await AsyncStorage.getItem('calorieGoal');

    if (storedData) {
      setData(JSON.parse(storedData));
    }
    if (storedGoal) {
      setGoal(JSON.parse(storedGoal));
    }

    try {
    } catch (error) {
      console.log('Error while loading data ', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <CircularProgress
        progress={progress}
        label="Calories"
        iconName="fire"
        color="#FFA500"
        goal={goal}
      />
    </View>
  );
}
