import HandleOrderDetails from 'containers/OrderSuiviContainer/HandleOrderDetails';
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
import HandlePayments from './HandlePayments';
interface Props {
  route: any;
}

const OrderHistoryItem = (props: Props) => {
  const { orderDetails } = props.route.params;
  return (
    <ScrollView scrollEnabled contentContainerStyle={styles.HistoryItemStyle}>
      <Image
        source={require('assets/images/Shef.png')}
        style={{
          // resizeMode: 'contain',
          width: theme.dimensions.width,
          //  backgroundColor: 'red',
        }}
      />
      <View
        style={{
          margin: 15,
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: theme.palette.default.main,
            fontSize: 19,
            textAlign: 'center',
          }}>
          {orderDetails.store.name}
        </Text>
        <Text
          style={{
            fontSize: 12,
            textAlign: 'center',
            marginTop: 4,
          }}>
          {orderDetails.payment.pickupAddress.address}
        </Text>
      </View>
      <HandlePayments orderDetails={orderDetails} />
      <HandleOrderDetails orderDetails={orderDetails} />
    </ScrollView>
  );
};

export default OrderHistoryItem;

const styles = StyleSheet.create({
  HistoryItemStyle: {
    flexGrow: 1,
    backgroundColor: theme.palette.default.light,
  },
});
