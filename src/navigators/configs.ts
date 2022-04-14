import {
  CardStyleInterpolators,
  StackNavigationOptions,
} from '@react-navigation/stack';

export const iOSStyleStackNavigatorOptions: StackNavigationOptions = {
  // gestureEnabled: true,
  gestureDirection: 'horizontal',
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};
