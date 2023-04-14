import { View, Text, TouchableOpacity, ToastAndroid, Alert } from 'react-native'
import React from 'react'
import { useSignOut } from 'react-firebase-hooks/auth';
import { auth } from '../../../configurations/firebase-config'
const LogOut = () => {
    const [signOut, loading, error] = useSignOut(auth);
    const onSignOut = async () => {
        const success = await signOut();
        if (success) {
            ToastAndroid.show('LogOut Successfully!', ToastAndroid.CENTER, ToastAndroid.CENTER);
        }
        if (loading) {
            return <Text>Please Wait...</Text>;
        }
        if (error) {
            Alert.alert('Error', error.message)
        }
    }
    return (
        <View className='w-[94vw] mx-3 mt-5'>
            <TouchableOpacity className='' onPress={() => onSignOut()}>
                <Text className=" text-2xl text-center p-3 font-bold ">Logout</Text>
            </TouchableOpacity>
        </View>
    )
}

export default LogOut