import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { View, Alert, ActivityIndicator, useWindowDimensions, Pressable } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

import { Button } from './Button';

export default function WaterIntake() {
  const { width, height } = useWindowDimensions();
  const [waterData, setWaterData] = useState<number[]>([0, 0, 0, 0, 0, 0]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWaterData();
  }, []);

  const loadWaterData = async () => {
    try {
      const storedData = await AsyncStorage.getItem('waterIntakeData');
      if (storedData) {
        setWaterData(JSON.parse(storedData));
      }
    } catch (error) {
      console.error('Error loading water data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateWaterIntake = async (index: number) => {
    Alert.prompt(
      'Edit Water Intake',
      `Enter new amount for ${data.labels[index]}`,
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

  const addWaterIntake = async () => {
    const newData = [...waterData];
    newData[newData.length - 1] += 200;
    setWaterData(newData);
    await AsyncStorage.setItem('waterIntakeData', JSON.stringify(newData));
  };

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  const data = {
    labels: ['6AM', '9AM', '12PM', '3PM', '6PM', '9PM'],
    datasets: [{ data: waterData }],
  };

  return (
    <View className="p-4">
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
            color: (opacity = 1) => `rgba(56, 189, 248, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            barPercentage: 0.6,
          }}
          style={{ borderRadius: 8, alignSelf: 'center' }}
        />

        {/* Transparent Grid for Touch Detection */}
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
      <Button title="Add Water (200ml)" className="m-6 bg-green-600/50" onPress={addWaterIntake} />
    </View>
  );
}
