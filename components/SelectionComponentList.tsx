import { View } from 'react-native';

import SelectionComponent from './SelectionComponent';

export default function SelectionComponentList() {
  return (
    <View>
      <View className="border-b-hairline flex-row justify-evenly border-gray-500 py-5">
        <SelectionComponent title="Legs" />
        <SelectionComponent title="Arms" />
        <SelectionComponent title="Chest" />
        <SelectionComponent title="Full Body" />
      </View>
      <View className="flex-row justify-around p-4">
        <SelectionComponent title="Beginner" />
        <SelectionComponent title="Intermediate" />
        <SelectionComponent title="Advanced" />
      </View>
    </View>
  );
}
