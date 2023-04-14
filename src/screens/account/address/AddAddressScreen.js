import React, { useEffect, useState } from 'react'
import { Formik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import { addressSchema, initialValues } from "../../../validationYupSchemas/addressYupSchema"
import { collection, getDoc, doc, updateDoc } from "firebase/firestore";
import { auth, db } from '../../../configurations/firebase-config';

import { useIsFocused } from '@react-navigation/native';
import {
    View,
    Text,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Alert,
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';

export const AddAddressScreen = (props) => {
    const isFocused = useIsFocused();
    const { title } = props.route.params;
    const [addressList, setAddressList] = useState()
    const navigation = useNavigation()
    const userColRef = collection(db, "users")
    const docRef = doc(userColRef, auth.currentUser.uid)
    useEffect(() => {
        const getAddress = async () => {
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }
        getAddress();
    }, [isFocused])

    const saveAddressOnFirestore = async (addressProp) => {
        const addressId = Date.now()
        const { address, name, district, locality, phoneNumber, pincode, state, } = addressProp;
        const tempAddress = []
        tempAddress.push({ address, name, district, locality, phoneNumber, pincode, state, addressId })
        await updateDoc(docRef, {
            address: tempAddress
        }
        ).then(() => {
            Alert.alert("Billing Address Added successfully")
            navigation.goBack()
        })
    }

    return (
        <>
            <SafeAreaView className='flex-1 bg-slate-100'>
                <ScrollView className='  h-screen w-screen '>
                    <Text className='text-xl font-semibold capitalize text-black text-center mb-1 mt-3'>{title == "edit" ? "EDIT ADDRESS" : "ADD NEW ADDRESS"}</Text>
                    <Formik initialValues={initialValues} validationSchema={addressSchema} onSubmit={(values) => { saveAddressOnFirestore(values) }}>
                        {({ values, errors, isValid, touched, setFieldTouched, handleBlur, handleChange, handleSubmit }) => (
                            <>
                                {/*======================== Input Name Field=====================*/}
                                <View className='w-screen bg-slate-100 h-screen m-2 shadow-inner'>
                                    <TextInput
                                        placeholder='Name *'
                                        className={`border-b-2 bg-slate-100 w-[90vw] h-10 ml-2  mt-4 text-base ${!errors.name ? "border-green-400" : "border-slate-300"}`}
                                        value={values.name}
                                        onChangeText={handleChange('name')}
                                        onBlur={handleBlur('name')}
                                    />

                                    <TextInput
                                        placeholder='Mobile *'
                                        className={`border-b-2 bg-slate-100 w-[90vw] h-10 ml-2  mt-4 text-base ${!errors.phoneNumber ? "border-green-400" : "border-slate-300"}`}
                                        value={values.phoneNumber}
                                        onChangeText={handleChange('phoneNumber')}
                                        onBlur={handleBlur('phoneNumber')}
                                    />
                                    <View className="flex-row ">
                                        <TextInput
                                            placeholder='State'
                                            className={`border-b-2 bg-slate-100  w-[45vw] h-10 ml-2  mt-4 text-base ${!errors.state ? "border-green-400" : "border-slate-300"}`}
                                            value={values.state}
                                            onChangeText={handleChange('state')}
                                            onBlur={handleBlur('state')}
                                        />
                                        <TextInput
                                            placeholder='Pincode *'
                                            className={`border-b-2 bg-slate-100 w-[43vw] h-10 ml-2  mt-4 text-base ${!errors.pincode ? "border-green-400" : "border-slate-300"}`}
                                            value={values.pincode}
                                            onChangeText={handleChange('pincode')}
                                            onBlur={handleBlur('pincode')}
                                        />
                                    </View>
                                    <TextInput
                                        placeholder='Address (House No, Bulding,Area) *'
                                        className={`border-b-2 bg-slate-100 w-[90vw] h-10 ml-2  mt-4 text-base ${!errors.address ? "border-green-400" : "border-slate-300"}`}
                                        value={values.address}
                                        onChangeText={handleChange('address')}
                                        onBlur={handleBlur('address')}
                                    />
                                    <TextInput
                                        placeholder='Locality/Town *'
                                        className={`border-b-2 bg-slate-100 w-[90vw] h-10 ml-2  mt-4 text-base ${!errors.locality ? "border-green-400" : "border-slate-300"}`}
                                        value={values.locality}
                                        onChangeText={handleChange('locality')}
                                        onBlur={handleBlur('locality')}
                                    />
                                    <TextInput
                                        placeholder='District/City *'
                                        className={`border-b-2 bg-slate-100 w-[90vw] h-10 ml-2  mt-4 text-base ${!errors.district ? "border-green-400" : "border-slate-300"}`}
                                        value={values.district}
                                        onChangeText={handleChange('district')}
                                        onBlur={handleBlur('district')}
                                    />
                                    <View className='flex-row mt-5   '>
                                        <TouchableOpacity className='bg-gray-400 w-[45vw] h-10 ml-2  mt-4 ' onPress={() => navigation.goBack()} >
                                            <Text className='uppercase text-base text-white font-bold text-center p-2  ' >Cancle</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity className='bg-orange-400   w-[45vw] h-10 ml-2  mt-4 ' onPress={handleSubmit}>
                                            <Text className='uppercase text-base text-white font-bold text-center p-2' >Save</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </>
                        )}
                    </Formik>
                </ScrollView>
            </SafeAreaView>
        </>

    )
}