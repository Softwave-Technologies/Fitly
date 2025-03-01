import { Pedometer } from 'expo-sensors';
import { useEffect, useState } from 'react';
import { View, Text, Platform } from 'react-native';
import AppleHealthKit, { HealthInputOptions, HealthKitPermissions } from 'react-native-health';

export default function StepCounter() {
  const [steps, setSteps] = useState(0);
  const [isAvailable, setIsAvailable] = useState(false);
  const goal = 10000;
  const progress = (steps / goal) * 100;

  useEffect(() => {
    if (Platform.OS === 'android') {
      // Android
      const checkAvailability = async () => {
        const available = await Pedometer.isAvailableAsync();
        setIsAvailable(available);
      };

      checkAvailability();

      const subscription = Pedometer.watchStepCount((result) => {
        setSteps(result.steps);
      });

      return () => subscription && subscription.remove();
    } else {
      // iOS
      const permissions: HealthKitPermissions = {
        permissions: {
          read: [AppleHealthKit.Constants.Permissions.StepCount],
          write: [],
        },
      };

      AppleHealthKit.initHealthKit(permissions, (error) => {
        if (error) return console.log('HealthKit initialization failed:', error);

        const options: HealthInputOptions = {
          startDate: new Date().toISOString(),
        };

        AppleHealthKit.getStepCount(options, (err, results) => {
          if (!err) setSteps(results.value);
        });
      });
    }
  }, []);

  return (
    <View className="m-4 rounded-lg bg-gray-800 p-4">
      <Text className="text-xl font-bold text-white">👟 Steps Today</Text>
      <Text className="mt-2 text-4xl font-extrabold text-white">{steps}</Text>
      <View className="mt-4 h-2 w-full rounded-full bg-gray-600">
        <View className="h-2 rounded-full bg-green-500" style={{ width: `${progress}%` }} />
      </View>
      <Text className="mt-2 text-sm text-gray-300">
        {steps >= goal ? '🎉 Goal reached! Keep moving!' : `🚀 ${goal - steps} steps to go!`}
      </Text>
    </View>
  );
}
