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
  const [progress, setProgress] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  // Convert JS getDay (0=Sunday) to Monday-based index (0=Monday)
  const getTodayIndex = (): number => {
    const day = new Date().getDay(); // 0 (Sun) - 6 (Sat)
    return day === 0 ? 6 : day - 1; // convert Sunday to index 6
  };

  const fetchTodayProgress = async () => {
    setLoading(true);
    try {
      const storedData = await AsyncStorage.getItem(storageKey);
      let weeklyData: number[] = [];

      if (storedData) {
        const parsed = JSON.parse(storedData);
        // Make sure it's an array of 7 numbers
        if (Array.isArray(parsed) && parsed.length === 7) {
          weeklyData = parsed;
        }
      }

      const todayIndex = getTodayIndex();
      const todayProgress = weeklyData[todayIndex] || 0;

      setProgress(todayProgress);
    } catch (error) {
      console.error(`Error fetching progress for ${label}:`, error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchTodayProgress();
    }, [])
  );

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View>
      <CircularProgress
        progress={progress}
        goal={goal}
        label={label}
        color={color}
        iconName="tint"
      />
      <Text className="mt-2 text-center text-white">
        {progress} / {goal} ml
      </Text>
    </View>
  );
}
