import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import theme from 'theme/theme';
import Check from 'react-native-vector-icons/AntDesign';
import Cancel from 'react-native-vector-icons/MaterialCommunityIcons';
import { mappingEncourStatus, mappingHistoryStatus } from './constants';
import Helper from './Helper';
import io from 'socket.io-client';
import { makeSelectToken } from 'providers/AuthProvider/selectors';
import { createStructuredSelector } from 'reselect';
import { useSelector } from 'react-redux';
const stateSelector = createStructuredSelector({
  token: makeSelectToken,
});

interface Props {
  items: any;
  SwitchPress: Function;
  actionButtons: any;
}

const RenderComponent = (props: Props) => {
  const { token } = useSelector(stateSelector);
  const [socketCustomerStatus, setSocketCustomerStatus] = useState('');
  const socket = io(
    'http://k8s-default-ingresss-62388db349-42299485.us-east-2.elb.amazonaws.com',
    {
      path: '/api/v1/sockets/connect',
      query: { token: `Bearer ${token}` },
    },
  );
  // console.log(props.items.item._id);
  const subscribeToOrder = () => {
    const orderId = props.items.item._id;
    socket.emit('JOIN_ROOM', orderId);
  };
  useEffect(() => {
    subscribeToOrder();
    socket.on('ORDER_STATUS_CHANGED', (data: any) => {
      setSocketCustomerStatus(data.customerStatus);
      console.log(data);

      // setCustomerStatusArray((prevState) => [...prevState, customerStatus]);
    });
    return () => {
      socket.disconnect();
      setSocketCustomerStatus('');
    };
  }, []);
  const url =
    'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80';
  return (
    <View
      style={{
        margin: 15,
        width: theme.dimensions.width - 50,
        height: 150,
        borderWidth: 1,
        borderRadius: 15,
        borderColor:
          props.items.item.customerStatus === 'DELIVERED'
            ? theme.palette.default.main
            : props.items.item.customerStatus === 'CANCELLED'
            ? theme.palette.default.red
            : theme.palette.default.Encours,
      }}>
      {props.items.item.customerStatus === 'DELIVERED' && (
        <View
          style={{
            // borderWidth: 1,
            borderColor: theme.palette.default.main,
            backgroundColor: theme.palette.default.main,
            borderTopLeftRadius: 15,
            borderBottomRightRadius: 6,
            width: 21,
            justifyContent: 'center',
            alignItems: 'center',
            height: 20,
          }}>
          <Check name={'check'} color={'white'} size={15} />
        </View>
      )}
      {props.items.item.customerStatus === 'CANCELLED' && (
        <View
          style={{
            // borderWidth: 1,
            borderColor: theme.palette.default.red,
            backgroundColor: theme.palette.default.red,
            borderTopLeftRadius: 15,
            borderBottomRightRadius: 6,
            width: 21,
            justifyContent: 'center',
            alignItems: 'center',
            height: 20,
          }}>
          <Cancel name={'cancel'} color={'white'} size={18} />
        </View>
      )}
      {Object.keys(mappingEncourStatus).includes(
        props.items.item.customerStatus,
      ) === true && (
        <View
          style={{
            // borderWidth: 1,

            width: 21,
            justifyContent: 'center',
            alignItems: 'center',
            height: 20,
          }}
        />
      )}
      <TouchableOpacity
        onPress={() => {
          socketCustomerStatus.length > 0
            ? props.SwitchPress(props.items.item, socketCustomerStatus)
            : props.SwitchPress(props.items.item);
        }}
        style={{
          flexDirection: 'row',

          justifyContent: 'space-around',
        }}>
        <Image
          source={{ uri: url }}
          style={{ resizeMode: 'contain', width: 85, height: 85 }}
        />
        <View style={{ flexDirection: 'column' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
            {props.items.item.store.name}
          </Text>

          <Text
            style={{
              color: '#999999',
              fontSize: 12,
            }}>
            Commande N° XUHHJ
          </Text>
          <Text
            style={{
              color: '#999999',
              fontSize: 11,
            }}>
            {props.items.item.createdAt.slice(0, 10)}{' '}
            {props.items.item.createdAt.slice(11, 13)}h{' '}
            {props.items.item.createdAt.slice(14, 16)}
          </Text>
        </View>
        <Text>{props.items.item.payment.total} DH</Text>
      </TouchableOpacity>

      {props.items.item.customerStatus === 'DELIVERED' && (
        <Helper
          index={props.items.index}
          data={props.actionButtons}
          storeDetails={props.items.item}
        />
      )}
      {Object.keys(mappingEncourStatus).includes(
        props.items.item.customerStatus,
      ) === true && (
        <View
          style={{
            //backgroundColor: 'red',
            // alignprops.items: 'flex-end',
            // paddingRight: 30,
            position: 'absolute',
            bottom: 10,
            right: 10,
          }}>
          {socketCustomerStatus.length > 0 ? (
            <Text>{mappingEncourStatus[socketCustomerStatus]}</Text>
          ) : (
            <Text>{mappingEncourStatus[props.items.item.customerStatus]}</Text>
          )}
        </View>
      )}
    </View>
  );
};

export default RenderComponent;

const styles = StyleSheet.create({});
