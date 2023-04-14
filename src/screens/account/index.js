import { View } from 'react-native'
import React from 'react'
import Profile from './components/Profile'
import ListOfFields from './components/list'
import LogOut from './components/LogOut'

export const Account = () => {
    return (
        <View className='flex-1 mt-12'>
            <Profile />
            <ListOfFields />
            <LogOut />
        </View>
    )
}

