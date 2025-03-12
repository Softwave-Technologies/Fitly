import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { View } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';

export default function StreakTrack() {
  const [markedDates, setMarkedDates] = useState<{ [key: string]: any }>({});

  useFocusEffect(
    useCallback(() => {
      loadWorkoutData();
    }, [])
  );

  const loadWorkoutData = async () => {
    try {
      const storedData = await AsyncStorage.getItem('workoutDays');
      if (storedData) {
        setMarkedDates(JSON.parse(storedData));
      }
    } catch (error) {
      console.error('Error loading workout data:', error);
    }
  };

  const handleDayPress = async (day: DateData) => {
    const newMarkedDates = { ...markedDates };

    if (newMarkedDates[day.dateString]) {
      delete newMarkedDates[day.dateString];
    } else {
      newMarkedDates[day.dateString] = {
        marked: true,
        customStyles: {
          container: { backgroundColor: 'green', borderRadius: 10 },
          text: { color: 'white', fontWeight: 'bold' },
        },
      };
    }
    setMarkedDates(newMarkedDates);
    await AsyncStorage.setItem('workoutDays', JSON.stringify(newMarkedDates));
  };

  return (
    <View className="p-4">
      <Calendar
        markingType="custom"
        onDayPress={handleDayPress}
        markedDates={markedDates}
        theme={{
          backgroundColor: '#1F2937', // bg-gray-900
          calendarBackground: '#1F2937',
          textSectionTitleColor: '#e5e7eb',
          dayTextColor: '#ffffff',
          todayTextColor: '#facc15',
          selectedDayBackgroundColor: '#22c55e',
          monthTextColor: '#e5e7eb',
          arrowColor: '#e5e7eb',
          textDisabledColor: '#6b7280',
        }}
      />
    </View>
  );
}
