import { Pressable, Text } from 'react-native';

export default function SelectionComponent({ title }: { title: string }) {
  return (
    <Pressable className="border-hairline rounded-xl border-gray-300 p-2">
      <Text className="text-lg font-semibold text-green-500">{title}</Text>
    </Pressable>
  );
}
