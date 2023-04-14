import { View, Text, TouchableOpacity } from 'react-native'
import { TextInput, HelperText, Button } from 'react-native-paper';
import React, { useState } from 'react'
import { Formik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import { auth } from "../../../configurations/firebase-config"
import * as Yup from 'yup';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useUpdatePassword } from 'react-firebase-hooks/auth';

const ChangePassword = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const [updatePassword, updating, error] = useUpdatePassword(auth);
    const [successMessage, setSuccesMessage] = useState("");
    const navigation = useNavigation();
    const [passwordVisible, setPasswordVisible] = useState(true);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(true);
    const initialValues = {
        password: "",
        confirmPassword: ""
    };
    const changePasswordYupSchema = Yup.object().shape({
        password: Yup.string()
            .min(8, "the password must be minimum 8 letters")
            .required("password required")
            .matches(/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/, 'Password should atleast contains 1 uppercase,special,digit character'),
        confirmPassword: Yup.string().min(8, "the password must be atleast 8 letters")
            .required(" confirm password required")
            .oneOf([Yup.ref('password'), null], 'confirm password must be same password')
    });
    const onChangePassword = async (password) => {
        const success = await updatePassword(password);
        if (success) {
            setErrorMessage("")
            setSuccesMessage("Password Updated succesfully..")
        }
        if (error) {
            setSuccesMessage("")
            setErrorMessage(error.message)
        }

    }
    return (
        <View className=" flex-1">
            <View className="justify-center items-center mt-36">
                <Text className="capitalize  text-3xl font-extrabold text-teal-500">change password</Text>
                <Text className=" text-base font-normal">enter password to continue</Text>
            </View>
            <View className='mt-10 justify-center items-center'>

                {successMessage && <Text className={`successMessage && text-green-500 text-base font-semibold mb-4`}>{successMessage}</Text>}
                {errorMessage && <Text className={`errorMessage && text-red-400 text-base font-semibold mb-4`}>{errorMessage}</Text>}
                <Formik initialValues={initialValues} validationSchema={changePasswordYupSchema} onSubmit={(values) => { onChangePassword(values.password) }}>
                    {({ values, errors, isValid, touched, handleBlur, handleChange, handleSubmit }) => (
                        <View>
                            {/*========================password Input Field=====================*/}
                            <TextInput
                                className={` bg-slate-200 w-[90vw] h-12 text-base  rounded-lg mt-1`}
                                mode="outlined"
                                label="New Password"
                                placeholder="New Password"
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

                            {/*========================Change PassWord Button=====================*/}
                            <Button mode="contained" className={` rounded-md w-[90vw]  py-1 font-bold  text-3xl   ${errors.email ? "mt-5" : "mt-10"}`} onPress={handleSubmit} textColor="white" buttonColor='orange'
                                labelStyle={{ color: "white", fontSize: 22 }}
                                disabled={!isValid}>
                                Reset password
                            </Button>
                            {
                                updating && <Text className="text-lg font-extrabold text-center mt-3 text-teal-400">Updating..</Text>
                            }
                            <TouchableOpacity className="flex-row m-auto mt-10 opacity-50" onPress={() => navigation.goBack()}>
                                <Ionicons name="arrow-back-outline" color={"black"} size={25} />
                                <Text className="text-base font-bold ">Go Back</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </Formik>
            </View>
        </View >
    )
}
export default ChangePassword
