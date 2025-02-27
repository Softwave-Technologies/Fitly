import { Link } from 'expo-router';
import { Pressable, Text } from 'react-native';

import { Workout } from '~/types/types';

export default function WorkoutListItem({ item }: { item: Workout }) {
  return (
    <Link asChild href={`/${item.id}`}>
      <Pressable className="m-2 rounded-lg bg-gray-200 p-4">
        <Text className="text-lg font-semibold">{item.name}</Text>
        {item.exercises.map((exercise: any, index: number) => (
          <Text key={exercise.name}>
            {exercise.name} - {exercise.sets}
          </Text>
        ))}
      </Pressable>
    </Link>
  );
}
