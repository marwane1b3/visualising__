import React, { useEffect, useState } from 'react';

import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import theme from 'theme/theme';
import Wallet from '../../../assets/icons/wallet.svg';
import DeliveryTimeContainer from 'containers/DeliveryTimeContainer';

import { useSelector, useDispatch } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { createStructuredSelector } from 'reselect';
import reducer, { initialState } from './reducer';
import saga from './saga';
import { selectedTimeOption } from './constants';
import {
  DeliveryTimeOptionsSelector,
  DateSelector,
  modalSelector,
} from './selectors';
import {
  setTimeDeliveryOption,
  requestTimeDeliveryOptionAction,
  getDateAction,
  getModalShowAction,
} from './actions';

const key = 'ChoubikContainerDetail';
interface Props {}

const stateSelector = createStructuredSelector({
  selectedDeliveryTime: DeliveryTimeOptionsSelector(),
  selectedDate: DateSelector(),
  modalVisible: modalSelector(),
});
const ChoubikContainerDetail = (props: Props) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(requestTimeDeliveryOptionAction());
  }, []);
  const { selectedDeliveryTime, selectedDate, modalVisible } = useSelector(
    stateSelector,
  );

  return (
    <>
      <View style={styles.ChoubikContainerDetailStyle}>
        <DeliveryTimeContainer
          selectedDate={selectedDate}
          selectedDeliveryTimeOption={selectedDeliveryTime}
          setTimeDeliveryOption={setTimeDeliveryOption}
          getDateAction={getDateAction}
        />

        <Text style={styles.ChoubikContainerDetailDeliveryTimeTitleStyle}>
          Moyen de paiement
        </Text>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            //justifyContent: 'space-between',

            height: 60,
            //  borderWidth: 1,
            alignItems: 'center',
          }}
          onPress={() => console.log('plop')}>
          <Wallet width={38} height={38} />
          <Text
            style={{
              marginLeft: 15,
            }}>
            Choisir un moyen de paiement
          </Text>
        </TouchableOpacity>
        <Text style={styles.ChoubikContainerDetailDeliveryTimeTitleStyle}>
          Détail du Paiement
        </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.ChoubikSimpleTextStyle}>Total :</Text>
          <Text style={styles.ChoubikSimpleTextStyle}>100 DH</Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 25,
          }}>
          <TouchableOpacity style={styles.ConfirmButton}>
            <Text style={styles.ConfirmButtonTitle}>Confirmer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default ChoubikContainerDetail;

const styles = StyleSheet.create({
  ChoubikContainerDetailStyle: {
    flex: 1,
    backgroundColor: theme.palette.default.light,
    margin: 16,
  },
  ChoubikContainerDetailDeliveryTimeStyle: {
    // borderWidth: 1,
  },
  ChoubikContainerDetailDeliveryTimeTitleStyle: {
    fontSize: 23,
    paddingBottom: 10,
  },
  ChoubikSimpleTextStyle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  ConfirmButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: theme.palette.default.main,
    alignItems: 'center',
    marginVertical: 17,
    width: '80%',
  },
  ConfirmButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
});

/*********
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */
