import { useState } from 'react';
import { View, Text } from 'react-native';

import CircularProgress from './ProgressCircle';

export default function MainNutritionTrack() {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  return (
    <View>
      <CircularProgress progress={progress} />
      <Text>Hello</Text>
    </View>
  );
}
