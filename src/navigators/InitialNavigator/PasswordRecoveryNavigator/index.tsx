import { createStackNavigator } from '@react-navigation/stack';
import { iOSStyleStackNavigatorOptions } from 'navigators/configs';
import React from 'react';

import { SCREENS } from 'navigators/constants';
import ForgotPasswordScreen from 'screens/ForgotPasswordScreen';
import PasswordCodeVerificationScreen from 'screens/PasswordCodeVerificationScreen';

export type IPasswordRecoveryNavigatorProps = {};
const Stack = createStackNavigator();

export const PasswordRecoveryNavigator: React.FC<IPasswordRecoveryNavigatorProps> = () => {
  return (
    <Stack.Navigator
      initialRouteName={SCREENS.FORGOT_PASSWORD}
      screenOptions={{ ...iOSStyleStackNavigatorOptions }}
      headerMode="none">
      <Stack.Screen
        name={SCREENS.FORGOT_PASSWORD}
        component={ForgotPasswordScreen}
      />
      <Stack.Screen
        name={SCREENS.PASSWORD_CODE_VERIFICATION}
        component={PasswordCodeVerificationScreen}
      />
    </Stack.Navigator>
  );
};

export default PasswordRecoveryNavigator;
