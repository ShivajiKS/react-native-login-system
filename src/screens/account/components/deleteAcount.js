import { View, Text, TouchableOpacity, ToastAndroid, Alert } from 'react-native'
import React from 'react'
import { useDeleteUser } from 'react-firebase-hooks/auth';
import { auth } from '../../../configurations/firebase-config'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const DeleteAcount = () => {
    const [deleteUser, loading, error] = useDeleteUser(auth);
    const navigation = useNavigation();
    const onDeleteAccount = async () => {
        const success = await deleteUser();
        if (success) {
            ToastAndroid.show('Your Account have been deleted!', ToastAndroid.CENTER, ToastAndroid.CENTER);
        }
        if (loading) {
            return <Text className="font-semibold text-center text-lg">Deleting..</Text>;
        }
        if (error) {
            Alert.alert('Error', error.message)
        }
    }
    return (
        <View>
            <TouchableOpacity onPress={() => {
                Alert.alert(
                    'Hey There!',
                    'Are you sure you want to delete this account?',
                    [
                        { text: 'Cancle', onPress: () => "" },
                        { text: 'Yes', onPress: () => onDeleteAccount() },
                    ],
                );
            }}
                className="justify-between items-center">
                <Text className="font-bold capitalize text-2xl mt-20 text-red-600">delete</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row m-auto mt-10 opacity-50" onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back-outline" color={"black"} size={25} />
                <Text className="text-base font-bold ">Go Back</Text>
            </TouchableOpacity>

        </View>
    )
}

export default DeleteAcount