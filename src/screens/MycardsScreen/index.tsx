/**
 *
 * MycardsScreen
 *
 */

import React, { useEffect, useState } from 'react';
import
{
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import makeSelectMycardsScreen from './selectors';
import reducer from './reducer';
import saga from './saga';
import { makeSelectUserDetailsData } from '../../containers/UserDetails/selectors';
import { getUrlAddCardAction } from '../../containers/CardList/actions';
import { useNavigation } from '@react-navigation/core';
import CardList from '../../containers/CardList';
import { makeSelectPaymentUrl } from '../../containers/CardList/selectors';
import { SCREENS } from '../../navigators/constants';
import { makeSelectPickedAddress } from 'containers/AddressesHandler/selectors';

const stateSelector = createStructuredSelector( {
  mycardsScreen: makeSelectMycardsScreen(),
  userDetails: makeSelectUserDetailsData,
  pickedAddress: makeSelectPickedAddress,
} );

const key = 'mycardsScreen';

export const MycardsScreen: React.FC<IMycardsScreenProps> = ( { } ) =>
{
  useInjectReducer( { key, reducer } );
  useInjectSaga( { key, saga } );

  /* eslint-disable no-unused-vars */
  const {
    mycardsScreen,
    userDetails,
    pickedAddress,
  } = useSelector( stateSelector );
  const dispatch = useDispatch();
  /* eslint-enable no-unused-vars */
  const [ Cards, setCards ] = useState( [] );
  const [ selectedCard, setSelectedCard ] = React.useState( null );

  useEffect( () => { }, [] );

  const navigation = useNavigation();
  /* eslint-enable no-unused-vars */

  const navigateToPaymentScreen = () =>
  {
    if ( pickedAddress && pickedAddress.cityId )
    {
      dispatch(
        getUrlAddCardAction( {
          cityId: pickedAddress.cityId,
          customerId: userDetails.entityId,
          amount: '1',
        } ),
      );
      navigation.navigate( SCREENS.PAYMENT );
    }
  };
  return (
    <ScrollView style={ styles.container }>
      <View
        style={ {
          backgroundColor: '#ffffff',
          marginHorizontal: 20,
          marginVertical: 25,
          padding: 10,
        } }>
        <View style={ { marginVertical: 20 } }>
          <CardList />
        </View>
        <View
          style={ {
            flexDirection: 'row',
            borderTopWidth: 1,
            borderColor: '#0000001A',
          } }>
          <TouchableOpacity
            style={ {
              borderRadius: 15,
              backgroundColor: '#28B873',
              flex: 1,
              marginVertical: 40,
              marginHorizontal: 20,
            } }>
            <Text
              style={ {
                color: 'white',
                textAlign: 'center',
                paddingHorizontal: 40,
                paddingVertical: 10,
                fontSize: 15,
              } }
              onPress={ navigateToPaymentScreen }>
              Ajouter une nouvelle carte
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create( {
  container: {
    flex: 1,
  },
} );

export interface IMycardsScreenProps { }

export default MycardsScreen;
