// import React from 'react';
// import {
//   CardStyleInterpolators,
//   createStackNavigator,
//   StackNavigationOptions,
// } from '@react-navigation/stack';

// import HomeScreen from 'screens/HomeScreen';
// import SplashScreen from 'screens/SplashScreen';
// import { SCREENS } from './constants';

// const Stack = createStackNavigator();

// export default function MyStack() {
//   const screenOptions: StackNavigationOptions = {
//     gestureEnabled: true,
//     gestureDirection: 'horizontal',
//     cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
//   };

//   return (
//     <Stack.Navigator
//       initialRouteName={SCREENS.HOME}
//       screenOptions={screenOptions}
//       headerMode="float">
//       <Stack.Screen name={SCREENS.HOME} component={HomeScreen} />

//<Stack.Screen name={SCREENS.SPLASH} component={SplashScreen} />
//     </Stack.Navigator>
//   );
// }

// import React from 'react';
// import {
//   CardStyleInterpolators,
//   createStackNavigator,
//   StackNavigationOptions,
// } from '@react-navigation/stack';

// import HomeScreen from 'screens/HomeScreen';
// import SplashScreen from 'screens/SplashScreen';
// import { SCREENS } from './constants';

// const Stack = createStackNavigator();

// export default function MyStack() {
//   const screenOptions: StackNavigationOptions = {
//     gestureEnabled: true,
//     gestureDirection: 'horizontal',
//     cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
//   };

//   return (
//     <Stack.Navigator
//       initialRouteName={SCREENS.SPLASH}
//       screenOptions={screenOptions}
//       headerMode="float">
//       <Stack.Screen name={SCREENS.HOME} component={HomeScreen} />

//       <Stack.Screen name={SCREENS.SPLASH} component={SplashScreen} />
//     </Stack.Navigator>
//   );
// }
/*
import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';

import HomeScreen from 'screens/HomeScreen';
import SplashScreen from 'screens/SplashScreen';
import { SCREENS } from './constants';

const Stack = createStackNavigator();

export default function MyStack() {
  const screenOptions: StackNavigationOptions = {
    gestureEnabled: true,
    gestureDirection: 'horizontal',
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  };

  return (
    <Stack.Navigator
      initialRouteName={SCREENS.HOME}
      screenOptions={screenOptions}
      headerMode="float">
      <Stack.Screen name={SCREENS.SPLASH} component={SplashScreen} />
      <Stack.Screen name={SCREENS.HOME} component={HomeScreen} />
    </Stack.Navigator>
  );
}

 *
 */
