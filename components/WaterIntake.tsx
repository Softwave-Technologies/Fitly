import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { View, Alert, ActivityIndicator, useWindowDimensions, Pressable, Text } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { ProgressBar } from 'react-native-paper';

import { Button } from './Button';

export default function WaterIntake() {
  const { width, height } = useWindowDimensions();
  const [waterData, setWaterData] = useState<number[]>([0, 0, 0, 0, 0, 0]);
  const [loading, setLoading] = useState(true);

  const timeLabels = ['6AM', '9AM', '12PM', '3PM', '6PM', '9PM'];
  const timeRanges = [6, 9, 12, 15, 18, 21];
  const goal = 2000;

  useEffect(() => {
    checkAndResetData();
  }, []);

  const checkAndResetData = async () => {
    try {
      const storedData = await AsyncStorage.getItem('waterIntakeData');
      const storedDate = await AsyncStorage.getItem('lastUpdateDate');

      const today = new Date().toISOString().split('T')[0];

      if (storedDate !== today) {
        await AsyncStorage.setItem('waterIntakeData', JSON.stringify([0, 0, 0, 0, 0, 0]));
        await AsyncStorage.setItem('lastUpdateDate', today);
        setWaterData([0, 0, 0, 0, 0, 0]);
      } else if (storedData) {
        setWaterData(JSON.parse(storedData));
      }
    } catch (error) {
      console.error('Error loading water data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentTimeSlot = () => {
    const currentHour = new Date().getHours();
    let closestIndex = 0;

    for (let i = 0; i < timeRanges.length; i++) {
      if (currentHour >= timeRanges[i]) {
        closestIndex = i;
      } else {
        break;
      }
    }

    return closestIndex;
  };

  const addWaterIntake = async () => {
    const index = getCurrentTimeSlot();
    const newData = [...waterData];
    newData[index] += 200;
    setWaterData(newData);
    await AsyncStorage.setItem('waterIntakeData', JSON.stringify(newData));
  };

  const updateWaterIntake = async (index: number) => {
    Alert.prompt(
      'Edit Water Intake',
      `Enter new amount for ${timeLabels[index]}`,
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
            await AsyncStorage.setItem('waterIntakeData', JSON.stringify(newData));
          },
        },
      ],
      'plain-text'
    );
  };

  const calculateWaterIntake = () => {
    const totalIntake = waterData.reduce((acc, val) => acc + val, 0);
    const progress = Math.min((totalIntake / goal) * 100, 100);

    return { totalIntake, progress };
  };

  const { totalIntake } = calculateWaterIntake();

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  const data = {
    labels: timeLabels,
    datasets: [{ data: waterData }],
  };

  return (
    <View className="p-4">
      {/* Daily water intake goal display */}
      <View className="my-2 items-center">
        <Text className="text-xl font-semibold text-white">
          Total Water Intake: {totalIntake}ml / {goal}ml
        </Text>
        <ProgressBar progress={totalIntake / goal} color="green" className="w-11/12 py-4" />
      </View>
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

        {/* Touch-sensitive areas for editing */}
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
              style={{
                flex: 1,
                height: '100%',
              }}
              onPress={() => updateWaterIntake(index)}
            />
          ))}
        </View>
      </View>

      {/* Add Water Intake Button */}
      <Button
        title="Add Water (200ml)"
        className="m-6"
        style={{ backgroundColor: 'green' }}
        onPress={addWaterIntake}
      />
    </View>
  );
}
