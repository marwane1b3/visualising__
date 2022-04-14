import { createStackNavigator } from '@react-navigation/stack';
import { iOSStyleStackNavigatorOptions } from 'navigators/configs';
import { SCREENS } from 'navigators/constants';
import React from 'react';
import { View } from 'react-native';
import FeedbackScreen from 'screens/FeedbackScreen';
const Stack = createStackNavigator();

const FeedbackNavigator: React.FC<IFeedbackNavigatorProps> = ({}) => {
  return (
    <Stack.Navigator
      screenOptions={{ ...iOSStyleStackNavigatorOptions }}
      initialRouteName={SCREENS.FEEDBACK}
      headerMode="float">
      <Stack.Screen name={SCREENS.FEEDBACK} component={FeedbackScreen} />
    </Stack.Navigator>
  );
};

export type IFeedbackNavigatorProps = {};
export { FeedbackNavigator };
