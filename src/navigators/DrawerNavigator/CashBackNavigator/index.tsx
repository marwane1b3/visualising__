import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { iOSStyleStackNavigatorOptions } from 'navigators/configs';

import { SCREENS } from 'navigators/constants';

import CashBackScreen from 'screens/CashBackScreen';

const Stack = createStackNavigator();

const CashBackNavigator: React.FC<ICashBackNavigatorProps> = ({}) => {
  return (
    <Stack.Navigator
      screenOptions={{ ...iOSStyleStackNavigatorOptions }}
      initialRouteName={SCREENS.CASH_BACK}
      headerMode="float">
      <Stack.Screen name={SCREENS.CASH_BACK} component={CashBackScreen} />
    </Stack.Navigator>
  );
};

export type ICashBackNavigatorProps = {};
export { CashBackNavigator };
