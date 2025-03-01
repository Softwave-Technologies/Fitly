import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

export default function DailyQuote() {
  const [quote, setQuote] = useState({ q: '', a: '' });
  const [loading, setLoading] = useState(true);

  const fetchDailyQuote = async () => {
    try {
      const response = await fetch('https://zenquotes.io/api/today');
      const data = await response.json();
      setQuote(data[0]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDailyQuote();
  }, []);

  if (loading) return <ActivityIndicator size="large" />;

  return (
    <View className="border-hairline m-4 gap-4 rounded-md border-gray-300 px-2 py-2">
      <Text className="text-center text-lg font-semibold text-white">"{quote.q}"</Text>
      <Text className="text-md text-center  text-white">- {quote.a}</Text>
    </View>
  );
}
