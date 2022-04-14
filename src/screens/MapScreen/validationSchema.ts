import * as yup from 'yup';

export const schema = yup.object().shape({
  address: yup.string().required('Address is required.'),
  // .email('username format')
  details: yup.string().required('Details is required.'),
});
