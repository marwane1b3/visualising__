/**
 *
 * OrderHistoryListContainer
 *
 */

import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import {
  selectButtonsActions,
  selectLoading,
  selectOrdersList,
  selectOrdersListError,
  selectSelectedActionButton,
} from './selectors';
import { requestOrdersAction } from './actions';
import reducer from './reducer';
import saga from './saga';
import theme from 'theme/theme';
import Check from 'react-native-vector-icons/AntDesign';
import Cancel from 'react-native-vector-icons/MaterialCommunityIcons';
import Helper from './Helper';
import { mappingEncourStatus, mappingHistoryStatus } from './constants';
import {
  setOrdersButtonActionsData,
  setSelectedButtonActionData,
} from './actions';
import { getSelectedHistoryFilerData } from 'containers/OrderHistoryFilterContainer/selectors';
import { useNavigation } from '@react-navigation/native';
import { SCREENS } from 'navigators/constants';
import { useIsFocused } from '@react-navigation/native';
import io from 'socket.io-client';
import { makeSelectToken } from 'providers/AuthProvider/selectors';
import RenderComponent from './RenderComponent';
const stateSelector = createStructuredSelector({
  loading: selectLoading(),
  ordersList: selectOrdersList(),
  error: selectOrdersListError(),
  actionButtons: selectButtonsActions(),
  selectedActionButton: selectSelectedActionButton(),
  selectedFilter: getSelectedHistoryFilerData(),
  token: makeSelectToken,
});

const key = 'orderHistoryListContainer';

const OrderHistoryListContainer = (props: any) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const isFocused = useIsFocused();
  const {
    ordersList,
    error,
    loading,
    actionButtons,
    selectedActionButton,
    selectedFilter,
    token,
  } = useSelector(stateSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    isFocused && dispatch(requestOrdersAction());
  }, [selectedFilter, isFocused]);

  const navigation = useNavigation();

  /* eslint-disable no-unused-vars */

  /* eslint-enable no-unused-vars */
  //  useEffect(() => console.log(ordersList), [ordersList]);

  const SwitchPress = (item: any, socketStatus?: string) => {
    if (Object.keys(mappingEncourStatus).includes(item.customerStatus)) {
      navigation.navigate(SCREENS.ORDERSSUIVIENCOURS, {
        orderDetails: item,
        socketStatus,
      });
    } else {
      console.log('Plop ! : ', item);
      navigation.navigate(SCREENS.ORDERHISTORYITEM, {
        orderDetails: item,
      });
    }
  };
  const pickSocketStatus = (socketStatus) => {};

  const url =
    'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80';
  const renderItem = (items: any) => {
    return (
      // <View
      //   style={{
      //     margin: 15,
      //     width: theme.dimensions.width - 50,
      //     height: 150,
      //     borderWidth: 1,
      //     borderRadius: 15,
      //     borderColor:
      //       items.item.customerStatus === 'DELIVERED'
      //         ? theme.palette.default.main
      //         : items.item.customerStatus === 'CANCELLED'
      //         ? theme.palette.default.red
      //         : theme.palette.default.Encours,
      //   }}>
      //   {items.item.customerStatus === 'DELIVERED' && (
      //     <View
      //       style={{
      //         // borderWidth: 1,
      //         borderColor: theme.palette.default.main,
      //         backgroundColor: theme.palette.default.main,
      //         borderTopLeftRadius: 15,
      //         borderBottomRightRadius: 6,
      //         width: 21,
      //         justifyContent: 'center',
      //         alignItems: 'center',
      //         height: 20,
      //       }}>
      //       <Check name={'check'} color={'white'} size={15} />
      //     </View>
      //   )}
      //   {items.item.customerStatus === 'CANCELLED' && (
      //     <View
      //       style={{
      //         // borderWidth: 1,
      //         borderColor: theme.palette.default.red,
      //         backgroundColor: theme.palette.default.red,
      //         borderTopLeftRadius: 15,
      //         borderBottomRightRadius: 6,
      //         width: 21,
      //         justifyContent: 'center',
      //         alignItems: 'center',
      //         height: 20,
      //       }}>
      //       <Cancel name={'cancel'} color={'white'} size={18} />
      //     </View>
      //   )}
      //   {Object.keys(mappingEncourStatus).includes(
      //     items.item.customerStatus,
      //   ) === true && (
      //     <View
      //       style={{
      //         // borderWidth: 1,

      //         width: 21,
      //         justifyContent: 'center',
      //         alignItems: 'center',
      //         height: 20,
      //       }}
      //     />
      //   )}
      //   <TouchableOpacity
      //     onPress={() => {
      //       SwitchPress(items.item);
      //     }}
      //     style={{
      //       flexDirection: 'row',

      //       justifyContent: 'space-around',
      //     }}>
      //     <Image
      //       source={{ uri: url }}
      //       style={{ resizeMode: 'contain', width: 85, height: 85 }}
      //     />
      //     <View style={{ flexDirection: 'column' }}>
      //       <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
      //         {items.item.store.name}
      //       </Text>

      //       <Text
      //         style={{
      //           color: '#999999',
      //           fontSize: 12,
      //         }}>
      //         Commande N° XUHHJ
      //       </Text>
      //       <Text
      //         style={{
      //           color: '#999999',
      //           fontSize: 11,
      //         }}>
      //         {items.item.createdAt.slice(0, 10)}{' '}
      //         {items.item.createdAt.slice(11, 13)}h{' '}
      //         {items.item.createdAt.slice(14, 16)}
      //       </Text>
      //     </View>
      //     <Text>{items.item.payment.total} DH</Text>
      //   </TouchableOpacity>

      //   {items.item.customerStatus === 'DELIVERED' && (
      //     <Helper
      //       index={items.index}
      //       data={actionButtons}
      //       storeDetails={items.item}
      //     />
      //   )}
      //   {Object.keys(mappingEncourStatus).includes(
      //     items.item.customerStatus,
      //   ) === true && (
      //     <View
      //       style={{
      //         //backgroundColor: 'red',
      //         // alignItems: 'flex-end',
      //         // paddingRight: 30,
      //         position: 'absolute',
      //         bottom: 10,
      //         right: 10,
      //       }}>
      //       <Text>{mappingEncourStatus[items.item.customerStatus]}</Text>
      //     </View>
      //   )}
      // </View>

      <RenderComponent
        SwitchPress={SwitchPress}
        actionButtons={actionButtons}
        items={items}
      />
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {!loading && (
        <FlatList
          contentContainerStyle={{
            alignItems: 'center',
          }}
          data={ordersList}
          renderItem={renderItem}
          keyExtractor={(items: any, index) => index.toString()}
        />
      )}
    </View>
  );
};

export default OrderHistoryListContainer;
