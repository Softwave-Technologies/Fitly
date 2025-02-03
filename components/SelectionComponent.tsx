import { Pressable, Text } from 'react-native';

export default function SelectionComponent({
  title,
  isSelected,
  onSelect,
}: {
  title: string;
  isSelected: boolean;
  onSelect: (title: string) => void;
}) {
  return (
    <Pressable
      onPress={() => onSelect(title)}
      className={`rounded-xl border-2 p-2 ${isSelected ? 'border-green-500' : 'border-gray-500'}`}>
      <Text className={`text-lg font-semibold ${isSelected ? 'text-white' : 'text-green-500'}`}>
        {title}
      </Text>
    </Pressable>
  );
}
