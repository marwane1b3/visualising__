import React, { useEffect } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { DRAWER_ROUTE_NAME, NAVIGATORS, SCREENS } from 'navigators/constants';
import {
  createDrawerNavigator,
  DrawerItem,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { makeSelectUserDetailsData } from 'containers/UserDetails/selectors';
import { UserProfileNavigator } from './UserProfileNavigator';
import { OrdersNavigator } from './OrdersNavigator';
// import { StoresListNavigator } from './StoresListNavigator';
import { CashBackNavigator } from './CashBackNavigator';
import { FeedbackNavigator } from './FeedbackNavigator';
import { CustomerServiceNavigator } from './CustomerServiceNavigator';
import { HomeNavigator } from './HomeNavigator';

import PaymentScreen from '../../screens/PaymentScreen';
import CheckoutScreen from '../../screens/CheckoutScreen';
import CardManagerScreen from '../../screens/CardManagerScreen';
import AddCardScreen from '../../screens/AddCardScreen';
import { KaalixUpNavigator } from 'navigators/MainStackNavigator/kaalixUpNavigator';
import { KaalixSmilesNavigator } from './KaalixSmilesNavigator';

import OrdersHistoryScreen from 'screens/OrdersHistoryScreen';
import theme from 'theme/theme';
import UserProfileScreen from 'screens/UserProfileScreen';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { deleteTokenAction } from 'providers/AuthProvider/actions';
const Drawer = createDrawerNavigator();

export type IDrawerNavigatorProps = {};
const stateSelector = createStructuredSelector({
  userData: makeSelectUserDetailsData,
});

export const DrawerNavigator: React.FC<IDrawerNavigatorProps> = ({}) => {
  const { userData } = useSelector(stateSelector);
  // useEffect(
  //   () => console.log('user data after login :' + JSON.stringify(userData)),
  //   [userData],
  // );

  const dispatch = useDispatch();
  const logOut = () => dispatch(deleteTokenAction());

  const LogoutFunction = (props: any) => {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          labelStyle={{
            color: theme.palette.default.dark,
            fontSize: 20,
            fontWeight: 'bold',
          }}
          label="Se déconnecter"
          onPress={logOut}
        />
      </DrawerContentScrollView>
    );
  };

  return (
    <Drawer.Navigator
      initialRouteName={NAVIGATORS.MAIN_STACK}
      drawerContent={(props: any) => <LogoutFunction {...props} />}>
      <Drawer.Screen
        name={SCREENS.USER_PROFILE}
        options={() => ({
          title: () => (
            <View
              style={{
                flexDirection: 'row',
                marginBottom: 10,
                justifyContent: 'space-around',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: 75,
                  height: 75,
                  borderRadius: 75 / 2,
                  borderWidth: 1,
                  borderColor: theme.palette.default.main,
                  alignItems: 'center',
                }}>
                <IonIcons
                  name={'person-outline'}
                  size={55}
                  color={theme.palette.default.main}
                />
              </View>
              <Text
                style={{
                  color: theme.palette.default.dark,
                  fontSize: 15,
                  fontWeight: 'bold',
                }}>
                {userData
                  ? userData.username
                    ? userData.username
                    : userData.first_name
                  : 'userName'}
              </Text>
            </View>
          ),
        })}
        component={UserProfileScreen}
      />
      <Drawer.Screen
        name={NAVIGATORS.MAIN_STACK}
        options={() => ({
          title: () => (
            <Text
              style={{
                color: theme.palette.default.dark,
                fontSize: 20,
                fontWeight: 'bold',
              }}>
              Acceuil
            </Text>
          ),
        })}
        component={HomeNavigator}
      />
      {/* <Drawer.Screen
        name={SCREENS.CHECKOUT}
        options={{ title: 'CHECKOUT' }}
        component={CheckoutScreen}
      /> */}
      <Drawer.Screen
        name={NAVIGATORS.ORDERS}
        options={(props: any) => ({
          title: () => (
            <Text
              style={{
                color: theme.palette.default.dark,
                fontSize: 20,
                fontWeight: 'bold',
              }}>
              Mes commandes
            </Text>
          ),
        })}
        component={OrdersNavigator}
      />
      <Drawer.Screen
        name={SCREENS.PAYMENT}
        options={{ title: 'PAYMENT' }}
        component={PaymentScreen}
      />
      <Drawer.Screen name={SCREENS.KAALIXUP} component={KaalixUpNavigator} />
      <Drawer.Screen
        name={SCREENS.KAALIX_SMILES}
        component={KaalixSmilesNavigator}
        options={{ title: DRAWER_ROUTE_NAME.KAALIX_SMILES }}
      />

      <Drawer.Screen
        name={SCREENS.CARD_MANAGER}
        options={{ title: 'CARD_MANAGER' }}
        component={CardManagerScreen}
      />
      <Drawer.Screen
        name={SCREENS.ADD_CARD}
        options={{ title: 'ADD_CARD' }}
        component={AddCardScreen}
      />
      {/* <Drawer.Screen
        name={NAVIGATORS.STORES_LIST}
        options={{ title: DRAWER_ROUTE_NAME.STORES_LIST }}
        component={StoresListNavigator}
      /> */}
      <Drawer.Screen
        name={NAVIGATORS.CUSTOMER_SERVICE}
        options={{ title: DRAWER_ROUTE_NAME.CUSTOMER_SERVICE }}
        component={CustomerServiceNavigator}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
