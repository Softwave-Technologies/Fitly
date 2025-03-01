import { Pedometer } from 'expo-sensors';
import { useEffect, useState } from 'react';
import { View, Text, Platform } from 'react-native';
import AppleHealthKit, { HealthInputOptions, HealthKitPermissions } from 'react-native-health';

export default function StepCounter() {
  const [steps, setSteps] = useState(0);
  const [isAvailable, setIsAvailable] = useState(false);

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
    <View className="p-4">
      <Text className="text-lg font-bold text-white">
        {isAvailable || Platform.OS === 'ios' ? `Steps: ${steps}` : 'Step counter not available'}
      </Text>
    </View>
  );
}
