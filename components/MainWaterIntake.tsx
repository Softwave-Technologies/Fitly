import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { ActivityIndicator, View, Text } from 'react-native';

import CircularProgress from './ProgressCircle';

interface ProgressTrackerProps {
  label: string;
  color: string;
  storageKey: string;
  goal: number;
}

export default function ProgressTracker({ label, color, storageKey, goal }: ProgressTrackerProps) {
  const [progress, setProgress] = useState(0);
  const [data, setData] = useState<number[]>([0, 0, 0, 0, 0, 0]);
  const [loading, setLoading] = useState(true);

  const fetchProgressData = async () => {
    try {
      const storedData = await AsyncStorage.getItem(storageKey);
      const dataArray = storedData ? JSON.parse(storedData) : [0, 0, 0, 0, 0, 0];
      const totalProgress = dataArray.reduce((acc: any, val: any) => acc + val, 0);

      setProgress(totalProgress);
      setData(dataArray);
    } catch (error) {
      console.error(`Error fetching ${label} data:`, error);
    } finally {
      setLoading(false);
    }
  };

  const checkAndResetData = async () => {
    try {
      const storedDate = await AsyncStorage.getItem('lastUpdateDate');
      const today = new Date().toISOString().split('T')[0];

      if (storedDate !== today) {
        await AsyncStorage.setItem(storageKey, JSON.stringify([0, 0, 0, 0, 0, 0]));
        await AsyncStorage.setItem('lastUpdateDate', today);
        setData([0, 0, 0, 0, 0, 0]);
      }
    } catch (error) {
      console.error(`Error resetting ${label} data:`, error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      checkAndResetData();
      fetchProgressData();
    }, [])
  );

  if (!data) return <Text>Error while loading water intake data.</Text>;

  if (loading) return <ActivityIndicator size="large" />;

  return (
    <View>
      <CircularProgress
        progress={progress}
        goal={goal}
        label={label}
        color={color}
        iconName="tint"
      />
      <Text className="text-center text-white">
        {progress} / {goal} ml
      </Text>
    </View>
  );
}
