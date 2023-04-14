import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const EditProfilePicture = () => {
  const navigation = useNavigation();
  return (
    <View className='absolute bottom-0 w-full h-1/4 bg-slate-50 flex justify-evenly items-center'>
      <TouchableOpacity className='border-b-[1px] border-gray-200'>
        <Text className=' text-center text-base pb-3 w-screen' onPress={() => navigation.goBack()}>Delete Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity className='border-b-[1px] border-gray-200'>
        <Text className=' text-center  text-base pb-2 w-screen' onPress={() => navigation.goBack()}>Change Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity className='border-b-[1px] border-gray-200' onPress={() => navigation.goBack()}>
        <Text className=' text-center text-base w-screen' >Cancle</Text>
      </TouchableOpacity>
    </View>
  )
}

export default EditProfilePicture