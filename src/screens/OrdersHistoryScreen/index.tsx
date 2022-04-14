/**
 *
 * OrdersHistoryScreen
 *
 */

import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import makeSelectOrdersHistoryScreen from './selectors';
import reducer from './reducer';
import saga from './saga';
import { FormattedMessage } from 'components/FormattedMessage';
import messages from './messages';
import theme from 'theme/theme';
import HamburgerMenu from 'components/HamburgerMenu';
import OrderHistoryFilterContainer from 'containers/OrderHistoryFilterContainer';
import OrderHistoryListContainer from 'containers/OrderHistoryListContainer';
const stateSelector = createStructuredSelector({
  ordersHistoryScreen: makeSelectOrdersHistoryScreen(),
});

const key = 'ordersHistoryScreen';

export interface IOrdersHistoryScreenProps {}

export const OrdersHistoryScreen: React.FC<IOrdersHistoryScreenProps> = (
  props: any,
) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  /* eslint-disable no-unused-vars */
  const { ordersHistoryScreen } = useSelector(stateSelector);
  const dispatch = useDispatch();
  /* eslint-enable no-unused-vars */

  const OrderHeader = () => (
    <View style={styles.orderScreenHeaderStyles}>
      <HamburgerMenu navigation={props.navigation} />
      <Text style={styles.orderScreenHeaderTitleStyles}>Mes commandes</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <OrderHeader />
      <OrderHistoryFilterContainer />
      <OrderHistoryListContainer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.palette.default.light,
  },
  orderScreenHeaderStyles: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    paddingTop: 15,
    justifyContent: 'flex-start',
    width: '100%',
    height: 90,
    backgroundColor: theme.palette.default.main,
  },
  orderScreenHeaderTitleStyles: {
    fontSize: 18,
    color: theme.palette.default.light,
  },
});

export default OrdersHistoryScreen;
