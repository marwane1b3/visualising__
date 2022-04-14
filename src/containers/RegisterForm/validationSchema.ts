import * as yup from 'yup';

export const schema = yup.object().shape({
  username: yup.string().required('username is required.'),
  email: yup.string().required('Email is required.').email('Email format'),
  password: yup.string().required('Password is required.'),
});
