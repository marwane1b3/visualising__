import * as yup from 'yup';

export const schema = yup.object().shape({
  username: yup.string().required('username is required.'),
  // .email('username format')
  password: yup.string().required('password is required.'),
});
