import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, Pressable, Alert, ActivityIndicator } from 'react-native';
import { ProgressBar } from 'react-native-paper';

type Meal = {
  id: number;
  name: string;
  calories: number;
  category: string;
};

export default function NutritionTrack() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [goal, setGoal] = useState<number>(2000);
  const [loading, setLoading] = useState(false);
  const [mealName, setMealName] = useState<string>('');
  const [mealCalories, setMealCalories] = useState<number>(0);
  const [mealCategory, setMealCategory] = useState<string>('Breakfast');
  const [totalCalories, setTotalCalories] = useState<number>(0);

  useEffect(() => {
    loadNutritionData();
    checkForDailyReset();
  }, []);

  useEffect(() => {
    setTotalCalories(meals.reduce((sum, meal) => sum + meal.calories, 0));
  }, [meals]);

  const loadNutritionData = async () => {
    setLoading(true);
    try {
      const storedMeals = await AsyncStorage.getItem('meals');
      const storedGoal = await AsyncStorage.getItem('calorieGoal');
      if (storedMeals) {
        setMeals(JSON.parse(storedMeals));
      }
      if (storedGoal) {
        setGoal(JSON.parse(storedGoal));
      }
    } catch (error) {
      console.error('Error while loading nutrition data ', error);
    } finally {
      setLoading(false);
    }
  };

  const saveMeal = async () => {
    if (!mealName || !mealCalories) return;
    const newMeal: Meal = {
      id: Date.now(),
      name: mealName,
      calories: mealCalories,
      category: mealCategory,
    };
    const updatedMeals = [...meals, newMeal];
    setMeals(updatedMeals);
    setTotalCalories((prevCalories) => prevCalories + newMeal.calories);
    await AsyncStorage.setItem('meals', JSON.stringify(updatedMeals));
  };

  const deleteMeal = async (id: number) => {
    const updatedMeals = meals.filter((meal) => meal.id !== id);
    const deletedMeal = meals.find((meal) => meal.id === id);
    if (deletedMeal) {
      setTotalCalories((prevCalories) => prevCalories - deletedMeal.calories);
    }
    setMeals(updatedMeals);
    await AsyncStorage.setItem('meals', JSON.stringify(updatedMeals));
  };

  const checkForDailyReset = async () => {
    const lastReset = await AsyncStorage.getItem('lastReset');
    const today = new Date().toDateString();
    if (lastReset !== today) {
      await AsyncStorage.setItem('meals', JSON.stringify([]));
      await AsyncStorage.setItem('lastReset', today);
      setMeals([]);
      setTotalCalories(0);
    }
  };

  const onSetGoal = async () => {
    Alert.prompt('Set Daily Goal', 'Enter your daily calorie goal', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Set',
        onPress: async (goal) => {
          if (goal) {
            setGoal(parseInt(goal, 10));
            await AsyncStorage.setItem('calorieGoal', JSON.stringify(goal));
          }
        },
      },
    ]);
  };

  if (loading) return <ActivityIndicator size="large" />;

  return (
    <View className="flex-1 p-2">
      <View className="flex-row items-center">
        <Text className="px-4 text-xl text-white">
          Daily Kcal Goal: {totalCalories} / {goal} kcal
        </Text>
        <View className="flex-row gap-4">
          <Pressable onPress={onSetGoal}>
            <Text className="rounded bg-green-600/40 p-2 text-white">Change</Text>
          </Pressable>
        </View>
      </View>
      <ProgressBar progress={totalCalories / goal} color="green" className="my-2 h-10 p-4" />
      <View className="border-hairline m-2 gap-2 rounded-lg border-gray-600 p-2">
        <View className="border-b-hairline flex-row items-center justify-between border-gray-200">
          <Text className="text-lg font-semibold text-white">Meal Name: </Text>
          <TextInput value={mealName} onChangeText={setMealName} className="p-2" />
        </View>
        <View className="border-b-hairline flex-row items-center justify-between border-gray-200">
          <Text className="text-lg font-semibold text-white">Calories: </Text>
          <TextInput
            value={mealCalories.toString()}
            onChangeText={(text) => setMealCalories(parseInt(text, 10))}
            className="p-2 text-white"
          />
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="text-lg font-semibold text-white">Category: </Text>
          {/* Category selector */}
          <Picker
            selectedValue={mealCategory}
            onValueChange={(value) => setMealCategory(value)}
            style={{ color: 'white' }}>
            {['Breakfast', 'Lunch', 'Dinner', 'Snack'].map((category) => (
              <Picker.Item key={category} label={category} value={category} />
            ))}
          </Picker>
        </View>
      </View>
      <FlatList
        scrollEnabled={false}
        data={meals}
        renderItem={({ item }) => (
          <View className="flex-row justify-between p-2">
            <Text className="text-lg text-white">{item.name}</Text>
            <Text className="text-lg text-white">{item.calories}</Text>
            <Text className="text-lg-text-white">{item.category}</Text>
          </View>
        )}
      />
    </View>
  );
}
