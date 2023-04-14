import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const ListOfFields = [
    {
        title: "update email",
        id: "1",
        path: "UpdateEmail"
    },
    {
        title: "Change password",
        id: "2",
        path: "ChangePassword"
    },
    {
        title: "Delete account",
        id: "3",
        path: "Delete"
    },
]

const AccountUpdate = () => {
    const navigation = useNavigation();
    return (
        <View className="mt-16  w-full h-full">
            {
                ListOfFields && ListOfFields.map(item => (
                    <TouchableOpacity className="border-b-[1px] border-gray-200 p-3 ml-5 my-2 w-[90vw] flex-row justify-between items-center" key={item.id} onPress={() => navigation.navigate(item.path)} >
                        <Text className="capitalize text-lg font-semibold ">{item.title}</Text>
                        <MaterialCommunityIcons name="chevron-right" color={"black"} size={20} />
                    </TouchableOpacity>
                ))
            }
        </View>

    )
}

export default AccountUpdate