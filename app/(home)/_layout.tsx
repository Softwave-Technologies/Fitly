import { FontAwesome, FontAwesome6, Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Pressable } from 'react-native';

export default function HomeLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { backgroundColor: 'black', paddingTop: 10 },
      }}>
      <Tabs.Screen
        name="index"
        options={{ tabBarIcon: ({ color }) => <FontAwesome name="home" size={25} color={color} /> }}
      />
      <Tabs.Screen
        name="tracking"
        options={{ tabBarIcon: ({ color }) => <Ionicons name="water" size={25} color={color} /> }}
      />
      <Tabs.Screen
        name="workout"
        options={{
          tabBarButton: (props) => (
            <Pressable
              {...props}
              style={{
                top: -20,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'darkgreen',
                width: 70,
                height: 70,
                borderRadius: 35,
              }}>
              <FontAwesome6 name="dumbbell" size={30} color="white" />
            </Pressable>
          ),
        }}
      />
      <Tabs.Screen
        name="videos"
        options={{
          tabBarIcon: ({ color }) => <FontAwesome6 name="youtube" size={25} color={color} />,
        }}
      />
      <Tabs.Screen
        name="bmi"
        options={{
          tabBarIcon: ({ color }) => <FontAwesome name="calculator" size={25} color={color} />,
        }}
      />
    </Tabs>
  );
}
