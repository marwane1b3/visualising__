import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import theme from 'theme/theme';
import Cash from '../../../assets/icons/Cash.svg';
interface Props {
  orderDetails: any;
}

const HandlePayments = (props: Props) => {
  return (
    <View
      style={{
        marginTop: 50,
      }}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          marginLeft: 16,
        }}>
        Détail du Paiement
      </Text>
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: 15,
          marginVertical: 5,
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            fontSize: 15,
          }}>
          {props.orderDetails.store.name} :
        </Text>
        <Text
          style={{
            fontSize: 15,
          }}>
          {props.orderDetails.payment.orderPrice} DH
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: 16,
          marginVertical: 5,
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            fontSize: 15,
          }}>
          Frais de livraison :
        </Text>
        <Text
          style={{
            fontSize: 15,
          }}>
          {props.orderDetails.payment.deliveryPrice} DH
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: 16,
          marginVertical: 5,
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
          }}>
          total :
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
          }}>
          {props.orderDetails.payment.total} DH
        </Text>
      </View>
      <View
        style={{
          marginHorizontal: 16,
          borderTopWidth: 1,
          marginVertical: 5,
          borderTopColor: theme.palette.default.inactive,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 16,
            marginVertical: 5,
            alignItems: 'center',
          }}>
          <Cash width={40} height={40} fill={theme.palette.default.inactive} />

          {props.orderDetails?.payment?.paymentGateway && (
            <Text
              style={{
                marginLeft: 10,
                color: theme.palette.default.inactive,
                fontSize: 19,
              }}>
              {props.orderDetails?.payment?.paymentGateway}
            </Text>
          )}
        </View>
        <Text
          style={{
            marginLeft: 10,
            color: theme.palette.default.inactive,
            fontSize: 19,
          }}>
          {props.orderDetails.payment.total} DH
        </Text>
      </View>
    </View>
  );
};

export default HandlePayments;

const styles = StyleSheet.create({});
