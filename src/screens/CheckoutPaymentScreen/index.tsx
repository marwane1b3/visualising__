/**
 *
 * CheckoutPaymentScreen
 *
 */

import React, { useEffect } from 'react';
import { View, StyleSheet, Button, Linking, Text, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import makeSelectCheckoutPaymentScreen from './selectors';
import reducer from './reducer';
import saga from './saga';
import WebView, { WebViewProps } from 'react-native-webview';
import { useNavigation, CommonActions } from '@react-navigation/core';
import { useState } from 'react';
import { cleanUpCheckoutStateAction, createOrderAction } from 'screens/CheckoutScreen/actions';
import { makeSelectcleanUpAndGobackToHome, makeSelectPaymentDetailScreen } from 'screens/CheckoutScreen/selectors';
import { makeSelectUserDetailsData } from 'containers/UserDetails/selectors';
import { makeSelectPickedAddress } from 'containers/AddressesHandler/selectors';
import { NAVIGATORS } from 'navigators/constants';

const stateSelector = createStructuredSelector({
  checkoutPaymentScreen: makeSelectCheckoutPaymentScreen(),
  paymentDetail: makeSelectPaymentDetailScreen,
  userDetails: makeSelectUserDetailsData,
  pickedAddress: makeSelectPickedAddress,
  cleanUpAndGobackToHome: makeSelectcleanUpAndGobackToHome,
});

const key = 'checkoutPaymentScreen';

const NAVIGATION_STATUS = {
  INITIAL: 0,
  SHOULD_NAVIGATE: 1,
  STOP_NAVIGATION: 2
}

export const CheckoutPaymentScreen: React.FC<ICheckoutPaymentScreenProps> = ({ route }) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  /* eslint-disable no-unused-vars */
  const { paymentDetail, userDetails, pickedAddress, cleanUpAndGobackToHome } =
    useSelector(stateSelector);
  // const [navigationStatus, setNavigationStatus] = useState(NAVIGATION_STATUS.INITIAL);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  /* eslint-enable no-unused-vars */
  // useEffect(() => {
  //   if (navigationStatus == NAVIGATION_STATUS.SHOULD_NAVIGATE) {
  //     setNavigationStatus(NAVIGATION_STATUS.STOP_NAVIGATION);
  //     navigation.goBack();
  //   }
  // }, [navigationStatus]);
  useEffect(() => {
    console.log({ cleanUpAndGobackToHome });
    if (cleanUpAndGobackToHome) {
      dispatch(cleanUpCheckoutStateAction());
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: NAVIGATORS.MAIN_STACK }],
        }),
      );
    }
  }, [cleanUpAndGobackToHome]);
const createOrder = () => {
  dispatch(
    createOrderAction({
      payment: {
        _id: paymentDetail._id,
        status: paymentDetail.status,
        paymentGateway: paymentDetail.paymentGateway,
      },
      store: {
        name: 'store1',
        location: [3, 4],
        _id: '60bf0cb8c534734c44909e2a',
      },
      customer: {
        name: userDetails.username,
        _id: userDetails.entityId,
        email: userDetails.email || '',
        phone: userDetails.phone || '066666666666',
      },
      city: { name: pickedAddress.cityName, _id: pickedAddress.cityId },
      status: 'Running',
    }),
  );
}; 
  return (
    <View style={styles.container}>
      <WebView
        source={{
          uri: route.params.paymentUrl,
        }}
        onNavigationStateChange={(state) => {
          let success = state.url.includes('/success');
          if (success) {
            createOrder();
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export interface ICheckoutPaymentScreenProps {
  route: any
}

export default CheckoutPaymentScreen;
