import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { View, Text, useWindowDimensions } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const CircularProgress = ({
  progress,
  goal,
  label,
  iconName,
  color,
}: {
  progress: number;
  goal: number;
  label: string;
  iconName: string;
  color: string;
}) => {
  const radius = 50;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference - (progress / goal) * circumference;
  const { width } = useWindowDimensions();
  return (
    <View className="flex-1 items-center justify-center">
      <Svg height={width / 3} width={width / 3} viewBox="0 0 120 120">
        {/* Background Circle */}
        <Circle
          cx="60"
          cy="60"
          r={radius}
          stroke="gray"
          strokeWidth={strokeWidth}
          fill="none"
          opacity={0.2}
        />
        {/* Progress Circle */}
        <Circle
          cx="60"
          cy="60"
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={progressOffset}
          strokeLinecap="round"
          rotation="-90"
          origin="60,60"
        />
      </Svg>

      {/* Icon and Label */}
      <View style={{ position: 'absolute', alignItems: 'center', gap: 5 }}>
        <FontAwesome5 name={iconName} size={20} color="white" />
        <Text className="text-md font-bold text-white">{label}</Text>
        <Text className="text-md font-bold text-white">
          {progress} / {goal}
        </Text>
      </View>
    </View>
  );
};

export default CircularProgress;
