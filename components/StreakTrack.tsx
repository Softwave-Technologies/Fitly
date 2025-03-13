import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';

export default function StreakTrack() {
  const [markedDates, setMarkedDates] = useState<{ [key: string]: any }>({});
  const [streak, setStreak] = useState<number>(0);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          const storedData = await AsyncStorage.getItem('workoutDays');
          if (storedData) {
            const parsedData = JSON.parse(storedData);
            setMarkedDates(parsedData);
            calculateStreak(parsedData);
          }
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

    calculateStreak(updatedMarkedDates);
  };

  const calculateStreak = (markedDays: { [key: string]: any }) => {
    const dates = Object.keys(markedDays).map((date) => new Date(date));
    dates.sort((a, b) => a.getTime() - b.getTime());

    let currentStreak = 0;
    let maxStreak = 0;

    for (let i = 0; i < dates.length; i++) {
      if (i === 0 || dates[i].getTime() - dates[i - 1].getTime() === 86400000) {
        currentStreak++;
      } else {
        currentStreak = 1;
      }
      maxStreak = Math.max(maxStreak, currentStreak);
    }

    setStreak(maxStreak);
  };

  return (
    <View className="gap-2 p-4">
      <Text className="mb-2 text-center text-xl font-bold text-white">
        🔥 Current Streak: {streak} days
      </Text>
      <Text className="text-md p-2 text-center font-semibold text-gray-400">
        ✅ Tap on a day to mark it as completed. 🔥 Keep marking consecutive days to increase your
        streak! Keep track on your exercise routine and stay motivated!
      </Text>
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
          <Pressable onPress={() => handleDayPress(date!)}>
            <View style={{ alignItems: 'center', justifyContent: 'center', height: 30, width: 30 }}>
              {markedDates[date?.dateString] ? (
                <Text style={{ fontSize: 20 }}>✅</Text>
              ) : (
                <Text
                  style={{
                    color:
                      date?.dateString === new Date().toISOString().split('T')[0]
                        ? '#facc15'
                        : state === 'disabled'
                          ? '#6b7280'
                          : '#ffffff',
                    fontWeight: 'bold',
                    fontSize: 16,
                  }}>
                  {date?.day}
                </Text>
              )}
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}
