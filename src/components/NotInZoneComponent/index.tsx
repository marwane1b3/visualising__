/**
 *
 * NotInZoneComponent
 *
 */

import React, { useRef } from 'react';
import { View, Text, StyleSheet, Animated, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import makeSelectNotInZoneComponent from './selectors';
import reducer from './reducer';
import saga from './saga';
import { FormattedMessage } from 'components/FormattedMessage';
import messages from './messages';
import { WebView } from 'react-native-webview';
import { makeSelectCustomerGPS, makeSelectPickedAddress } from 'containers/AddressesHandler/selectors';
import SplashScreen from 'screens/SplashScreen';
import Logo from '../../../tools/logo/Logo.svg';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CommonActions, useNavigation } from '@react-navigation/core';
import { NAVIGATORS, SCREENS } from 'navigators/constants';
import theme from 'theme/theme';
import { ActionButton } from 'components/ActionButton';
const stateSelector = createStructuredSelector({
  NotInZoneComponent: makeSelectNotInZoneComponent(),
  customerGPS: makeSelectCustomerGPS,
  pickedAddress: makeSelectPickedAddress,
});

const key = 'NotInZoneComponent';

export const NotInZoneComponent: React.FC<INotInZoneComponentProps> = ({
  onPressAddAddress,
}) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  /* eslint-disable no-unused-vars */
  const { NotInZoneComponent, customerGPS, pickedAddress } =
    useSelector(stateSelector);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  /* eslint-enable no-unused-vars */

  return (
    <>
      <TouchableOpacity onPress={onPressAddAddress} style={styles.container}>
        {/* <Text>{JSON.stringify(customerGPS)}</Text> */}
        {/* <Text>{JSON.stringify(pickedAddress)}</Text> */}
        <Text style={styles.message}>
          Oups Vous êtes hors zone de livraison ou votre adresse n'est pas
          configurée
        </Text>
        {/* <TouchableOpacity onPress={onPressAddAddress}> */}
        <Image
          source={require('assets/images/not-in-zone.png')}
          style={{
            alignSelf: 'center',
            // backgroundColor: 'green',
            width: theme.dimensions.width - 20,
            height: theme.dimensions.width - 20,
            resizeMode: 'contain',
          }}></Image>
        {/* </TouchableOpacity> */}
        <ActionButton
          onPress={onPressAddAddress}
          title={'Choisissez une adresse de livraison'}
          textColor={'white'}
        />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#28B873',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
    flex: 1,
  },
  message:{
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: theme.fontSizing.default[3],
    paddingHorizontal: theme.spacing.default[2]
  }
});

export interface INotInZoneComponentProps {
  onPressAddAddress: any
}

export default NotInZoneComponent;
