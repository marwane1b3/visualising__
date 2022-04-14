import { createStackNavigator } from '@react-navigation/stack';
import { iOSStyleStackNavigatorOptions } from 'navigators/configs';
import { SCREENS } from 'navigators/constants';
import React from 'react';
import { View } from 'react-native';
import KaalixPayScreen from 'screens/KaalixPayScreen';

const Stack = createStackNavigator();

export type IKaalixPayNavigatorProps = {};

const KaalixPayNavigator: React.FC<IKaalixPayNavigatorProps> = ({}) => {
  return (
    <Stack.Navigator
      screenOptions={{ ...iOSStyleStackNavigatorOptions }}
      initialRouteName={SCREENS.KAALIX_PAY}
      headerMode="none">
      <Stack.Screen name={SCREENS.KAALIX_PAY} component={KaalixPayScreen} />
    </Stack.Navigator>
  );
};

export { KaalixPayNavigator };
