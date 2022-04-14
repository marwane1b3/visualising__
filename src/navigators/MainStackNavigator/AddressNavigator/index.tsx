import { createStackNavigator } from '@react-navigation/stack';
import { iOSStyleStackNavigatorOptions } from 'navigators/configs';
import { SCREENS } from 'navigators/constants';
import React from 'react';
import AddressesListScreen from 'screens/AddressesListScreen';
import MapScreen from 'screens/MapScreen/Loadable';

const Stack = createStackNavigator();

const AddressNavigator: React.FC<IAddressNavigatorProps> = ({}) => {
  return (
    <Stack.Navigator
      screenOptions={{ ...iOSStyleStackNavigatorOptions }}
      initialRouteName={SCREENS.ADDRESSES_LIST}>
      <Stack.Screen name={'Mes Addresses'} component={AddressesListScreen} />
      <Stack.Screen
        name={SCREENS.MAP_SCREEN}
        component={MapScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export type IAddressNavigatorProps = {};
export { AddressNavigator };
