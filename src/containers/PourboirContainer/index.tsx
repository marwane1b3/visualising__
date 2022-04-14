/**
 *
 * PourboirContainer
 *
 */

import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { View, Text, TouchableOpacity } from 'react-native';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import makeSelectPourboirContainer, {
  makeSelectKaalixLoyaltyMsg,
  makeSelectKaalixPoints,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import theme from 'theme/theme';
import Wallet from '../../../assets/icons/wallet.svg';
import Visa from '../../../assets/icons/VISA.svg';
import {
  setTipAction,
  checkKaalixLoyatyAction,
  getCardListAction,
} from './actions';
const stateSelector = createStructuredSelector({
  pourboirContainer: makeSelectPourboirContainer(),
  kaalixLoyaltyPoints: makeSelectKaalixPoints(),
  kaalixLoyaltyResponse: makeSelectKaalixLoyaltyMsg(),
});

const key = 'pourboirContainer';
interface Props {
  donation: any;
  customerId: any;
  deliveryManId: string;
}
const PourboirContainer = (props: Props) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const money = +props.donation.slice(0, 2);
  // console.log(money);
  // console.log(props.deliveryManId);
  const dispatch = useDispatch();
  const { pourboirContainer, kaalixLoyaltyPoints, kaalixLoyaltyResponse } =
    useSelector(stateSelector);
  useEffect(() => {
    dispatch(checkKaalixLoyatyAction(money));
    dispatch(getCardListAction());
  }, []);
  /* eslint-disable no-unused-vars */

  /* eslint-enable no-unused-vars */
  const [options, setOptions] = useState([
    { id: 0, isSelect: false },
    { id: 1, isSelect: false },
  ]);
  useEffect(() => {
    if (kaalixLoyaltyResponse === 1) {
      setOptions((prevState) => [
        { id: prevState[0].id, isSelect: false },
        { id: prevState[1].id, isSelect: true },
      ]);
    } else {
      setOptions((prevState) => [
        { id: prevState[0].id, isSelect: true },
        { id: prevState[1].id, isSelect: false },
      ]);
    }
  }, [kaalixLoyaltyResponse]);

  const kaalixPayHandle = () => {
    let body = {
      deliveryManId: props.deliveryManId
        ? props.deliveryManId
        : '60eb76bc1f933a00220fae9c',
      points: money,
    };

    dispatch(setTipAction(body));
  };

  return (
    <View
      style={{
        width: '100%',
        height: 250,
        backgroundColor: theme.palette.default.light,
      }}>
      <View>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 20,
            textAlign: 'center',
          }}>
          Méthode de paiement
        </Text>
      </View>
      {props.donation.length > 0 && (
        <Text
          style={{
            marginTop: 20,
            textAlign: 'center',
          }}>
          Donation selectioner : {props.donation}
        </Text>
      )}
      <TouchableOpacity
        style={{
          marginTop: 35,
          marginHorizontal: 25,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
        onPress={() => {
          setOptions((prevState: any) => {
            if (prevState[1].isSelect) {
              return [
                { id: prevState[0].id, isSelect: !prevState[0].isSelect },
                { id: prevState[1].id, isSelect: !prevState[1].isSelect },
              ];
            } else {
              return [
                { id: prevState[0].id, isSelect: !prevState[0].isSelect },
                { id: prevState[1].id, isSelect: prevState[1].isSelect },
              ];
            }
          });
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Visa width={38} height={38} />
          <Text
            style={{
              marginLeft: 5,
              color: options[0].isSelect
                ? theme.palette.default.main
                : theme.palette.default.dark,
            }}>
            Carte
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: options[0].isSelect
                ? theme.palette.default.main
                : theme.palette.default.dark,
            }}>
            Carte Visa **** 2345
          </Text>
        </View>
      </TouchableOpacity>
      {kaalixLoyaltyResponse === 1 && (
        <TouchableOpacity
          style={{
            marginTop: 15,
            marginHorizontal: 25,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
          onPress={() => {
            setOptions((prevState) => {
              if (prevState[0].isSelect) {
                return [
                  { id: prevState[0].id, isSelect: !prevState[0].isSelect },
                  { id: prevState[1].id, isSelect: !prevState[1].isSelect },
                ];
              } else {
                return [
                  { id: prevState[0].id, isSelect: prevState[0].isSelect },
                  { id: prevState[1].id, isSelect: !prevState[1].isSelect },
                ];
              }
            });
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Wallet width={38} height={38} />
            <Text
              style={{
                marginLeft: 5,
                color: options[1].isSelect
                  ? theme.palette.default.main
                  : theme.palette.default.dark,
              }}>
              KaalixPay
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: options[1].isSelect
                  ? theme.palette.default.main
                  : theme.palette.default.dark,
              }}>
              Solde {kaalixLoyaltyPoints} dh
            </Text>
          </View>
        </TouchableOpacity>
      )}
      {kaalixLoyaltyResponse === 1 && (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity
            style={{
              margin: 5,
              elevation: 1,
              paddingVertical: 11,
              paddingHorizontal: 15,
              borderWidth: 0.5,
              borderColor: theme.palette.default.main,
              borderRadius: 45 / 2,
              backgroundColor: theme.palette.default.main,
              //flexDirection: 'row',
              //alignItems: 'center',
              // justifyContent: 'space-between',
              width: 150,
            }}
            onPress={kaalixPayHandle}>
            <Text
              style={{
                color: theme.palette.default.light,
                textAlign: 'center',
              }}>
              Payer
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default PourboirContainer;
