import { createStackNavigator } from '@react-navigation/stack';
import { iOSStyleStackNavigatorOptions } from 'navigators/configs';
import { SCREENS } from 'navigators/constants';
import React from 'react';
import { View } from 'react-native';
import UserProfileScreen from 'screens/UserProfileScreen';

const Stack = createStackNavigator();

const UserProfileNavigator: React.FC<IUserProfileNavigatorProps> = ({}) => {
  return (
    <Stack.Navigator
      screenOptions={{ ...iOSStyleStackNavigatorOptions }}
      initialRouteName={SCREENS.USER_PROFILE}
      headerMode="float">
      <Stack.Screen name={SCREENS.USER_PROFILE} component={UserProfileScreen} />
    </Stack.Navigator>
  );
};

export type IUserProfileNavigatorProps = {};
export { UserProfileNavigator };
