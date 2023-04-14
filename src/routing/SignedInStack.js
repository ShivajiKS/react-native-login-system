import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ProfileStack, HomeStack } from './stacks'

import { getFocusedRouteNameFromRoute } from '@react-navigation/native';


const Tab = createBottomTabNavigator();
const SignedInStack = () => {

    return (
        <Tab.Navigator initialRouteName="Home"
            screenOptions={({ route }) => (
                {
                    headerShown: false,
                    // tabBarShowLabel: false,
                    tabBarActiveTintColor: '#e91e63',
                    tabBarInactiveTintColor: 'gray',
                    tabBarStyle: {
                        display: getRouteName(route),
                        height: 60,
                        padding: 10,
                        backgroundColor: "white",
                        paddingBottom: 0,
                    },
                    tabBarItemStyle: {
                        display: "flex",
                        bottom: 10,
                        alignContent: "center",
                        justifyContent: "center"
                    },
                    tabBarLabelStyle: {
                        fontSize: 13,
                    },
                }
            )}
        >
            <Tab.Screen name="HomeStack" component={HomeStack} options={{
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="home" color={color} size={size + 5} />
                ),
                title: "home"
            }} />
            <Tab.Screen name="account" component={ProfileStack} options={{
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="account-circle" color={color} size={size + 5} />
                ),
            }} />
        </Tab.Navigator>
    )
}



const getRouteName = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName?.includes("AddAddress") || routeName?.includes("DefaultAddress") || routeName?.includes("EditProfilePicture") || routeName?.includes("AnimeInfo") || routeName?.includes("ChangePassword") || routeName?.includes("UpdateEmail") || routeName?.includes("Delete")) {
        return "none"
    }
    return "flex"
}

export default SignedInStack;
//
