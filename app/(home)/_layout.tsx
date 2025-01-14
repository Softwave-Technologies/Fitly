import { FontAwesome } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function HomeLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: 'grey',
        tabBarStyle: { backgroundColor: 'black' },
      }}>
      <Tabs.Screen
        name="index"
        options={{ tabBarIcon: ({ color }) => <FontAwesome name="home" size={20} color={color} /> }}
      />
      <Tabs.Screen
        name="saved"
        options={{ tabBarIcon: ({ color }) => <FontAwesome name="save" size={20} color={color} /> }}
      />
    </Tabs>
  );
}
