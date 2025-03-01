import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const CircularProgress = ({ progress, goal }: { progress: number; goal: number }) => {
  const radius = 50;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference - (progress / goal) * circumference;

  return (
    <View className="items-center justify-center">
      <Svg height="240" width="240" viewBox="0 0 120 120">
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
          stroke="blue"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={progressOffset}
          strokeLinecap="round"
          rotation="-90"
          origin="60,60"
        />
      </Svg>
      {/* Water Intake Text */}
      <View style={{ position: 'absolute', alignItems: 'center' }}>
        <Text className="text-lg font-bold text-white">Water Intake Today</Text>
        <Text className="text-lg font-bold text-white">
          {progress} / {goal} ml
        </Text>
      </View>
    </View>
  );
};

export default CircularProgress;
