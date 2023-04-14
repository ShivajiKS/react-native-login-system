import { View, Text, TouchableOpacity } from 'react-native'
import { TextInput, HelperText, Button } from 'react-native-paper';
import React, { useState } from 'react'
import { Formik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import { auth } from "../../../configurations/firebase-config"
import * as Yup from 'yup';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useUpdateEmail } from 'react-firebase-hooks/auth';

const UpdateEmail = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const [updateEmail, updating, error] = useUpdateEmail(auth);
    const [successMessage, setSuccesMessage] = useState("");
    const navigation = useNavigation();
    const initialValues = {
        email: "",
    };
    const updateEmailYupSchema = Yup.object().shape({
        email: Yup.string().email("please enter a valid email")
            .required("email is required")
            .matches(/[a-zA-Z0-9/-/.]*[@][ga][a-z]{3,4}[/.][comin]{2,3}$/, 'Invalid email pattern')
    });
    const onUpdateEmail = async (email) => {
        const success = await updateEmail(email);
        if (success) {
            setErrorMessage("")
            setSuccesMessage("Email address Updated succesfully..")
        }
        if (error) {
            setSuccesMessage("")
            setErrorMessage(error.message)
        }

    }
    return (
        <View className=" flex-1">
            <View className="justify-center items-center mt-36">
                <Text className="capitalize  text-2xl font-extrabold text-teal-500">change email address</Text>
                <Text className=" text-base font-normal">Enter email to continue</Text>
            </View>
            <View className='mt-10 justify-center items-center'>

                {successMessage && <Text className={`successMessage && text-green-500 text-base font-semibold mb-4`}>{successMessage}</Text>}
                {errorMessage && <Text className={`errorMessage && text-red-400 text-base font-semibold mb-4`}>{errorMessage}</Text>}
                <Formik initialValues={initialValues} validationSchema={updateEmailYupSchema} onSubmit={(values) => { onUpdateEmail(values.email) }}>
                    {({ values, errors, isValid, touched, handleBlur, handleChange, handleSubmit }) => (
                        <View>
                            {/*========================Email Input Field=====================*/}
                            <TextInput
                                className={` bg-slate-200 w-[90vw] h-12 text-lg  rounded-lg `}
                                mode="outlined"
                                label="New Email"
                                placeholder="sivajikondeti37@gmail.com"
                                selectionColor="orange"
                                value={values.email}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                            />
                            {(errors.email && touched.email) && <HelperText type="error" visible={true} className="text-red-400 text-base font-bold mt-1">{errors.email}</HelperText>}

                            {/*========================submit Button=====================*/}
                            <Button mode="contained" className={` rounded-md w-[90vw]  py-1 font-bold  text-3xl   ${errors.email ? "mt-5" : "mt-10"}`} onPress={handleSubmit} textColor="white" buttonColor='orange'
                                labelStyle={{ color: "white", fontSize: 20 }}
                                disabled={!isValid}>
                                Update email
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
export default UpdateEmail
