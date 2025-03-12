import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';

export default function StreakTrack() {
  const [markedDates, setMarkedDates] = useState<{ [key: string]: any }>({});

  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          const storedData = await AsyncStorage.getItem('workoutDays');
          if (storedData) setMarkedDates(JSON.parse(storedData));
        } catch (error) {
          console.error('Error loading workout data:', error);
        }
      })();
    }, [])
  );

  const handleDayPress = async (day: DateData) => {
    const updatedMarkedDates = { ...markedDates };
    if (updatedMarkedDates[day.dateString]) {
      delete updatedMarkedDates[day.dateString];
    } else {
      updatedMarkedDates[day.dateString] = true;
    }
    setMarkedDates(updatedMarkedDates);
    await AsyncStorage.setItem('workoutDays', JSON.stringify(updatedMarkedDates));
  };

  return (
    <View className="p-4">
      <Calendar
        markingType="custom"
        onDayPress={handleDayPress}
        theme={{
          backgroundColor: '#1F2937',
          calendarBackground: '#1F2937',
          textSectionTitleColor: '#e5e7eb',
          dayTextColor: '#ffffff',
          todayTextColor: '#facc15',
          monthTextColor: '#e5e7eb',
          arrowColor: '#e5e7eb',
          textDisabledColor: '#6b7280',
        }}
        dayComponent={({ date, state }: { date: any; state: any }) => (
          <TouchableOpacity onPress={() => handleDayPress(date!)}>
            <View style={{ alignItems: 'center', justifyContent: 'center', height: 30, width: 30 }}>
              {markedDates[date?.dateString] ? (
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>✅</Text>
              ) : (
                <Text
                  style={{
                    color: state === 'disabled' ? '#6b7280' : '#ffffff',
                    fontWeight: 'bold',
                    fontSize: 16,
                  }}>
                  {date?.day}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
