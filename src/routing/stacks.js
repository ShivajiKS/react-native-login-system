import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/authentication/login';
import SignUp from '../screens/authentication/signUp';
import Home from '../screens/home';
import { Account } from '../screens/account';
import { Address } from '../screens/account/address/Address';
import { AddAddressScreen } from '../screens/account/address/AddAddressScreen';
import DeleteAcount from '../screens/account/components/deleteAcount';
import AnimeInfo from '../screens/home/animeInfo';
import ForgotPassword from '../screens/authentication/forgetPassword';
import AccountUpdate from '../screens/account/account';
import ChangePassword from '../screens/account/components/changePassword';
import UpdateEmail from '../screens/account/components/updateEmail';
import EditProfilePicture from '../screens/account/components/editProfile';

const Stack = createNativeStackNavigator();

export const LoginStack = () => {
    return (
        <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false, }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        </Stack.Navigator>
    )
}

export const HomeStack = () => {
    return (
        <Stack.Navigator screenOptions={{ presentation: 'card', headerShown: false }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="AnimeInfo" component={AnimeInfo} options={{ headerShown: true, title: "" }} />
        </Stack.Navigator>
    )
}

export const ProfileStack = () => {
    return (
        <Stack.Navigator initialRouteName='Account' screenOptions={{ headerShown: false, presentation: 'card' }}>
            <Stack.Screen name="Account" component={Account} />
            <Stack.Screen name="Address" component={Address} options={{ headerShown: true, }} />
            <Stack.Screen name="AddAddress" component={AddAddressScreen} options={{ headerShown: true, title: " " }} />
            <Stack.Screen name="Delete" component={DeleteAcount} />
            <Stack.Screen name="AccountUpdate" component={AccountUpdate} />
            <Stack.Screen name="ChangePassword" component={ChangePassword} />
            <Stack.Screen name="UpdateEmail" component={UpdateEmail} />
            <Stack.Screen name="EditProfilePicture" component={EditProfilePicture} />
        </Stack.Navigator>
    )
}

