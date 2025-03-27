import { FontAwesome, FontAwesome5, FontAwesome6, Ionicons } from '@expo/vector-icons';
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
        tabBarStyle: {
          backgroundColor: 'black',
          paddingTop: 10,
          position: 'absolute',
          marginHorizontal: 20,
          borderRadius: 30,
          height: 70,
          bottom: 30,
          borderColor: 'black',
        },
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
                shadowColor: '#fff',
                shadowOffset: { width: 0.5, height: 0.5 },
                shadowOpacity: 0.3,
                shadowRadius: 5,
                width: 70,
                height: 70,
                borderRadius: 35,
                alignSelf: 'center',
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
          tabBarIcon: ({ color }) => <FontAwesome5 name="weight" size={25} color={color} />,
        }}
      />
    </Tabs>
  );
}
