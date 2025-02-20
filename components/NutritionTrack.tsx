import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
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

  return (
    <View className="flex-1 p-4">
      <View className="flex-row items-center">
        <Text className="px-4 text-xl text-white">
          Daily Calorie Goal: {totalCalories} / {goal} kcal
        </Text>
      </View>
      <ProgressBar progress={totalCalories / goal} color="green" className="my-2 h-10 p-4" />
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
