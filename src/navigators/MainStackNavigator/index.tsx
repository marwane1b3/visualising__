import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Platform,
} from 'react-native';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';
import { iOSStyleStackNavigatorOptions } from 'navigators/configs';
import { NAVIGATORS, SCREENS } from 'navigators/constants';

import HomeScreen from 'screens/HomeScreen';
import HamburgerMenu from 'components/HamburgerMenu';
import ServicesScreen from 'screens/ServicesScreen';
import StoresListScreen from 'screens/StoresListScreen';
import MultiFilterScreen from 'screens/MultiFiltersScreen';
import ChoubikScreen from 'screens/ChoubikScreen';
import { AddressNavigator } from 'navigators/MainStackNavigator/AddressNavigator';
import { KaalixPayNavigator } from 'navigators/MainStackNavigator/KaalixPayNavigator';
import { ReferralNavigator } from 'navigators/MainStackNavigator/ReferralNavigator';
import { RewardsNavigator } from 'navigators/MainStackNavigator/RewardsNavigator';
import SearchBar from 'components/SearchBar';
import { colors } from 'theme/colors';
import HomeHeaderComponent from 'components/HomeHeaderComponent';

import theme from 'theme/theme';
import { enableScreens } from 'react-native-screens';

import Caret from '../../../tools/logo/Icon awesome-caret-down.svg';
import ExpressScreen from 'screens/ExpressScreen';
import MycardsScreen from '../../screens/MycardsScreen';
import ItemsListScreen from 'screens/ItemsListScreen';
import PaymentScreen from '../../screens/PaymentScreen';
import CheckoutScreen from 'screens/CheckoutScreen';
import CheckoutPaymentScreen from 'screens/CheckoutPaymentScreen';
import { HistoriesNavigator } from './HistoriesNavigator';
import { WinPointsNavigator } from './WinPointsNavigator';
import ShoppingCardScreen from 'screens/ShoppingCardScreen';
import ItemSpecificationsScreen from 'screens/ItemSpecificationsScreen';
import ProductsListScreen from 'screens/ProductsListScreen';
import ProductsCategoriesScreen from 'screens/ProductsCategoriesScreen';
import AccompanimentListScreen from 'screens/AccompanimentListScreen';
import RatingScreen from 'screens/RatingScreen';
import PourboirScreen from 'screens/PourboirScreen';
import OrdersHistoryScreen from 'screens/OrdersHistoryScreen';

enableScreens();
const Stack = createStackNavigator();

const MainStackNavigator: React.FC<IMainStackNavigatorProps> = ({}) => {
  return (
    <Stack.Navigator
      screenOptions={{ ...iOSStyleStackNavigatorOptions }}
      initialRouteName={SCREENS.HOME}>
      <Stack.Screen
        name={SCREENS.HOME}
        component={HomeScreen}
        options={(props: any) => ({
          headerStyle: {
            backgroundColor: theme.palette.default.main,
            // borderBottomColor: theme.palette.default.main,
            // borderBottomWidth: 1,
            elevation: 0,
          },
          headerForceInset: { top: 'never', bottom: 'never' },
          headerTitle: () => <HomeHeaderComponent />,

          headerLeft: () => (
            <View style={{ marginLeft: 15 }}>
              <HamburgerMenu navigation={props.navigation} />
            </View>
          ),
        })}
      />

      <Stack.Screen
        name={SCREENS.SERVICES}
        component={ServicesScreen}
        options={(props: any) => ({
          //title:
          //headerTitleAlign: 'center',
          headerTitle: () => (
            <View>
              <SearchBar />
            </View>
          ),
          headerTintColor: theme.palette.default.light,
          headerStyle: {
            backgroundColor: theme.palette.default.main,
            height: 100,
          },
        })}
      />
      <Stack.Screen
        name={SCREENS.STORES_LIST}
        component={StoresListScreen}
        options={(props: any) => ({
          headerTitle: () => (
            <View>
              <SearchBar />
            </View>
          ),
          headerTintColor: '#FFFFFF',

          headerStyle: {
            height: 90,
            backgroundColor: theme.palette.default.main,
          },
        })}
      />
      <Stack.Screen
        name={SCREENS.HISORY}
        component={HistoriesNavigator}
        options={() => ({
          headerStyle: {
            elevation: 0,
          },
          headerTitle: () => (
            <Text
              style={{
                color: theme.palette.default.dark,
                fontSize: 20,
                fontWeight: 'bold',
                marginLeft: -9,
              }}>
              Historique de Kaalix'Up
            </Text>
          ),
          headerTintColor: theme.palette.default.main,
        })}
      />

      <Stack.Screen
        name={SCREENS.WINPOINTS}
        component={WinPointsNavigator}
        options={{ headerShown: false }}
        // options={ () => ( {
        //   headerStyle: {
        //     backgroundColor: 'transparent',

        //   },
        //   headerTitle: () => (
        //     <Text
        //       style={ {
        //         color: "#2F423C",
        //         fontSize: 22,
        //         fontWeight: 'bold',
        //         marginLeft: -16
        //       } }>
        //       Comment gagner des points
        //     </Text>
        //   ),
        //   headerTransparent: {
        //     position: 'absolute',
        //     backgroundColor: 'transparent',
        //     zIndex: 100,
        //     top: 0,
        //     left: 0,
        //     right: 0
        //   },
        //   headerTintColor: theme.palette.default.main,
        //   // headerLeft: () => (
        //   //   <TouchableOpacity >
        //   //     <Icon
        //   //       style={ { padding: 18, paddingRight: 10 } }
        //   //       name="arrow-left"
        //   //       size={ 20 }
        //   //       color="#28B873"
        //   //     />
        //   //   </TouchableOpacity>
        //   // )
        // } ) }
      />

      <Stack.Screen
        name={SCREENS.CHECKOUT}
        component={CheckoutScreen}
        options={() => ({
          headerStyle: {
            elevation: 0,
          },
          gestureEnabled: false,
          headerTitle: () => (
            <Text
              style={{
                color: theme.palette.default.dark,
                fontSize: 20,
                fontWeight: 'bold',
              }}>
              CheckoutScreen
            </Text>
          ),
          headerTintColor: theme.palette.default.main,
        })}
      />

      <Stack.Screen
        name={SCREENS.MULTI_FILTERS_SCREEN}
        options={(props: any) => ({
          title: '',
          headerLeft: () => null,
        })}
        component={MultiFilterScreen}
      />
      {/* <Stack.Screen
        name={SCREENS.MULTI_FILTERS_SCREEN}
        options={(props: any) => ({
          title: '',
          headerLeft: () => null,
        })}
        component={MultiFilterScreen}
      /> */}
      <Stack.Screen
        name={SCREENS.Choubik}
        options={() => ({
          headerStyle: {
            elevation: 0,
          },
          headerTitle: () => (
            <Text
              style={{
                color: theme.palette.default.dark,
                fontSize: 20,
                fontWeight: 'bold',
              }}>
              CHOUBIK LOUBIK
            </Text>
          ),
          headerTintColor: theme.palette.default.main,
        })}
        component={ChoubikScreen}
      />
      <Stack.Screen
        name={SCREENS.MY_CARDS}
        options={() => ({
          headerStyle: {
            elevation: 0,
          },
          headerTitle: () => (
            <Text
              style={{
                color: theme.palette.default.dark,
                fontSize: 20,
                fontWeight: 'bold',
              }}>
              Mes cartes
            </Text>
          ),
          headerTintColor: theme.palette.default.main,
        })}
        component={MycardsScreen}
      />

      <Stack.Screen
        name={SCREENS.CHECKOUT_PAYMENT}
        options={() => ({
          headerStyle: {
            elevation: 0,
          },
          headerTitle: () => (
            <Text
              style={{
                color: theme.palette.default.dark,
                fontSize: 20,
                fontWeight: 'bold',
              }}>
              Payment
            </Text>
          ),
          headerTintColor: theme.palette.default.main,
        })}
        component={CheckoutPaymentScreen}
      />
      <Stack.Screen
        name={SCREENS.PAYMENT}
        options={() => ({
          headerStyle: {
            elevation: 0,
          },
          headerTitle: () => (
            <Text
              style={{
                color: theme.palette.default.dark,
                fontSize: 20,
                fontWeight: 'bold',
              }}>
              add card
            </Text>
          ),
          headerTintColor: theme.palette.default.main,
        })}
        component={PaymentScreen}
      />
      <Stack.Screen name={NAVIGATORS.REFERRAL} component={ReferralNavigator} />
      <Stack.Screen
        name={NAVIGATORS.KAALIX_PAY}
        component={KaalixPayNavigator}
      />
      <Stack.Screen
        name={SCREENS.EXPRESS}
        options={() => ({
          headerStyle: {
            elevation: 0,
          },
          headerTitle: () => (
            <Text
              style={{
                color: theme.palette.default.dark,
                fontSize: 20,
                fontWeight: 'bold',
              }}>
              Service Express
            </Text>
          ),
          headerTintColor: theme.palette.default.main,
        })}
        component={ExpressScreen}
      />
      <Stack.Screen name={NAVIGATORS.REWARDS} component={RewardsNavigator} />

      <Stack.Screen
        name={SCREENS.PRODUCTS_CATEGORIES}
        component={ProductsCategoriesScreen}
      />
      <Stack.Screen
        name={SCREENS.PRODUCTS_LIST}
        component={ProductsListScreen}
      />
      <Stack.Screen name={SCREENS.ITEMS_LIST} component={ItemsListScreen} />
      <Stack.Screen
        name={SCREENS.ITEM_SPECIFICATIONS}
        component={ItemSpecificationsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={SCREENS.SHOPPING_CARD}
        // // options={() => ({
        // //   // headerTitle: '',
        // //   // headerStyle: {
        // //   //   elevation: 0,

        // //   // },
        // //   headerShown: false,
        // // })}

        component={ShoppingCardScreen}
      />
      <Stack.Screen
        name={SCREENS.ACCOMPANIMENT_LIST}
        component={AccompanimentListScreen}
      />
      {/* <Stack.Screen name={SCREENS.CHECKOUT} component={CheckoutScreen} /> */}
      <Stack.Screen
        name={NAVIGATORS.ADDRESS}
        component={AddressNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export type IMainStackNavigatorProps = {};
export { MainStackNavigator };

/**
 *
 *
 *
 */
