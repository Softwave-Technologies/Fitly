import { Pressable, Text } from 'react-native';

export default function SelectionComponent(title: string) {
  return (
    <Pressable>
      <Text>{title}</Text>
    </Pressable>
  );
}
