import { Pedometer } from 'expo-sensors';
import { useEffect, useState } from 'react';
import { View, Platform, Text } from 'react-native';
import AppleHealthKit, { HealthInputOptions, HealthKitPermissions } from 'react-native-health';

import CircularProgress from './ProgressCircle';

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
    <View>
      <CircularProgress
        progress={progress}
        goal={goal}
        label="Steps"
        iconName="shoe-prints"
        color="red"
      />
      <Text className="text-center text-white">
        {steps} / {goal}
      </Text>
    </View>
  );
}
