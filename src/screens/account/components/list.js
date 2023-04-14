import { View, Text, FlatList, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
const ListOfFields = () => {
  const navigation = useNavigation();
  return (
    <View className='w-[96vw] mx-3 mt-5' >
      <TouchableOpacity className='border-b-[1px] border-gray-200 p-3 ml-5 my-2 w-[85vw] flex flex-row justify-between items-center' onPress={() => navigation.navigate("Address")}>
        <Text className='text-xl  font-semibold ' >address</Text>
        <MaterialCommunityIcons name="chevron-right" color={"black"} size={20} />
      </TouchableOpacity>

      <TouchableOpacity className='border-b-[1px] border-gray-200 p-3 ml-5 my-2 w-[85vw] flex flex-row justify-between items-center' onPress={() => navigation.navigate("AccountUpdate")}>
        <Text className='text-xl  font-semibold ' >account</Text>
        <MaterialCommunityIcons name="chevron-right" color={"black"} size={20} />
      </TouchableOpacity>

      <TouchableOpacity className='border-b-[1px] border-gray-200 p-3 ml-5 my-2 w-[85vw] flex flex-row justify-between items-center' >
        <Text className='text-xl  font-semibold ' >about</Text>
        <MaterialCommunityIcons name="chevron-right" color={"black"} size={20} />
      </TouchableOpacity>
    </View>
  )
}

export default ListOfFields

