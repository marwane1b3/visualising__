/**
 *
 * PaymentScreen
 *
 */

import React, { useEffect } from 'react';
import { View, StyleSheet, Button, Linking, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import makeSelectPaymentScreen from './selectors';
import reducer from './reducer';
import saga from './saga';
import WebView, { WebViewProps } from 'react-native-webview';
import { makeSelectPaymentUrl } from '../../containers/CardList/selectors';
import { useNavigation } from '@react-navigation/core';

const stateSelector = createStructuredSelector({
  paymentScreen: makeSelectPaymentScreen(),
  paymentUrl: makeSelectPaymentUrl,
});

const key = 'paymentScreen';

export const PaymentScreen: React.FC<IPaymentScreenProps> = ({}) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  /* eslint-disable no-unused-vars */
  const { paymentScreen, paymentUrl } = useSelector(stateSelector);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  /* eslint-enable no-unused-vars */
  useEffect(() => {
    console.log('*****', paymentUrl);
  }, [paymentUrl]);

  return (
    <View style={styles.container}>
      <WebView
        source={{
          uri: paymentUrl,
        }}
        onNavigationStateChange={(state) => {
          let success = state.url.includes('success');
          console.log('onNavigationStateChange', success);
          if (success){
            navigation.goBack();
            success = !success;
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

export interface IPaymentScreenProps {}

export default PaymentScreen;
