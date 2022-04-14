import React from 'react';
import
  {
    CardStyleInterpolators,
    createStackNavigator,
  } from '@react-navigation/stack';
import { iOSStyleStackNavigatorOptions } from 'navigators/configs';
import { NAVIGATORS, SCREENS } from 'navigators/constants';
import PasswordRecoveryNavigator from 'navigators/InitialNavigator/PasswordRecoveryNavigator';
import RegisterScreen from 'screens/RegisterScreen';
import SignInScreen from 'screens/SignInScreen';
import ExteriorAuth from 'screens/ExteriorAuth';
import ExtirorSignIn from 'screens/ExteriorSignIn';
import theme from 'theme/theme';
import { Platform } from 'react-native';
import { enableScreens } from 'react-native-screens';
import SplashScreen from 'screens/SplashScreen';

enableScreens();
const Stack = createStackNavigator();

const AuthNavigator: React.FC<IAuthNavigatorProps> = () =>
{
  return (
    <Stack.Navigator
      initialRouteName={ SCREENS.SPLASH }
      screenOptions={ () => ( {
        //     gestureEnabled: true,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      } ) }>
      <Stack.Screen
        options={ () => ( {
          headerTitle: '',
          headerStyle: {
            backgroundColor: theme.palette.default.main,

            elevation: 0,
          },
        } ) }
        name={ SCREENS.SPLASH }
        component={ SplashScreen }
      />
      <Stack.Screen
        name={ SCREENS.EXTERIOR_AUTH }
        options={ () => ( {
          title: '',
          headerLeft: () => null,
          headerStyle: {
            backgroundColor: theme.palette.default.main,

            elevation: 0,
          },
          gestureEnabled: false,
          transitionSpec: {
            open: { animation: 'timing', config: { duration: 250 } },
            close: { animation: 'timing', config: { duration: 250 } },
            useNativeDriver: true,
          },
        } ) }
        component={ ExteriorAuth }
      />
      <Stack.Screen
        name={ SCREENS.EXTERIOR_SIGNIN }
        options={ () => ( {
          title: '',
          headerLeft: () => null,
          headerStyle: {
            backgroundColor: theme.palette.default.main,

            elevation: 0,
          },
          gestureEnabled: false,
          transitionSpec: {
            open: { animation: 'timing', config: { duration: 250 } },
            close: { animation: 'timing', config: { duration: 250 } },
            useNativeDriver: true,
          },
        } ) }
        component={ ExtirorSignIn }
      />
      <Stack.Screen
        name={ SCREENS.REGISTER }
        options={ () => ( {
          title: '',
          headerStyle: {
            backgroundColor: theme.palette.default.main,

            elevation: 0,
          },
          headerTintColor: theme.palette.default.light,
          gestureEnabled: false,
          transitionSpec: {
            open: { animation: 'timing', config: { duration: 450 } },
            close: { animation: 'timing', config: { duration: 450 } },
            useNativeDriver: true,
          },
        } ) }
        component={ RegisterScreen }
      />

      <Stack.Screen
        name={ SCREENS.SIGNIN }
        options={ () => ( {
          title: '',
          headerStyle: {
            backgroundColor: theme.palette.default.main,

            elevation: 0,
          },
          headerTintColor: theme.palette.default.light,
          gestureEnabled: false,
          transitionSpec: {
            open: { animation: 'timing', config: { duration: 450 } },
            close: { animation: 'timing', config: { duration: 450 } },
            useNativeDriver: true,
          },
        } ) }
        component={ SignInScreen }
      />

      <Stack.Screen
        name={ NAVIGATORS.PASSWORD_RECOVERY }
        component={ PasswordRecoveryNavigator }
      />
    </Stack.Navigator>
  );
};

export type IAuthNavigatorProps = {};
export { AuthNavigator };
