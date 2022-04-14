/**
 *
 * SignInScreen
 *
 */

import React, { useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import {} from './selectors';
import reducer from './reducer';
import saga from './saga';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Logo from '../../../tools/logo/Logo.svg';

// import { FormattedMessage } from 'components/FormattedMessage';
// import messages from './messages';

import { CommonActions, useNavigation } from '@react-navigation/core';
import { NAVIGATORS, SCREENS } from 'navigators/constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
// import TextInput from 'components/TextInput';
import Button from 'components/Button';
import ControlledTextInput from 'components/ControlledTextInput';
import LoginForm from 'containers/LoginForm';
import theme from 'theme/theme';

const stateSelector = createStructuredSelector({});

const key = 'signInScreen';

export const SignInScreen: React.FC<ISignInScreenProps> = ({}) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  /* eslint-disable no-unused-vars */
  // const {} = useSelector(stateSelector);
  const dispatch = useDispatch();
  const navigation: any = useNavigation();
  /* eslint-enable no-unused-vars */

  const navigateToPasswordRecovery = () => {
    navigation.navigate(NAVIGATORS.PASSWORD_RECOVERY);
  };

  const navigateToApp = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: NAVIGATORS.APP }],
      }),
    );
  };

  const handleNext = () => navigation.navigate(SCREENS.EXTERIOR_AUTH);
  return (
    <ScrollView scrollEnabled contentContainerStyle={styles.container}>
      <View style={[{ marginBottom: 15 }]}>
        <Logo width={248} height={148} />
      </View>

      <LoginForm />

      <View
        style={{
          flexDirection: 'row',
          marginTop: theme.spacing.default[5],
          marginBottom: theme.spacing.default[7],
        }}>
        <Text
          style={{
            fontSize: theme.fontSizing.default[2],
            color: theme.palette.default.dark,
          }}>
          Vous n'avez pas de compte ?
        </Text>
        <TouchableOpacity onPress={handleNext}>
          <Text
            style={{
              fontSize: theme.fontSizing.default[2],
              marginLeft: 2,
              color: theme.palette.default.light,
            }}>
            Créer un compte
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    paddingHorizontal: 12,
    backgroundColor: theme.palette.default.main,
  },
});
/**
 <TouchableOpacity onPress={navigateToRegister}>
        <Text>navigateToRegister</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={navigateToPasswordRecovery}>
        <Text>navigateToPasswordRecovery</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={navigateToApp}>
        <Text>navigateToApp</Text>
      </TouchableOpacity>
 */
export interface ISignInScreenProps {}

export default SignInScreen;
