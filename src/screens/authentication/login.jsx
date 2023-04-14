import { View, Text, TouchableOpacity } from 'react-native'
import { TextInput, HelperText, Button, Alert } from 'react-native-paper';
import React, { useState, useEffect } from 'react'
import { Formik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import { auth } from "../../configurations/firebase-config"
import { signInWithEmailAndPassword } from "firebase/auth"
import { logInYupSchema, initialValues } from "../../validationYupSchemas/LoginYupSchema"
const Login = () => {
    const [passwordVisible, setPasswordVisible] = useState(true);
    const [emailNotFound, setemailNotFound] = useState("");
    const [passwordWrong, setpasswordWrong] = useState("");
    const [loader, setLoader] = useState(false);
    const navigation = useNavigation();
    const onSignIn = async (email, password) => {
        setLoader(true)
        try {
            await signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    setemailNotFound("")
                    setpasswordWrong("")
                    setLoader(false)
                })
                .catch(error => {
                    setLoader(false)
                    if (error.code === "auth/user-not-found") {
                        setpasswordWrong("")
                        setemailNotFound("email is not found, please use another mail")
                    }
                    if (error.code === "auth/wrong-password") {

                        setpasswordWrong("incorrect password ")
                        setemailNotFound("")
                    }
                    console.log(error.message)
                })
        }
        catch (error) {
            console.log(error.message)
        }
    }
    return (
        <View className=" flex-1">
            <View className="justify-center items-center mt-36">
                <Text className="capitalize  text-3xl font-extrabold text-teal-500">welcome back</Text>
                <Text className=" text-base font-normal">login to continue</Text>
            </View>
            <View className='mt-10 justify-center items-center'>

                {emailNotFound && <Text className={`emailNotFound && text-red-400 text-base font-semibold mb-3`}>{emailNotFound}</Text>}
                {passwordWrong && <Text className={`passwordWrong && text-red-400 text-base font-semibold mb-3`}>{passwordWrong}</Text>}
                <Formik initialValues={initialValues} validationSchema={logInYupSchema} onSubmit={(values) => { onSignIn(values.email, values.password) }}>
                    {({ values, errors, isValid, touched, setFieldTouched, handleBlur, handleChange, handleSubmit }) => (
                        <View>
                            {/*========================Email Input Field=====================*/}
                            <TextInput
                                className={` bg-slate-200 w-[90vw] h-12 text-lg  rounded-lg `}
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
                                className={` bg-slate-200 w-[90vw] h-12 text-lg  rounded-lg mt-1`}
                                mode="outlined"
                                label="Password"
                                placeholder="password"
                                selectionColor="orange"
                                secureTextEntry={passwordVisible}
                                right={<TextInput.Icon icon={passwordVisible ? "eye" : "eye-off"} color="red" onPress={() => setPasswordVisible(!passwordVisible)} />}
                                value={values.password}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                            />
                            {(errors.password && touched.password) && <HelperText type="error" visible={true} className="text-red-400 text-base font-bold mt-1">{errors.password}</HelperText>}
                            <TouchableOpacity className=" flex-row justify-end mt-2 mr-2" onPress={() => navigation.navigate("ForgotPassword")}>
                                <Text className="font-bold capitalize text-orange-400 text-base underline">forget password ?</Text>
                            </TouchableOpacity>
                            {/*========================Login Button=====================*/}
                            <Button mode="contained" className={` rounded-md w-[90vw]  py-1 font-bold  text-3xl  ${errors.password ? "mt-5" : "mt-8"}`} onPress={handleSubmit} textColor="white" buttonColor='orange'
                                labelStyle={{ color: "white", fontSize: 22 }}
                                disabled={!isValid}>
                                Login
                            </Button>
                            {
                                loader && <Text className="text-lg font-extrabold text-center mt-3 text-teal-400">Signing..</Text>
                            }
                            <TouchableOpacity className="w-[90vw] bg-white border boder-[1px] rounded-md py-2 mt-7 opacity-40 justify-center items-center" onPress={() => navigation.navigate("SignUp")}>
                                <Text className="text-xl font-bold ">Sign up</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </Formik>
            </View>
        </View >
    )
}
export default Login
