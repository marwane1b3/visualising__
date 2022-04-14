/**
 *
 * AuthProvider
 *
 */

import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { makeSelectToken, makeSelectLoading } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { InitialNavigator } from 'navigators/InitialNavigator';

import { AppNavigator } from 'navigators/App';
import { rehydrateTokenAction } from './actions';
import { ActivityIndicator, View } from 'react-native';
import SplashScreen from 'screens/SplashScreen';
import AsyncStorage from '@react-native-community/async-storage';

import {
  makeSelectLoading as makeSelectLoadingUserDetailsData,
  makeSelectUserDetailsData,
} from 'containers/UserDetails/selectors';
import { NavigationContainer } from '@react-navigation/native';
import theme from 'theme/theme';
import { AuthNavigator } from 'navigators/InitialNavigator/AuthNavigator';
import AuthHelper from 'containers/AuthHelper';
import { deleteTokenAction } from 'providers/AuthProvider/actions';

const stateSelector = createStructuredSelector({
  token: makeSelectToken,
  loadingToken: makeSelectLoading,
  loadingUserDetails: makeSelectLoadingUserDetailsData,
  userData: makeSelectUserDetailsData,
});

const key = 'authProvider';

export const AuthProvider: React.FC<IAuthProviderProps> = ({
  children,
}): JSX.Element => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  /* eslint-disable no-unused-vars */
  const { token, loadingToken, loadingUserDetails, userData } =
    useSelector(stateSelector);
  const dispatch = useDispatch();
  /* eslint-enable no-unused-vars */

  useEffect(() => {
    rehydrateToken();
    checkForShowTutorial();
  }, []);

  const rehydrateToken = () => {
    dispatch(rehydrateTokenAction());
  };

  const [firstTime, setFirstTime] = useState(false);

  const checkForShowTutorial = async () => {
    const storedValue = (await AsyncStorage.getItem('firstTime')) || 'true';
    setFirstTime(storedValue == 'true' ? true : false);
  };

  // if loading return SplashScreen
  // TODO: add all loadings here to keep splash screen till the app is ready to go
  // LIKE: load user data, address, appSettings...
  if (loadingToken || loadingUserDetails) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  // Verify if first time to show Tutorial
  // TODO: move firstTime to store and handle navigation or something...
  // if (firstTime) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //       <ActivityIndicator />
  //     </View>
  //   );
  // }

  // Check if user logged in or not
  // if (!token) {
  //   return <InitialNavigator />;
  // } else {
  //   return <AppNavigator />;
  // }

  // if (token && Object.keys(userData).length === 0) {
  //   dispatch(deleteTokenAction());
  // }

  if (!token) {
    return (
      <NavigationContainer
        theme={{
          // dark: false,
          colors: {
            background: theme.palette.default.main,
            // primary: '',
            // card: '',
            // text: '',
            // border: '',
            // notification: '',
          },
        }}>
        {/* <InitialNavigator /> */}
        <AuthNavigator />
        <AuthHelper />
        {/* <Text style={{backgroundColor: 'red'}}>OOK</Text> */}
      </NavigationContainer>
    );
  } else {
    // console.log('testing social : ' + token);

    return (
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    );
  }
};

export interface IAuthProviderProps {}

export default AuthProvider;
