import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { View, Text, useWindowDimensions, ActivityIndicator } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

import { Button } from './Button';

export default function WaterIntake() {
  const { width, height } = useWindowDimensions();
  const [waterData, setWaterData] = useState([0, 0, 0, 0, 0, 0]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadWaterData();
  }, []);

  const loadWaterData = async () => {
    setLoading(true);
    try {
      const storedData = await AsyncStorage.getItem('waterIntakeData');
      if (storedData) {
        setWaterData(JSON.parse(storedData));
      }
    } catch (error) {
      console.error('Error while fetching water data ', error);
    } finally {
      setLoading(false);
    }
  };

  const addWaterIntake = async () => {
    const newData = [...waterData];
    newData[newData.length - 1] += 200;
    setWaterData(newData);
    await AsyncStorage.setItem('waterIntakeData', JSON.stringify(newData));
  };

  const data = {
    labels: ['6AM', '9AM', '12PM', '3PM', '6PM', '9PM'],
    datasets: [
      {
        data: waterData,
      },
    ],
  };

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View>
      <Text>Water Intake</Text>
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
      <Button title="Add Water(200ml)" className="m-6 bg-green-600/50" onPress={addWaterIntake} />
    </View>
  );
}
