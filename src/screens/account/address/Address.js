import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { auth, db } from '../../../configurations/firebase-config';
export const Address = () => {
    const [addressList, setAddressList] = useState([])
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const userColRef = collection(db, "users")
    const docRef = doc(userColRef, auth.currentUser.uid)
    useEffect(() => {
        let tempAddress = [];
        const unsubscribe = onSnapshot(docRef, (snapShot) => {
            tempAddress = [...snapShot.data().address]
            setAddressList(tempAddress)
        })
        return () => {
            unsubscribe();
        }
    }, [isFocused])
    const onRemoveAddress = async () => {
        await updateDoc(docRef, {
            address: []
        })
    }
    return (
        <>
            <SafeAreaView className='absolute'>
                {
                    addressList.length == 0 ?
                        <TouchableOpacity className="mt-2 h-12  w-screen border-y-2 border-gray-300 border-opacity-0 " onPress={() => navigation.navigate("AddAddress", { title: "add" })}>
                            <View className='p-2 flex-row '>
                                <MaterialIcons name="add" color={"indigo"} size={17} />
                                <Text className='uppercase text-base  text-indigo-700 font-bold ' >add new address</Text>
                            </View>
                        </TouchableOpacity> : null
                }

                <ScrollView accessible showsHorizontalScrollIndicator className="w-full h-full ">
                    {
                        addressList.length > 0 ? <>{
                            addressList.map(
                                ({ address, name, district, locality, phoneNumber, pincode, state, addressId }) => (
                                    <View className="mt-6  bg-slate-50 w-screen h-[35vh] " key={addressId}>
                                        <Text className='mt-3.5 ml-3 text-lg capitalize'>{name}</Text>
                                        <Text className='mt-3.5 ml-3 capitalize'>{address}</Text>
                                        <Text className='mt-1 ml-3 capitalize'>{district}</Text>
                                        <Text className='mt-1 ml-3 capitalize'>{locality}</Text>
                                        <Text className='mt-1 ml-3 capitalize'>{state}</Text>
                                        <Text className='mt-3.5 ml-3 capitalize'>{phoneNumber}</Text>
                                        <View className='mt-5 border-b-2 w-full border-gray-300 border-opacity-0'></View>
                                        <View className='flex flex-row justify-evenly p-4 '>
                                            <TouchableOpacity onPress={() => navigation.navigate("AddAddress", { title: "edit" })} >
                                                <Text className='uppercase text-base text-indigo-700 font-bold  ' >edit</Text>
                                            </TouchableOpacity>
                                            <View className='capitalize border-r-2 border-gray-300 border-opacity-0 h-6' ></View>
                                            <TouchableOpacity onPress={() => onRemoveAddress()}>
                                                <Text className='uppercase text-base text-indigo-700 font-bold' >remove</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )
                            )
                        }</> : <View className=" items-center mt-40 ">
                            <Text className="capitalize text-2xl font-bold">NO ADDRESSES... </Text>
                        </View>
                    }
                </ScrollView>
            </SafeAreaView>
        </>
    )
}
