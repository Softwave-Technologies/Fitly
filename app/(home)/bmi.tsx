import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import Animated, { useSharedValue, withTiming } from 'react-native-reanimated';
import Svg, { Path, Line } from 'react-native-svg';

export default function BMIScreen() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBMI] = useState<number | null>(null);
  const [category, setCategory] = useState('');
  const needleAngle = useSharedValue(0); // Needle starting position

  const calculateBMI = () => {
    if (!weight || !height) return;

    const heightInMeters = parseFloat(height) / 100;
    const bmiValue = parseFloat(weight) / (heightInMeters * heightInMeters);
    setBMI(Number(bmiValue.toFixed(1)));

    // Determine category and animate needle position
    let angle = -90; // Starting from left (-90°)
    if (bmiValue < 18.5) {
      setCategory('Underweight');
      angle = -60;
    } else if (bmiValue < 24.9) {
      setCategory('Normal weight');
      angle = 0;
    } else if (bmiValue < 29.9) {
      setCategory('Overweight');
      angle = 60;
    } else {
      setCategory('Obese');
      angle = 90;
    }

    needleAngle.value = withTiming(angle, { duration: 500 }); // Animate needle movement
  };

  return (
    <View className="flex-1  bg-gray-900">
      <SafeAreaView className="flex-1">
        <View className="border-b-hairline border-gray-300 p-6">
          <Text className="text-2xl font-bold text-green-500">BMI Calculator</Text>
        </View>
        <View className="flex-1 items-center justify-center gap-2 p-6">
          {/* Semi-Circular Gauge */}
          <Svg width={200} height={120} viewBox="0 0 200 100">
            {/* Gauge Arc */}
            <Path d="M10,100 A90,90 0 0,1 190,100" stroke="white" strokeWidth="10" fill="none" />
            {/* Needle */}
            <Animated.View
              style={{
                position: 'absolute',
                top: 35,
                left: 85,
                transform: [{ rotate: `${needleAngle.value}deg` }],
              }}>
              <Svg width={30} height={30}>
                <Line x1="15" y1="0" x2="15" y2="30" stroke="red" strokeWidth="3" />
              </Svg>
            </Animated.View>
          </Svg>

          {/* Input Fields */}
          <View className="mb-4 w-full rounded-2xl bg-white/10 p-4 shadow-lg">
            <TextInput
              className="p-2 text-lg text-white"
              placeholder="Enter weight (kg)"
              placeholderTextColor="gray"
              keyboardType="numeric"
              value={weight}
              onChangeText={setWeight}
            />
          </View>

          <View className="mb-4 w-full rounded-2xl bg-white/10 p-4 shadow-lg">
            <TextInput
              className="p-2 text-lg text-white"
              placeholder="Enter height (cm)"
              placeholderTextColor="gray"
              keyboardType="numeric"
              value={height}
              onChangeText={setHeight}
            />
          </View>

          <TouchableOpacity
            className="w-full rounded-full bg-green-500 py-3 shadow-md"
            onPress={calculateBMI}>
            <Text className="text-center text-lg font-bold text-black">Calculate BMI</Text>
          </TouchableOpacity>

          {bmi && (
            <View className="mt-6 w-full rounded-2xl bg-white/10 p-4">
              <Text className="text-center text-xl text-white">Your BMI: {bmi}</Text>
              <Text className="mt-2 text-center text-lg text-green-400">Category: {category}</Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
}
