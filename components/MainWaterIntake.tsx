import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { ActivityIndicator, View, Text } from 'react-native';

//import { Button } from './Button';
import CircularProgress from './ProgressCircle';

interface ProgressTrackerProps {
  label: string;
  color: string;
  storageKey: string;
  unit: string;
  incrementValue: number;
  goal: number;
  timeRanges?: number[];
}

export default function ProgressTracker({
  label,
  color,
  storageKey,
  unit,
  incrementValue,
  goal,
  timeRanges,
}: ProgressTrackerProps) {
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

  {
    /* 
  const getCurrentTimeSlot = () => {
    if (!timeRanges) return 0;
    const currentHour = new Date().getHours();
    let closestIndex = 0;

    for (let i = 0; i < timeRanges.length; i++) {
      if (currentHour >= timeRanges[i]) {
        closestIndex = i;
      } else {
        break;
      }
    }

    return closestIndex;*
  };*/
  }

  {
    /* 
  const addProgress = async () => {
    const index = timeRanges ? getCurrentTimeSlot() : 0;
    const newData = [...data];
    newData[index] += incrementValue;
    await AsyncStorage.setItem(storageKey, JSON.stringify(newData));

    setData(newData);
    setProgress(newData.reduce((acc, val) => acc + val, 0));
  };*/
  }

  useFocusEffect(
    useCallback(() => {
      fetchProgressData();
      checkAndResetData();
    }, [])
  );

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
      {/*  <Button
        title={`Add ${incrementValue} ${unit}`}
        className="m-2 w-2/3 self-center"
        style={{ backgroundColor: color }}
        onPress={addProgress}
      />*/}
      <Text className="text-center text-white">
        {progress} / {goal} ml
      </Text>
    </View>
  );
}
