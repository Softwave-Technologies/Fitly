import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { View, Text, FlatList, Pressable, Alert, ActivityIndicator, TextInput } from 'react-native';
import { ProgressBar } from 'react-native-paper';

import { Button } from './Button';

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
  const [mealCategory, setMealCategory] = useState<string>('');
  const [totalCalories, setTotalCalories] = useState<number>(0);

  const categories = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

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
      <View className="flex-row items-center justify-center">
        <Text className="px-4 text-xl text-white">
          Daily Kcal Goal: {totalCalories} / {goal} kcal
        </Text>
        <Pressable onPress={onSetGoal}>
          <Text className="rounded bg-green-600/40 p-2 text-white">Change</Text>
        </Pressable>
      </View>
      <ProgressBar
        progress={Math.min(totalCalories / goal, 1)}
        color="green"
        className="w-11/12 self-center px-2 py-4"
      />
      {/* Meal log */}
      <View className="m-2 gap-4 bg-gray-600 p-6">
        <View className=" flex-row gap-3  ">
          <View className="w-32">
            <Text className="font-semibold text-white">Meal Name: </Text>
          </View>
          <TextInput
            placeholderTextColor="white"
            value={mealName}
            onChangeText={setMealName}
            placeholder="e.g. Apple..."
            className="border-b-hairline flex-1 border-gray-300 text-white"
          />
        </View>
        <View className="flex-row gap-3">
          <View className="w-32">
            <Text className="font-semibold text-white">Meal Calories: </Text>
          </View>
          <TextInput
            placeholder="Enter calories..."
            placeholderTextColor="white"
            className="border-b-hairline flex-1 border-gray-300 text-white"
            value={mealCalories ? mealCalories.toString() : ''}
            onChangeText={(text) => {
              const parsed = parseInt(text, 10);
              setMealCalories(isNaN(parsed) ? 0 : parsed);
            }}
            keyboardType="numeric"
          />
        </View>
        <View className="flex-row items-center gap-3 ">
          <View className="w-32">
            <Text className="font-semibold text-white">Meal Category: </Text>
          </View>
          {categories.map((category) => (
            <Pressable
              className={`border-hairline rounded-lg ${mealCategory === category ? 'border-green-500' : 'border-white'} p-1`}
              key={category}
              onPress={() => setMealCategory(category)}>
              <Text
                className={`font-semibold ${mealCategory === category ? 'text-green-500' : 'text-white'}`}>
                {category}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
      <Button
        onPress={saveMeal}
        title="Add Meal"
        className="m-6 "
        style={{ backgroundColor: 'green' }}
      />

      {/* Meal display */}
      <Text className="px-4 text-xl font-bold text-green-500">Meals</Text>
      <FlatList
        scrollEnabled={false}
        data={meals}
        renderItem={({ item }) => (
          <View className="border-b-hairline flex-row items-center justify-between border-gray-300 p-4">
            <Text className="w-32 text-lg text-white">{item.name}</Text>
            <Text className="w-20 text-center text-lg text-white">{item.calories}</Text>
            <Text className="w-24 text-lg text-white">{item.category}</Text>
            <FontAwesome name="close" size={20} color="red" onPress={() => deleteMeal(item.id)} />
          </View>
        )}
      />
    </View>
  );
}
