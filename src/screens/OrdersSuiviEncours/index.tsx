import React from 'react';
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
import OrderSuiviContainer from 'containers/OrderSuiviContainer';
interface Props {
  route: any;
}

const OrdersSuiviEncours = (props: Props) => {
  const { orderDetails, socketStatus } = props.route.params;
  console.log(
    'orderDetailsorderDetailsorderDetails:',
    JSON.stringify(orderDetails.payment.cartDetails),
  );

  return (
    <>
      {socketStatus ? (
        <OrderSuiviContainer
          orderDetails={orderDetails}
          socketStatus={socketStatus}
        />
      ) : (
        <OrderSuiviContainer orderDetails={orderDetails} />
      )}
    </>
  );
};

export default OrdersSuiviEncours;

const styles = StyleSheet.create({
  SuiviScreenStyle: {
    flexGrow: 1,
    backgroundColor: theme.palette.default.light,
  },
});
