import { FlashList } from '@shopify/flash-list';
import { SafeAreaView, View, Text, ScrollView } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

import exerciseVideos from '../../assets/data/exerciseVideos.json';

export default function Videos() {
  return (
    <View className="flex-1 bg-gray-900">
      <SafeAreaView className="flex-1">
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="border-b-hairline border-gray-300 p-6">
            <Text className="text-2xl font-bold text-green-500">Exercise Videos</Text>
          </View>
          <View className="m-2 p-2">
            <FlashList
              data={exerciseVideos}
              estimatedItemSize={20}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View className="border-b-hairline gap-2 border-gray-300 p-2">
                  <Text className="text-lg font-semibold text-white">{item.title}</Text>
                  <Text className="text-md text-gray-300">{item.channel}</Text>
                  <YoutubePlayer play={false} height={300} videoId={item.videoId} />
                </View>
              )}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
