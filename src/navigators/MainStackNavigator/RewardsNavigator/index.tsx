import { createStackNavigator } from '@react-navigation/stack';
import { iOSStyleStackNavigatorOptions } from 'navigators/configs';
import { SCREENS } from 'navigators/constants';
import React from 'react';
import RewardsScreen from 'screens/RewardsScreen';

const Stack = createStackNavigator();

const RewardsNavigator: React.FC<IRewardsNavigatorProps> = ({}) => {
  return (
    <Stack.Navigator
      screenOptions={{ ...iOSStyleStackNavigatorOptions }}
      initialRouteName={SCREENS.REWARDS}
      headerMode="none">
      <Stack.Screen name={SCREENS.REWARDS} component={RewardsScreen} />
    </Stack.Navigator>
  );
};

export type IRewardsNavigatorProps = {};

export { RewardsNavigator };
