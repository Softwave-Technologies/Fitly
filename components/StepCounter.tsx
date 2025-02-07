import { Pedometer } from 'expo-sensors';
import { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

export default function StepCounter() {
  const [isAvailable, setIsAvailable] = useState(false);
  const [steps, setSteps] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    Pedometer.isAvailableAsync().then(setIsAvailable);

    const subscription = Pedometer.watchStepCount((result) => {
      setSteps(result.steps);
      if (result.steps >= 10000) {
        setIsCompleted(true);
      }
    });
    return () => subscription.remove();
  }, []);

  return (
    <View className="border-hairline items-center border-gray-300 p-4">
      <Text className="pb-4 text-2xl font-bold text-white">STEPS</Text>
      <Text className="text-xl font-bold text-white">{steps} / 10000</Text>
      {isCompleted && <Text className="text-green-500">Goal Reached!</Text>}
    </View>
  );
}
