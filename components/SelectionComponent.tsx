import { useState } from 'react';
import { Pressable, Text } from 'react-native';

export default function SelectionComponent({ title, onSelect }: { title: string; onSelect: any }) {
  const [selected, setSelected] = useState(false);

  const handleSelection = () => {
    setSelected(true);
    onSelect(title);
  };
  return (
    <Pressable onPress={handleSelection} className="border-hairline rounded-xl border-gray-300 p-2">
      <Text className="text-lg font-semibold text-green-500">{title}</Text>
    </Pressable>
  );
}
