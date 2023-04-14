import * as Yup from 'yup';
const addressSchema = Yup.object().shape(
    {
        name: Yup.string()
            .required("required")
            .matches(/[a-zA-Z]*$/, 'Alphabets only'),
        phoneNumber: Yup.string()
            .required("required")
            .max(10, "invalid")
            .matches(/[6789]{1}[0-9]{9}$/, 'Invalid Phone number'),
        state: Yup.string()
            .required("required")
            .matches(/[a-zA-Z]*$/, 'Alphabets only'),
        pincode: Yup.number()
            .required("required"),
        address: Yup.string()
            .required("required")
            .matches(/[a-zA-Z0-9/-/.]*$/, 'Invalid'),
        locality: Yup.string()
            .required("required")
            .matches(/[a-zA-Z/-/.]*$/, 'Invalid'),
        district: Yup.string()
            .required("required")
            .matches(/[a-zA-Z]*$/, 'Alphabets only'),
    }
);

const initialValues =
{
    name: "",
    phoneNumber: "",
    state: "",
    pincode: "",
    address: "",
    locality: "",
    district: "",
};

export { addressSchema, initialValues };