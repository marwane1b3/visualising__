import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthNavigator } from 'navigators/InitialNavigator/AuthNavigator';
import { iOSStyleStackNavigatorOptions } from 'navigators/configs';
import { SCREENS, NAVIGATORS } from 'navigators/constants';

import SplashScreen from 'screens/SplashScreen';
import TutorialScreen from 'screens/TutorialScreen';
import DrawerNavigator from 'navigators/DrawerNavigator';
import AsyncStorage from '@react-native-community/async-storage';

const Stack = createStackNavigator();

const InitialNavigator: React.FC<IInitialNavigatorProps> = ( { } ) =>
{
  return (
    <Stack.Navigator
      initialRouteName={ NAVIGATORS.AUTH }
      screenOptions={ { ...iOSStyleStackNavigatorOptions } }
      headerMode="none">
      {/* <Stack.Screen name={SCREENS.SPLASH} component={SplashScreen} /> */ }
      <Stack.Screen name={ NAVIGATORS.AUTH } component={ AuthNavigator } />
      {/* <Stack.Screen name={NAVIGATORS.APP} component={DrawerNavigator} /> */ }
      <Stack.Screen name={ SCREENS.TUTORIAL } component={ TutorialScreen } />
    </Stack.Navigator>
  );
};

export type IInitialNavigatorProps = {};
export { InitialNavigator };
