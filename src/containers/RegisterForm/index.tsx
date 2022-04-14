/**
 *
 * RegisterForm
 *
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import reducer from './reducer';
import saga from './saga';
// import { FormattedMessage } from 'components/FormattedMessage';
// import messages from './messages';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { schema } from './validationSchema';
import ControlledTextInput from 'components/ControlledTextInput';
import Button from 'components/Button';

// import {
//   makeSelectSignPayload,
//   makeSelectSignLoading,
//   makeSelectSignError,
// } from './selectors';

// import { registerAction } from './actions';
import {
  makeSelectRegisterError,
  makeSelectRegisterLoading,
  makeSelectRegisterPayload
} from 'containers/AuthHelper/selectors';
import { registerAction } from 'containers/AuthHelper/actions';

const stateSelector = createStructuredSelector({
  payload: makeSelectRegisterPayload,
  loading: makeSelectRegisterLoading,
  error: makeSelectRegisterError,
});

const key = 'registerForm';

export const RegisterForm: React.FC<IRegisterFormProps> = ({}) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  /* eslint-disable no-unused-vars */
  const { payload, loading, error } = useSelector(stateSelector);
  const dispatch = useDispatch();
  /* eslint-enable no-unused-vars */

  const onRegister = (data: any) => {
    dispatch(registerAction(data));
  };

  return (
    <>
      <ControlledTextInput
        control={control}
        label="Username"
        name="username"
        errorMessage={errors.username?.message}
        staticHolder="Nom et prénom"
        inputStyle={{
          width: '100%',
          borderWidth: 0,
        }}
      />
      <ControlledTextInput
        control={control}
        label="Email"
        name="email"
        errorMessage={errors.email?.message}
        staticHolder="E-mail"
        inputStyle={{
          width: '100%',
          borderWidth: 0,
        }}
      />
      <ControlledTextInput
        control={control}
        label="Password"
        name="password"
        errorMessage={errors.password?.message}
        staticHolder="Mot de passe"
        inputStyle={{
          width: '100%',
          borderWidth: 0,
        }}
      />

      <Button
        label={loading ? 'Loading...' : 'Créer un compte'}
        onPress={handleSubmit(onRegister)}
      />
    </>
  );
};

const styles = StyleSheet.create({});

export interface IRegisterFormProps {}

export default RegisterForm;
