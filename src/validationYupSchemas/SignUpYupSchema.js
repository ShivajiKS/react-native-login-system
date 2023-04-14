import * as Yup from 'yup';
const signUpYupSchema = Yup.object().shape(
    {
        firstName: Yup.string()
            .required(" required")
            .matches(/[a-zA-Z0-9/ /.]*$/, 'invalid name'),
        lastName: Yup.string()
            .required("required"),
        email: Yup.string().email("Invalid email address")
            .required("email is required")
            .matches(/[a-zA-Z0-9/-/.]*[@][ga][a-z]{3,4}[/.][comin]{2,3}$/, 'Invalid email pattern'),
        password: Yup.string()
            .min(8, "the password must be minimum 8 letters")
            .required("password required")
            .matches(/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/, 'Password should atleast contains 1 uppercase,special,digit character'),
        confirmPassword: Yup.string().min(8, "the password must be atleast 8 letters")
            .required(" confirm password required")
            .oneOf([Yup.ref('password'), null], 'confirm password must be same password')
    }
);
const initialValues =
{
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
};

export { signUpYupSchema, initialValues };