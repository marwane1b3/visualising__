import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { iOSStyleStackNavigatorOptions } from 'navigators/configs';
import { SCREENS } from 'navigators/constants';

import CustomerServiceScreen from 'screens/CustomerServiceScreen';

const Stack = createStackNavigator();

const CustomerServiceNavigator: React.FC<ICustomerServiceNavigatorProps> = ({}) => {
  return (
    <Stack.Navigator
      screenOptions={{ ...iOSStyleStackNavigatorOptions }}
      initialRouteName={SCREENS.CUSTOMER_SERVICE}
      headerMode="float">
      <Stack.Screen
        name={SCREENS.CUSTOMER_SERVICE}
        component={CustomerServiceScreen}
      />
    </Stack.Navigator>
  );
};

export type ICustomerServiceNavigatorProps = {};
export { CustomerServiceNavigator };
