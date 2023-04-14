import * as Yup from 'yup';
const logInYupSchema = Yup.object().shape(
    {
        email: Yup.string().email("please enter a valid email")
            .required("email is required")
            .matches(/[a-zA-Z0-9/-/.]*[@][ga][a-z]{3,4}[/.][comin]{2,3}$/, 'Invalid email pattern'),
        password: Yup.string()
            .min(8, " password must be at least 8 characters")
            .required("password required")
    }
);

const initialValues =
{
    email: "",
    password: "",
};

export { logInYupSchema, initialValues };
