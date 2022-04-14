/**
 *
 * OrderSuiviContainer
 *
 */

import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
} from 'react-native';
import theme from 'theme/theme';
import {
  mappingHistoryStatus,
  mappingEncourStatus,
} from 'containers/OrderHistoryListContainer/constants';
import WaitingSvg from '../../../assets/icons/Acceptation.svg';
import Acceptee from '../../../assets/icons/Acceptee.svg';
import Destination from '../../../assets/icons/Destination.svg';
import Preparation from '../../../assets/icons/Preparation.svg';
import Phone from '../../../assets/icons/Phone.svg';
import EnRoute from '../../../assets/icons/EnRoute.svg';
import { customerStatusData } from './constants';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import makeSelectOrderSuiviContainer from './selectors';
import reducer from './reducer';
import saga from './saga';
import HandleOrderDetails from './HandleOrderDetails';
import PaymentDetails from './PaymentDetails';
import { sliceText } from './TextSlicer';
import MapHandler from './MapHandler';
import io from 'socket.io-client';
import { makeSelectToken } from 'providers/AuthProvider/selectors';
import { useNavigation } from '@react-navigation/native';
const stateSelector = createStructuredSelector({
  orderSuiviContainer: makeSelectOrderSuiviContainer(),
  token: makeSelectToken,
});

const key = 'orderSuiviContainer';
export interface Iprops {
  orderDetails: any;
  socketStatus?: any;
}
const OrderSuiviContainer = (props: Iprops) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  /* eslint-disable no-unused-vars */
  const { orderSuiviContainer, token } = useSelector(stateSelector);
  const dispatch = useDispatch();
  const [customerStatus, setCustomerStatus] = useState('');
  const [customerStatusArray, setCustomerStatusArray] = useState(['']);
  /* eslint-enable no-unused-vars */
  console.log('OrderId : ', props.orderDetails._id);
  // console.log(
  //   'DeliveryGuyLocation : ',
  //   JSON.stringify(props?.orderDetails?.deliveryMan[0]?.location),
  // );
  const navigation = useNavigation();
  const socket = io(
    'http://k8s-default-ingresss-62388db349-42299485.us-east-2.elb.amazonaws.com',
    {
      path: '/api/v1/sockets/connect',
      query: { token: `Bearer ${token}` },
    },
  );

  const fillCustomerStatusrray = () => {
    const presentStatus = props.socketStatus
      ? props.socketStatus
      : props.orderDetails?.customerStatus;
    console.log(presentStatus);
    switch (presentStatus) {
      case Object.keys(mappingEncourStatus)[0]:
        setCustomerStatusArray([presentStatus]);
        break;
      case Object.keys(mappingEncourStatus)[1]:
        setCustomerStatusArray([
          Object.keys(mappingEncourStatus)[0],
          presentStatus,
        ]);

        break;
      case Object.keys(mappingEncourStatus)[2]:
        setCustomerStatusArray([
          Object.keys(mappingEncourStatus)[0],
          Object.keys(mappingEncourStatus)[1],
          presentStatus,
        ]);

        break;
      case Object.keys(mappingEncourStatus)[3]:
        setCustomerStatusArray([
          Object.keys(mappingEncourStatus)[0],
          Object.keys(mappingEncourStatus)[1],
          Object.keys(mappingEncourStatus)[2],
          presentStatus,
        ]);

        break;
      case Object.keys(mappingEncourStatus)[4]:
        setCustomerStatusArray([
          Object.keys(mappingEncourStatus)[0],
          Object.keys(mappingEncourStatus)[1],
          Object.keys(mappingEncourStatus)[2],
          Object.keys(mappingEncourStatus)[3],
          presentStatus,
        ]);

        break;
    }
  };

  const subscribeToOrder = () => {
    const orderId = props.orderDetails._id;
    socket.emit('JOIN_ROOM', orderId);
  };
  useEffect(() => {
    subscribeToOrder();
  }, []);
  useEffect(() => {
    socket.on('ORDER_STATUS_CHANGED', (data: any) => {
      setCustomerStatus(data.customerStatus);
      console.log(data);

      setCustomerStatusArray((prevState) => [...prevState, customerStatus]);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    fillCustomerStatusrray();

    return () => {
      setCustomerStatusArray(['']);
    };
  }, []);
  // console.log('OrderDetails:', customerStatus);

  useEffect(() => {
    if (customerStatusArray.length === 6) {
      setTimeout(() => {
        navigation.goBack();
      }, 4000);
    }
  }, [customerStatusArray]);

  const changeSvgStatus = (arr: string[]) => {
    return arr.length;
  };

  const svgData = [
    <WaitingSvg
      width={38}
      height={38}
      fill={
        changeSvgStatus(customerStatusArray) >= 1
          ? theme.palette.default.main
          : theme.palette.default.inactive
      }
    />,
    <Acceptee
      width={38}
      height={38}
      fill={
        changeSvgStatus(customerStatusArray) >= 2
          ? theme.palette.default.main
          : theme.palette.default.inactive
      }
    />,
    <Preparation
      width={38}
      height={38}
      fill={
        changeSvgStatus(customerStatusArray) >= 3
          ? theme.palette.default.main
          : theme.palette.default.inactive
      }
    />,
    <EnRoute
      width={38}
      height={38}
      fill={
        changeSvgStatus(customerStatusArray) >= 4
          ? theme.palette.default.main
          : theme.palette.default.inactive
      }
    />,

    <Destination
      width={38}
      height={38}
      fill={
        changeSvgStatus(customerStatusArray) === 5
          ? theme.palette.default.main
          : theme.palette.default.inactive
      }
    />,
  ];

  const renderCustomerStatus = (items: any) => {
    return (
      <View>
        {Object.keys(items.item.keyValue).map((item: any, index: number) => (
          <View key={index}>{sliceText(mappingEncourStatus[item])}</View>
        ))}
      </View>
    );
  };

  return (
    <>
      <ScrollView scrollEnabled contentContainerStyle={styles.SuiviScreenStyle}>
        {customerStatusArray.length === 4 ||
        customerStatusArray.length === 5 ? (
          <MapHandler
            destinationLocation={
              props.orderDetails.payment.destinationAddress.location
            }
          />
        ) : (
          <Image
            source={require('assets/images/Shef.png')}
            style={{
              // resizeMode: 'contain',
              width: theme.dimensions.width,
              //  backgroundColor: 'red',
            }}
          />
        )}
        <View
          style={{
            height: 15,
            flex: 1,
          }}
        />
        <FlatList
          data={svgData}
          renderItem={(items: any) => (
            <View
              style={
                {
                  //  backgroundColor: 'yellow',
                }
              }>
              {items.item}
              <View
                style={{
                  height: 5,
                  flex: 1,
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    backgroundColor:
                      changeSvgStatus(customerStatusArray) >= items.index + 1
                        ? theme.palette.default.main
                        : theme.palette.default.inactive,
                    height: 15,
                    marginHorizontal: 15,
                    width: 15,
                    borderRadius: 7.5,
                    // flexDirection: 'row',
                    alignItems: 'center',
                  }}
                />
                {items.index <= 4 && (
                  <View
                    style={{
                      height: 5,
                      //  borderWidth: 1,
                      position: 'absolute',
                      right: 5,

                      width: 100,
                      backgroundColor:
                        changeSvgStatus(customerStatusArray) >= items.index + 1
                          ? theme.palette.default.main
                          : theme.palette.default.inactive,
                    }}
                  />
                )}
              </View>
            </View>
          )}
          horizontal
          keyExtractor={(items, index: number) => `__ID_${index.toString()}`}
          contentContainerStyle={{
            justifyContent: 'space-between',
            marginLeft: 10,
            flex: 1,
          }}
        />
        <FlatList
          data={customerStatusData}
          renderItem={renderCustomerStatus}
          horizontal
          contentContainerStyle={{
            justifyContent: 'space-between',
            marginLeft: 10,
            flex: 1,
          }}
        />
        <View
          style={{
            height: 15,
            flex: 1,
          }}
        />

        <View>
          <Text
            style={{
              fontSize: 27,
              textAlign: 'center',
            }}>
            00:30:00
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            //  paddingHorizontal: 55,
            //alignItems: 'center',
            //   backgroundColor: 'red',
          }}>
          <View
            style={{
              margin: 15,
              alignItems: 'center',
            }}>
            <Phone width={60} height={60} />
            <Text>Mourad Sabir</Text>
          </View>
          <View
            style={{
              margin: 15,
              alignItems: 'center',
            }}>
            <Phone width={60} height={60} />
            <Text>Service client</Text>
          </View>
        </View>
        <View>
          <Text
            style={{
              color: theme.palette.default.main,
              fontSize: 19,
              textAlign: 'center',
            }}>
            {props.orderDetails.store.name}
          </Text>
          <Text
            style={{
              fontSize: 12,
              textAlign: 'center',
              marginTop: 4,
            }}>
            {props.orderDetails.payment.pickupAddress.address}
          </Text>
        </View>
        <PaymentDetails orderDetails={props.orderDetails} />
        <HandleOrderDetails orderDetails={props.orderDetails} />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  SuiviScreenStyle: {
    flexGrow: 1,
    backgroundColor: theme.palette.default.light,
  },
});

export default OrderSuiviContainer;
