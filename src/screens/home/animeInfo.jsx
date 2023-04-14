import { View, Text, Image, ScrollView } from 'react-native'
import React from 'react'
const AnimeInfo = (props) => {
    const animedeatils = props.route.params;
    console.log("animedeatils", JSON.stringify(props.route.params))
    return (
        <>
            <ScrollView className="mt-4 mx-2 w-[96vw] h-[99vh]" showsVerticalScrollIndicator={false}>
                <View className="flex-row justify-center items-center mt-2 ">
                    <View>
                        <Image source={{ uri: animedeatils?.images?.jpg?.large_image_url }} className="w-36 h-48 rounded-xl " />
                    </View>
                    <View className="mx-4 mt-1">
                        <Text className="text-justif text-lg font-semibold capitalize text-black">information : </Text>
                        <View className="ml-1">
                            <View className="flex-row ">
                                <Text className="text-base font-bold pl-1 pt-1 capitalize ">type : </Text>
                                <Text className=" text-base font-normal pl-1 pt-1 capitalize ">{animedeatils.type} </Text>
                            </View>
                            <View className="flex-row ">
                                <Text className="text-base font-bold pl-1 pt-1 capitalize ">Episodes : </Text>
                                <Text className=" text-base font-normal pl-1 pt-1 capitalize ">{animedeatils.episodes}</Text>
                            </View>
                            <View className="flex-row ">
                                <Text className="text-base font-bold pl-1 pt-1 capitalize ">Duration : </Text>
                                <Text className=" text-base font-normal pl-1 pt-1 capitalize ">{animedeatils.duration}</Text>
                            </View>
                            <View className="flex-row ">
                                <Text className="text-base font-bold pl-1 pt-1 capitalize ">Status : </Text>
                                <Text className=" text-base font-normal pl-1 pt-1 capitalize ">{animedeatils.status}</Text>
                            </View>
                            <View className="flex-row ">
                                <Text className="text-base font-bold pl-1 pt-1 capitalize ">Rating :</Text>
                                <Text className=" text-base font-normal pl-1 pt-1 capitalize ">{animedeatils.score} \10</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View className=" mb-10">
                    <Text className="text-center my-7 mx-5 text-2xl font-extrabold text-black-400 " numberOfLines={1}>{animedeatils.title}</Text>
                    <View className="mx-4 mt-1">
                        <Text className="text-justify text-lg font-semibold capitalize  ">description : </Text>
                        <Text className="text-justify text-sm font-normal pl-1 pt-1 " numberOfLines={12}>{animedeatils.synopsis}</Text>
                    </View>

                </View>
            </ScrollView >
        </>
    )
}

export default AnimeInfo


