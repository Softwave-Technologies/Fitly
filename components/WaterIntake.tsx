import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { View, Alert, ActivityIndicator, useWindowDimensions, Pressable, Text } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { ProgressBar } from 'react-native-paper';

import { Button } from './Button';

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const DAILY_GOAL = 2000;

export default function WaterIntake() {
  const { width, height } = useWindowDimensions();
  const [waterData, setWaterData] = useState<number[]>([0, 0, 0, 0, 0, 0, 0]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      checkAndResetWeeklyData();
    }, [])
  );

  const getCurrentWeekKey = () => {
    const today = new Date();
    const monday = new Date(today);
    const day = monday.getDay();
    const diff = monday.getDate() - day + (day === 0 ? -6 : 1);
    monday.setDate(diff);

    const year = monday.getFullYear();
    const weekNumber = Math.ceil(
      ((monday.getTime() - new Date(year, 0, 1).getTime()) / 86400000 +
        new Date(year, 0, 1).getDay() +
        1) /
        7
    );

    return `${year}-W${weekNumber}`;
  };

  const checkAndResetWeeklyData = async () => {
    try {
      const storedData = await AsyncStorage.getItem('weeklyWaterIntake');
      const storedWeekKey = await AsyncStorage.getItem('lastWeekKey');
      const currentWeekKey = getCurrentWeekKey();

      if (storedWeekKey !== currentWeekKey) {
        const newWeekData = [0, 0, 0, 0, 0, 0, 0];
        await AsyncStorage.setItem('weeklyWaterIntake', JSON.stringify(newWeekData));
        await AsyncStorage.setItem('lastWeekKey', currentWeekKey);
        setWaterData(newWeekData);
      } else if (storedData) {
        setWaterData(JSON.parse(storedData));
      }
    } catch (error) {
      console.error('Error loading weekly data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTodayIndex = () => {
    const day = new Date().getDay();
    return (day + 6) % 7; // Monday = 0, Sunday = 6
  };

  const addWaterIntake = async () => {
    const index = getTodayIndex();
    const newData = [...waterData];
    newData[index] += 200;
    setWaterData(newData);
    await AsyncStorage.setItem('weeklyWaterIntake', JSON.stringify(newData));
  };

  const updateWaterIntake = (index: number) => {
    Alert.prompt(
      'Edit Water Intake',
      `Enter new amount for ${daysOfWeek[index]}`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Save',
          onPress: async (value) => {
            const newValue = Number(value);
            if (isNaN(newValue) || newValue < 0) {
              Alert.alert('Invalid Input', 'Please enter a valid number.');
              return;
            }

            const newData = [...waterData];
            newData[index] = newValue;
            setWaterData(newData);
            await AsyncStorage.setItem('weeklyWaterIntake', JSON.stringify(newData));
          },
        },
      ],
      'plain-text'
    );
  };

  const todayIndex = getTodayIndex();
  const todayAmount = waterData[todayIndex];

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  const data = {
    labels: daysOfWeek,
    datasets: [{ data: waterData }],
  };

  return (
    <View className="p-4">
      {/* Daily progress for today */}
      <View className="my-2 items-center">
        <Text className="text-xl font-semibold text-white">
          Today: {todayAmount}ml / {DAILY_GOAL}ml
        </Text>
        <ProgressBar
          progress={Math.min(todayAmount / DAILY_GOAL, 1)}
          color="#00bcd4"
          className="w-11/12 py-4"
        />
      </View>

      {/* Weekly Chart */}
      <View>
        <BarChart
          data={data}
          width={width - 40}
          height={height / 4}
          yAxisLabel=""
          yAxisSuffix="ml"
          chartConfig={{
            backgroundGradientFrom: '#1a202c',
            backgroundGradientTo: '#1a202c',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(103, 232, 249, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            barPercentage: 0.6,
          }}
          style={{ borderRadius: 8, alignSelf: 'center' }}
        />

        {/* Tap to edit individual days */}
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 20,
            width: width - 40,
            height: height / 4,
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          {waterData.map((_, index) => (
            <Pressable
              key={index}
              style={{ flex: 1, height: '100%' }}
              onPress={() => updateWaterIntake(index)}
            />
          ))}
        </View>
      </View>

      {/* Add button */}
      <Button
        title="Add Water (200ml)"
        className="m-6"
        style={{ backgroundColor: 'green' }}
        onPress={addWaterIntake}
      />
      <Text className="text-center text-sm text-gray-400">
        Tap a bar to manually update a day’s intake. Data resets weekly.
      </Text>
    </View>
  );
}
