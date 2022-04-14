/**
 *
 * LoginForm
 *
 */

import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer, useInjectSaga } from 'redux-injectors';
// import {
//   // makeSelectSignPayload,
//   makeSelectSignLoading,
//   makeSelectSignError,
// } from './selectors';
import {
  makeSelectSignLoading,
  makeSelectSignError,
} from 'containers/AuthHelper/selectors';
import { signInAction } from 'containers/AuthHelper/actions';

import reducer from './reducer';
import saga from './saga';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './validationSchema';

// import { FormattedMessage } from 'components/FormattedMessage';
// import messages from './messages';

import { CommonActions, useNavigation } from '@react-navigation/core';
import { NAVIGATORS, SCREENS } from 'navigators/constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
// import TextInput from 'components/TextInput';
import Button from 'components/Button';
// import { signInAction } from './actions';
import ControlledTextInput from 'components/ControlledTextInput';

const stateSelector = createStructuredSelector({
  loading: makeSelectSignLoading,
  error: makeSelectSignError,
});

const key = 'loginForm';

export const LoginForm: React.FC<ILoginFormProps> = ({}) => {
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
  const { loading, error } = useSelector(stateSelector);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  /* eslint-enable no-unused-vars */

  const onSubmit = (payload: object) => dispatch(signInAction(payload));

  return (
    <>
      <ControlledTextInput
        control={control}
        label="Username"
        name="username"
        errorMessage={errors.username?.message}
        staticHolder="email"
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
        secureTextEntry
        staticHolder="password"
        inputStyle={{
          width: '100%',
          borderWidth: 0,
        }}
      />
      {error && (
        <>
          <Text style={{ textAlign: 'center', marginTop: 15 }}>
            email ou mot de passe incorrect
          </Text>
        </>
      )}
      <Button
        label={loading ? 'Loading...' : 'Continuer'}
        onPress={handleSubmit(onSubmit)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export interface ILoginFormProps {}

export default LoginForm;
