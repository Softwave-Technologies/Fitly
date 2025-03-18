import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';

export default function BMIScreen() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | ''>('');
  const [bmi, setBMI] = useState<number | null>(null);
  const [bodyFat, setBodyFat] = useState<number | null>(null);
  const [bmr, setBMR] = useState<number | null>(null);
  const [lbm, setLBM] = useState<number | null>(null);
  const [category, setCategory] = useState('');

  const calculateMetrics = () => {
    if (!weight || !height || !age || !gender) return;

    const heightInMeters = parseFloat(height) / 100;
    const weightKg = parseFloat(weight);
    const ageYears = parseInt(age, 10);

    // BMI Calculation
    const bmiValue = weightKg / (heightInMeters * heightInMeters);
    setBMI(Number(bmiValue.toFixed(1)));

    // BMI Category
    if (bmiValue < 18.5) setCategory('Underweight');
    else if (bmiValue < 24.9) setCategory('Normal weight');
    else if (bmiValue < 29.9) setCategory('Overweight');
    else setCategory('Obese');

    // Body Fat % (Using BMI Method)
    const bodyFatValue =
      gender === 'male'
        ? 1.2 * bmiValue + 0.23 * ageYears - 16.2
        : 1.2 * bmiValue + 0.23 * ageYears - 5.4;
    setBodyFat(Number(bodyFatValue.toFixed(1)));

    // Basal Metabolic Rate (BMR) using Mifflin-St Jeor Equation
    const bmrValue =
      gender === 'male'
        ? 88.36 + 13.4 * weightKg + 4.8 * parseFloat(height) - 5.7 * ageYears
        : 447.6 + 9.2 * weightKg + 3.1 * parseFloat(height) - 4.3 * ageYears;
    setBMR(Number(bmrValue.toFixed(1)));

    // Lean Body Mass (LBM)
    const lbmValue = weightKg * (1 - bodyFatValue / 100);
    setLBM(Number(lbmValue.toFixed(1)));
  };

  return (
    <View className="flex-1 bg-gray-900">
      <SafeAreaView className="flex-1">
        <View className="border-b-hairline border-gray-300 p-6">
          <Text className="text-2xl font-bold text-green-500">Health Metrics</Text>
        </View>
        <ScrollView contentContainerStyle={{ paddingBottom: 40 }} className="p-6">
          {/* Inputs */}
          <View className="mb-4">
            <TextInput
              className="rounded-xl bg-white/10 p-4 text-lg text-white"
              placeholder="Enter weight (kg)"
              placeholderTextColor="gray"
              keyboardType="numeric"
              value={weight}
              onChangeText={setWeight}
            />
          </View>

          <View className="mb-4">
            <TextInput
              className="rounded-xl bg-white/10 p-4 text-lg text-white"
              placeholder="Enter height (cm)"
              placeholderTextColor="gray"
              keyboardType="numeric"
              value={height}
              onChangeText={setHeight}
            />
          </View>

          <View className="mb-4">
            <TextInput
              className="rounded-xl bg-white/10 p-4 text-lg text-white"
              placeholder="Enter age"
              placeholderTextColor="gray"
              keyboardType="numeric"
              value={age}
              onChangeText={setAge}
            />
          </View>

          <View className="flex-row gap-4">
            <TouchableOpacity
              className={`flex-1 rounded-xl py-4 ${gender === 'male' ? 'bg-green-500' : 'bg-white/10'}`}
              onPress={() => setGender('male')}>
              <Text className="text-center text-lg text-white">Male</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className={`flex-1 rounded-xl py-4 ${gender === 'female' ? 'bg-green-500' : 'bg-white/10'}`}
              onPress={() => setGender('female')}>
              <Text className="text-center text-lg text-white">Female</Text>
            </TouchableOpacity>
          </View>

          {/* Calculate Button */}
          <TouchableOpacity
            className="mt-6 w-full rounded-full bg-green-500 py-4 shadow-md"
            onPress={calculateMetrics}>
            <Text className="text-center text-lg font-bold text-black">Calculate</Text>
          </TouchableOpacity>

          {/* Results */}
          {bmi && (
            <View className="mt-6 rounded-2xl bg-white/10 p-6">
              <Text className="text-center text-xl text-white">Your BMI: {bmi}</Text>
              <Text className="mt-2 text-center text-lg text-green-400">Category: {category}</Text>
              <View className="my-4 border-b border-gray-700" />
              <Text className="text-center text-lg text-white">Body Fat %: {bodyFat}%</Text>
              <Text className="text-center text-lg text-white">BMR: {bmr} kcal/day</Text>
              <Text className="text-center text-lg text-white">Lean Body Mass: {lbm} kg</Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
