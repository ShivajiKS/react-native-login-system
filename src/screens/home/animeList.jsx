import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
const AnimeList = ({ animes }) => {
    const navigation = useNavigation()
    return (
        <View className="h-[89vh]">
            <FlatList
                data={animes}
                renderItem={({ item }) => (
                    <TouchableOpacity className="mx-1.5 my-1.5 w-[180px] h-64 " onPress={() => navigation.navigate("AnimeInfo", item)}>
                        <Image source={{ uri: item?.images?.jpg?.large_image_url }} className="w-full h-56 " />
                        <Text className="text-center my-1 text-base font-semibold " numberOfLines={1}>{item.title}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={item => item.mal_id}
                numColumns={2}

            />
        </View>
    )
}
export default AnimeList

