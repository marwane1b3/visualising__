import { createStackNavigator } from '@react-navigation/stack';
import { iOSStyleStackNavigatorOptions } from 'navigators/configs';
import { Text } from 'react-native';
import { SCREENS } from 'navigators/constants';
import React from 'react';
import { View } from 'react-native';
import OrdersHistoryScreen from 'screens/OrdersHistoryScreen';
import PourboirScreen from 'screens/PourboirScreen';
import RatingScreen from 'screens/RatingScreen';
import theme from 'theme/theme';
import ReclamationScreen from 'screens/ReclamationScreen';
import OrdersSuiviEncours from 'screens/OrdersSuiviEncours';
import OrderHistoryItem from 'screens/OrderHistoryItem';
const Stack = createStackNavigator();

const OrdersNavigator: React.FC<IOrdersNavigatorProps> = ({}) => {
  return (
    <Stack.Navigator
      screenOptions={{ ...iOSStyleStackNavigatorOptions }}
      initialRouteName={SCREENS.ORDERS}
      headerMode="float">
      <Stack.Screen
        name={SCREENS.ORDERS}
        component={OrdersHistoryScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={SCREENS.ORDERHISTORYITEM}
        component={OrderHistoryItem}
        options={() => ({
          headerStyle: {
            elevation: 0,
          },
          headerTitle: () => (
            <Text
              style={{
                color: theme.palette.default.dark,
                fontSize: 21,
                fontWeight: 'bold',
              }}>
              Commande N° : XXJJYF
            </Text>
          ),
          headerTintColor: theme.palette.default.main,
        })}
      />
      <Stack.Screen
        name={SCREENS.POURBOIR}
        component={PourboirScreen}
        options={() => ({
          headerStyle: {
            elevation: 0,
          },
          headerTitle: () => (
            <Text
              style={{
                color: theme.palette.default.dark,
                fontSize: 18,
                fontWeight: 'bold',
              }}>
              Pourboire livreur
            </Text>
          ),
          headerTintColor: theme.palette.default.main,
        })}
      />
      <Stack.Screen
        name={SCREENS.RECLAMATION}
        component={ReclamationScreen}
        options={() => ({
          headerStyle: {
            elevation: 0,
          },
          headerTitle: () => (
            <Text
              style={{
                color: theme.palette.default.dark,
                fontSize: 18,
                fontWeight: 'bold',
              }}>
              Réclamation
            </Text>
          ),
          headerTintColor: theme.palette.default.main,
        })}
      />
      <Stack.Screen
        name={SCREENS.ORDERSSUIVIENCOURS}
        component={OrdersSuiviEncours}
        options={() => ({
          headerStyle: {
            elevation: 0,
          },
          headerTitle: () => (
            <Text
              style={{
                color: theme.palette.default.dark,
                fontSize: 21,
                fontWeight: 'bold',
              }}>
              Commande N° : XXJJYF
            </Text>
          ),
          headerTintColor: theme.palette.default.main,
        })}
      />
    </Stack.Navigator>
  );
};

export type IOrdersNavigatorProps = {};
export { OrdersNavigator };
