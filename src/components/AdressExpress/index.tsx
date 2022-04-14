import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import theme from 'theme/theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

import { useNavigation } from '@react-navigation/native';
import { NAVIGATORS, SCREENS } from 'navigators/constants';
import {
  SET_DESTINATIONS_ADDRESSES,
  SET_PICKUP_ADDRESS,
} from 'containers/AddressesHandler/constants';
interface Props {
  isPickup: boolean;
  adress?: string;
  index?: number;
}

const AdressExpress = (props: Props) => {
  const navigation = useNavigation();

  // console.log(props.index !== undefined ? props.index : undefined);

  const handleMap = (isPickup?: boolean, index?: number) => {
    navigation.navigate(NAVIGATORS.ADDRESS, {
      screen: SCREENS.MAP_SCREEN,
      params: {
        action: isPickup ? SET_PICKUP_ADDRESS : SET_DESTINATIONS_ADDRESSES,
        isPickup,
        index,
      },
    });
  };
  return (
    <View style={styles.adressExpressBarStyle}>
      <View style={styles.adressExpressContainerStyle}>
        <View style={styles.adressExpressColumnStyle}>
          <Text
            style={[
              styles.adressExpressTitleBarStyle,
              {
                color: props.isPickup ? '#28B873' : '#FF9F2F',
              },
            ]}>
            {props.isPickup ? 'Lieu de collect' : 'Lieu de Livraison'}
          </Text>
          <Text style={styles.adressExpressStyle}>
            {props.adress
              ? props.adress
              : '531 Pittston Ave, Scranton, PA 18505, Casablanca'}
          </Text>
        </View>
        <TouchableOpacity
          style={{
            width: 50,
            height: 50,
          }}
          onPress={() => {
            handleMap(
              props.isPickup ? props.isPickup : false,
              props.index !== undefined ? props.index : undefined,
            );
          }}>
          <FontAwesome name="edit" size={18} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AdressExpress;

const styles = StyleSheet.create({
  adressExpressBarStyle: {
    marginVertical: 8,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: '#CDD4D9',
    paddingLeft: 8,
    // height: 74,
  },
  adressExpressContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  adressExpressColumnStyle: {
    flexDirection: 'column',
  },
  adressExpressTitleBarStyle: {
    fontSize: 16,
    letterSpacing: 0.2,
    // color: '#28B873',
    marginTop: 13,
    marginBottom: 5,
  },
  adressExpressStyle: {
    fontSize: 12,
    letterSpacing: 0.2,
    color: 'rgba(0,0,0,0.4)',

    marginBottom: 15,
  },
});
