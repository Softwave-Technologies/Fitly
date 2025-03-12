import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

import CircularProgress from './ProgressCircle';

export default function MainNutritionTrack() {
  const [goal, setGoal] = useState(10000);
  const [calories, setCalories] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchProgressData = async () => {
    setLoading(true);
    try {
      const storedData = await AsyncStorage.getItem('meals');
      const storedGoal = await AsyncStorage.getItem('calorieGoal');
      const dataArray = storedData ? JSON.parse(storedData) : [];
      const goalValue = storedGoal ? JSON.parse(storedGoal) : goal;

      const totalCalories = dataArray.reduce(
        (acc: number, meal: { calories: number }) => acc + Number(meal.calories || 0),
        0
      );

      setCalories(totalCalories);
      setGoal(goalValue);
    } catch (error) {
      console.log('Error while loading data', error);
    } finally {
      setLoading(false);
    }
  };

  const checkForDailyReset = async () => {
    const lastReset = await AsyncStorage.getItem('lastReset');
    const today = new Date().toDateString();
    if (lastReset !== today) {
      await AsyncStorage.setItem('meals', JSON.stringify([]));
      await AsyncStorage.setItem('lastReset', today);
      setCalories(0);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchProgressData();
      checkForDailyReset();
    }, [])
  );

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View>
      <CircularProgress
        progress={calories}
        label="Calories"
        iconName="fire"
        color="#FFA500"
        goal={goal}
      />
    </View>
  );
}
