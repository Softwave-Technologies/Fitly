import { useState } from 'react';
import { View, Text } from 'react-native';

import SelectionComponent from './SelectionComponent';

export default function SelectionComponentList({
  setFocus,
  setLevel,
  setDuration,
}: {
  setFocus: (value: string) => void;
  setLevel: (value: string) => void;
  setDuration: (value: string) => void;
}) {
  const [selectedFocus, setSelectedFocus] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('');

  const handleSelectFocus = (title: string) => {
    setSelectedFocus(title);
    setFocus(title);
  };

  const handleSelectLevel = (title: string) => {
    setSelectedLevel(title);
    setLevel(title);
  };

  const handleSelectDuration = (title: string) => {
    setSelectedDuration(title);
    setDuration(title);
  };

  return (
    <View>
      {/* Focus Section */}
      <View className="border-b-hairline flex-row items-center justify-between border-gray-500 px-2 py-5">
        <Text className="border-r-hairline border-gray-200 p-2 text-lg font-semibold text-white">
          Focus
        </Text>
        {['Legs', 'Arms', 'Chest', 'Back', 'Full Body'].map((item) => (
          <SelectionComponent
            key={item}
            title={item}
            isSelected={selectedFocus === item}
            onSelect={handleSelectFocus}
          />
        ))}
      </View>

      {/* Level Section */}
      <View className="border-b-hairline flex-row items-center justify-between border-gray-500 px-2 py-5">
        <Text className="border-r-hairline border-gray-200 p-2 text-lg font-semibold text-white">
          Level
        </Text>
        {['Beginner', 'Intermediate', 'Advanced'].map((item) => (
          <SelectionComponent
            key={item}
            title={item}
            isSelected={selectedLevel === item}
            onSelect={handleSelectLevel}
          />
        ))}
      </View>

      {/* Duration Section */}
      <View className="border-b-hairline flex-row items-center justify-between border-gray-500 px-2 py-5">
        <Text className="border-r-hairline border-gray-200 p-2 text-lg font-semibold text-white">
          Duration
        </Text>
        {['30-45min', '45-60min', '60-75min'].map((item) => (
          <SelectionComponent
            key={item}
            title={item}
            isSelected={selectedDuration === item}
            onSelect={handleSelectDuration}
          />
        ))}
      </View>
    </View>
  );
}
