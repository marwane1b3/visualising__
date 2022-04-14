import { createStackNavigator } from '@react-navigation/stack';
import { iOSStyleStackNavigatorOptions } from 'navigators/configs';
import { SCREENS } from 'navigators/constants';
import React from 'react';
import ReferralScreen from 'screens/ReferralScreen';

const Stack = createStackNavigator();

const ReferralNavigator: React.FC<IReferralNavigatorProps> = ({}) => {
  return (
    <Stack.Navigator
      initialRouteName={SCREENS.REFERRAL}
      screenOptions={{ ...iOSStyleStackNavigatorOptions }}
      headerMode="none">
      <Stack.Screen name={SCREENS.REFERRAL} component={ReferralScreen} />
    </Stack.Navigator>
  );
};

export type IReferralNavigatorProps = {};
export { ReferralNavigator };
