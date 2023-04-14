import { View, Text, TouchableOpacity } from 'react-native'
import { TextInput, HelperText, Button } from 'react-native-paper';
import React, { useState } from 'react'
import { Formik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import { auth } from "../../configurations/firebase-config"
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import * as Yup from 'yup';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ForgotPassword = () => {
    const [emailNotFound, setemailNotFound] = useState("");
    const [sendPasswordResetEmail, sending, error] = useSendPasswordResetEmail(
        auth
    );
    const [successMessage, setSuccesMessage] = useState("");
    const navigation = useNavigation();
    const initialValues = {
        email: "",
    };
    const logInYupSchema = Yup.object().shape({
        email: Yup.string().email("please enter a valid email")
            .required("email is required")
            .matches(/[a-zA-Z0-9/-/.]*[@][ga][a-z]{3,4}[/.][comin]{2,3}$/, 'Invalid email pattern')
    });
    const onForgetPassword = async (email) => {
        const success = await sendPasswordResetEmail(
            email
        );
        if (success) {
            setemailNotFound("")
            setSuccesMessage("password reset link has been sent to your email")
        }
        if (error) {
            setSuccesMessage("")
            setemailNotFound("email is not found, please use another mail")
        }

    }
    return (
        <View className=" flex-1">
            <View className="justify-center items-center mt-36">
                <Text className="capitalize  text-3xl font-extrabold text-teal-500">forgot password</Text>
                <Text className=" text-base font-normal">Enter email to continue</Text>
            </View>
            <View className='mt-10 justify-center items-center'>

                {successMessage && <Text className={`successMessage && text-green-500 text-base font-semibold mb-4`}>{successMessage}</Text>}
                {emailNotFound && <Text className={`emailNotFound && text-red-400 text-base font-semibold mb-4`}>{emailNotFound}</Text>}
                <Formik initialValues={initialValues} validationSchema={logInYupSchema} onSubmit={(values) => { onForgetPassword(values.email) }}>
                    {({ values, errors, isValid, touched, handleBlur, handleChange, handleSubmit }) => (
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

                            {/*========================Forgot Button=====================*/}
                            <Button mode="contained" className={` rounded-md w-[90vw]  py-1 font-bold  text-3xl   ${errors.email ? "mt-5" : "mt-10"}`} onPress={handleSubmit} textColor="white" buttonColor='orange'
                                labelStyle={{ color: "white", fontSize: 22 }}
                                disabled={!isValid}>
                                Reset password
                            </Button>
                            {
                                sending && <Text className="text-lg font-extrabold text-center mt-3 text-teal-400">sending..</Text>
                            }
                            <TouchableOpacity className="flex-row m-auto mt-10 opacity-50" onPress={() => navigation.goBack()}>
                                <Ionicons name="arrow-back-outline" color={"black"} size={25} />
                                <Text className="text-base font-bold "> Back to log in</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </Formik>
            </View>
        </View >
    )
}
export default ForgotPassword
