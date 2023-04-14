import { View, Text, KeyboardAvoidingView, TouchableOpacity, Alert } from 'react-native'
import { TextInput, HelperText, Button } from 'react-native-paper';
import React, { useState, useEffect } from 'react'
import { Formik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import { signUpYupSchema, initialValues } from "../../validationYupSchemas/SignUpYupSchema"
import { auth, db } from "../../configurations/firebase-config"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc, } from "firebase/firestore";
const SignUp = () => {
    const [passwordVisible, setPasswordVisible] = useState(true);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(true);
    const [emailExitsErrorMessage, setmailExitsErrorMessage] = useState();
    const [loader, setLoader] = useState(false);
    const navigation = useNavigation();

    // ===================form submission to firebase ==========================
    const onSignUp = async (firstName, lastName, email, password, confirmPassword) => {
        setLoader(true)
        console.log(firstName, lastName, email, password, confirmPassword)
        try {
            await createUserWithEmailAndPassword(auth, email, password)
                .then(async () => {
                    setmailExitsErrorMessage("")
                    const docRef = doc(db, "users", auth.currentUser.uid)
                    await setDoc(docRef, { firstName, lastName, email, address: [], })
                    setLoader(false)
                    auth.signOut()
                })
                .catch(error => {
                    if (error.code === "auth/email-already-in-use")
                        setmailExitsErrorMessage("email already in use, please use another mail")
                })
        } catch (error) {
            console.log(error.message)
        }
    }
    return (
        <View className=" flex-1">
            <View className="justify-center items-center mt-36">
                <Text className="capitalize  text-3xl font-extrabold text-teal-500">Create Account</Text>
                <Text className=" text-base font-normal">Create a new account</Text>
            </View>
            <View className='mt-5 justify-center items-center'>
                <Text className={`emailExitsErrorMessage && text-red-400 text-base font-semibold`}>{emailExitsErrorMessage}</Text>
                <Formik initialValues={initialValues} validationSchema={signUpYupSchema} onSubmit={(values) => onSignUp(values.firstName, values.lastName, values.email, values.password, values.password)}>
                    {({ values, errors, isValid, touched, setFieldTouched, handleBlur, handleChange, handleSubmit }) => (
                        <View className='mt-3'>
                            <View className="flex-row justify-evenly  gap-2">
                                <View className="flex-1">
                                    <TextInput
                                        className={` bg-slate-200  h-12 text-base  rounded-lg `}
                                        mode="outlined"
                                        label="firstName"
                                        placeholder="kondeti"
                                        selectionColor="orange"
                                        value={values.firstName}
                                        onChangeText={handleChange('firstName')}
                                        onBlur={handleBlur('firstName')}
                                    />
                                    {(errors.firstName && touched.firstName) && <HelperText type="error" visible={true} className="text-red-400 text-base font-bold mt-1">{errors.firstName}</HelperText>}
                                </View>
                                <View className="flex-1">
                                    <TextInput
                                        className={`bg-slate-200  h-12 text-base  rounded-lg `}
                                        mode="outlined"
                                        label="lastName"
                                        placeholder="shivaji"
                                        selectionColor="orange"
                                        value={values.lastName}
                                        onChangeText={handleChange('lastName')}
                                        onBlur={handleBlur('lastName')}
                                    />
                                    {(errors.lastName && touched.lastName) && <HelperText type="error" visible={true} className="text-red-400 text-base font-bold mt-1">{errors.lastName}</HelperText>}
                                </View>
                            </View>
                            {/*========================Email Input Field=====================*/}
                            <TextInput
                                className={` bg-slate-200 w-[90vw] h-12 text-base  rounded-lg mt-1 `}
                                mode="outlined"
                                label="Email"
                                placeholder="sivajikondeti37@gmail.com"
                                selectionColor="orange"
                                value={values.email}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                            />
                            {(errors.email && touched.email) && <HelperText type="error" visible={true} className="text-red-400 text-base font-bold mt-1">{errors.email}</HelperText>}
                            {/*========================password Input Field=====================*/}
                            <TextInput
                                className={` bg-slate-200 w-[90vw] h-12 text-base  rounded-lg mt-1`}
                                mode="outlined"
                                label="Password"
                                placeholder="Password"
                                selectionColor="orange"
                                secureTextEntry={passwordVisible}
                                right={<TextInput.Icon icon={passwordVisible ? "eye" : "eye-off"} color="red" onPress={() => setPasswordVisible(!passwordVisible)} />}
                                value={values.password}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                            />
                            {(errors.password && touched.password) && <HelperText type="error" visible={true} className="text-red-400 text-base font-bold mt-1">{errors.password}</HelperText>}
                            {/*======================== confirm password Input Field=====================*/}
                            <TextInput
                                className={` bg-slate-200 w-[90vw] h-12 text-base  rounded-lg mt-1`}
                                mode="outlined"
                                label="Confirm Password"
                                placeholder="Confirm Password"
                                selectionColor="orange"
                                secureTextEntry={confirmPasswordVisible}
                                right={<TextInput.Icon icon={confirmPasswordVisible ? "eye" : "eye-off"} color="red" onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)} />}
                                value={values.confirmPassword}
                                onChangeText={handleChange('confirmPassword')}
                                onBlur={handleBlur('confirmPassword')}
                            />
                            {(errors.confirmPassword && touched.confirmPassword) && <HelperText type="error" visible={true} className="text-red-400 text-base font-bold mt-1">{errors.confirmPassword}</HelperText>}
                            {/*========================Login Button=====================*/}
                            <Button mode="contained" className={` rounded-md w-[90vw] capitalize py-1 font-bold   ${errors.password ? "mt-5" : "mt-10"}`} onPress={handleSubmit} textColor="white" buttonColor='orange'
                                labelStyle={{ color: "white", fontSize: 20 }}
                                disabled={!isValid}>
                                Create Account
                            </Button>
                            {
                                loader && <Text className="text-lg font-extrabold text-center mt-3 text-teal-400">Creating account..</Text>
                            }
                        </View>
                    )}
                </Formik>
                <View>
                    <View className="flex-row mt-8 justify-center items-center">
                        <Text className="text-base font-normal ">Already have an account?  </Text>
                        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                            <Text className="text-lg underline text-orange-400 font-bold  ">LogIn</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View >
        </View >
    )
}
export default SignUp
