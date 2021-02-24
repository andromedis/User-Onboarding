import * as yup from 'yup';

const formSchema = yup.object().shape({
  name: yup.string()
    .trim()
    .required('Name is required'),
  email: yup.string()
    .email()
    .required('Email is required'),
  password: yup.string()
    .required('Password is required'),
  terms: yup.boolean()
    .oneOf([true], 'You must accept the Terms of Service')
});

export default formSchema;