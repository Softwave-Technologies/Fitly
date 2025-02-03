import { View, Text } from 'react-native';

import SelectionComponent from './SelectionComponent';

export default function SelectionComponentList({
  setDuration,
  setFocus,
  setLevel,
}: {
  setDuration: any;
  setLevel: any;
  setFocus: any;
}) {
  return (
    <View>
      <View className="border-b-hairline flex-row items-center justify-evenly border-gray-500 py-5">
        <Text className="border-r-hairline border-gray-200 p-2 text-lg font-semibold text-white">
          Focus
        </Text>
        <SelectionComponent title="Legs" onSelect={setFocus} />
        <SelectionComponent title="Arms" onSelect={setFocus} />
        <SelectionComponent title="Chest" onSelect={setFocus} />
        <SelectionComponent title="Full Body" onSelect={setFocus} />
      </View>
      <View className="border-b-hairline flex-row justify-around border-gray-500 p-4">
        <Text className="border-r-hairline border-gray-200 p-2 text-lg font-semibold text-white">
          Level
        </Text>
        <SelectionComponent title="Beginner" onSelect={setLevel} />
        <SelectionComponent title="Intermediate" onSelect={setLevel} />
        <SelectionComponent title="Advanced" onSelect={setLevel} />
      </View>
      <View className="border-b-hairline flex-row justify-around border-gray-500 p-4">
        <Text className="border-r-hairline border-gray-200 p-2 text-lg font-semibold text-white">
          Duration
        </Text>
        <SelectionComponent title="30-45min" onSelect={setDuration} />
        <SelectionComponent title="45-60min" onSelect={setDuration} />
        <SelectionComponent title="60-75min" onSelect={setDuration} />
      </View>
    </View>
  );
}
