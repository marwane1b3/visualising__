/**
 *
 * StoresListScreen
 *
 */

import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/core';
import { SCREENS } from 'navigators/constants';
import { getId } from 'containers/StoreListContainer/actions';
import { useDispatch, useSelector } from 'react-redux';
import getDistance from 'geolib/es/getDistance';
import { makeSelectPickedAddress } from 'containers/AddressesHandler/selectors';
import { createStructuredSelector } from 'reselect';
const stateSelector = createStructuredSelector({
  pickedAddress: makeSelectPickedAddress,
});

const MemorizedRestaurant: React.FC<IRestaurantCardProps> = React.memo(
  ({ store }) => {
    //
    const { pickedAddress } = useSelector(stateSelector);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const url = store.imageUrl
      ? store.imageUrl
      : 'https://filestore.community.support.microsoft.com/api/images/72e3f188-79a1-465f-90ca-27262d769841';

    const handleStore = (storeDetails: any) => {
      dispatch(getId(storeDetails._id));
      navigation.navigate(SCREENS.ITEMS_LIST, {
        storeDetails,
      });
    };

    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          handleStore(store);
        }}>
        <ImageBackground style={styles.image} source={{ uri: url }}>
          <View style={styles.rgba}>
            <View style={styles.icoContainer}>
              <AntDesign name="heart" color={'#fafafa'} style={styles.icon} />
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.txtTitle}>
                {store.name} -
                {getDistance(
                  {
                    lat: pickedAddress.location[0],
                    lng: pickedAddress.location[1],
                  },
                  { lat: store.location[0], lng: store.location[1] },
                )}
                m
              </Text>
            </View>
            <Text>{store.promoTextPrimary}</Text>
          </View>
        </ImageBackground>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'stretch',
            justifyContent: 'space-between',
          }}>
          <Text>
            {' '}
            {store.preparationTimeMin} - {store.preparationTimeMax} Min
          </Text>
          <Text>{store.deliveryPrice} dh</Text>
        </View>
      </TouchableOpacity>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    elevation: 4,

    height: 150,
    margin: 15,
    overflow: 'hidden',
    borderRadius: 6,
  },
  image: {
    width: '100%',
    height: 120,
  },
  icon: {
    position: 'relative',
  },
  titleContainer: {
    flexDirection: 'row',
    marginTop: 8,
    justifyContent: 'center',
  },
  txtTitle: {
    textAlign: 'center',
    fontSize: 25,
    color: '#fff',
  },
  rgba: {
    width: '100%',
    height: 120,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  icoContainer: {
    margin: 15,
    position: 'absolute',
    right: 0,
  },
  promoText: {
    position: 'absolute',
    top: 0,
    marginTop: 12,

    elevation: 5,
    fontWeight: '700',
    letterSpacing: 0.3,
    fontSize: 18,
    transform: [{ rotate: '-47deg' }],
    color: '#fff',
  },
  topRectangle: {
    backgroundColor: 'transparent',
    position: 'absolute',
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderRightWidth: 70,
    borderTopWidth: 70,
    borderRightColor: 'transparent',
    borderTopColor: '#ffc117',
  },
  promoBanner: {
    backgroundColor: '#ffc117',
    flexDirection: 'row',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'flex-end',
    bottom: 0,
    width: '80%',
    marginLeft: 35,
  },
});

export interface IRestaurantCardProps {
  store: any;
}

// export const MemorizedRestaurant = React.memo(RestaurantCard);
export default MemorizedRestaurant;

/*

import React, { useEffect } from 'react';
import { View, StyleSheet, Text, ImageBackground, Image } from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
//import console = require('console');

const MemorizedRestaurant: React.FC<IRestaurantCardProps> = React.memo(
  ({ store }) => {
    //
    const url = store.image_url;

    //  console.log(url);
    return (
      <View style={styles.container}>
        <ImageBackground style={styles.image} source={{ uri: url }}>
          <View style={styles.rgba}>
            {store.promo_text_show ? (
              <>
                <Text style={styles.promoText}>Promo</Text>
                <View style={styles.topRectangle} />
              </>
            ) : null}
            <View style={styles.icoContainer}>

              <AntDesign name="heart" color={'#fafafa'} style={styles.icon} />
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.txtTitle}>{store.name}</Text>
            </View>
            {store.promo_text_show ? (
              <View style={styles.promoBanner}>
                <Text style={{ position: 'relative' }}>{store.promo_text}</Text>
              </View>
            ) : null}
          </View>
        </ImageBackground>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'stretch',
            justifyContent: 'space-between',
          }}>
          <Text>10</Text>
          <Text>10</Text>
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    elevation: 4,

    height: 150,
    margin: 15,
    overflow: 'hidden',
    borderRadius: 6,
  },
  image: {
    width: '100%',
    height: 120,
  },
  icon: {
    position: 'relative',
  },
  titleContainer: {
    flexDirection: 'row',
    marginTop: 8,
    justifyContent: 'center',
  },
  txtTitle: {
    textAlign: 'center',
    fontSize: 25,
    color: '#fff',
  },
  rgba: {
    width: '100%',
    height: 120,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  icoContainer: {
    margin: 15,
    position: 'absolute',
    right: 0,
  },
  promoText: {
    position: 'absolute',
    top: 0,
    marginTop: 12,

    elevation: 5,
    fontWeight: '700',
    letterSpacing: 0.3,
    fontSize: 18,
    transform: [{ rotate: '-47deg' }],
    color: '#fff',
  },
  topRectangle: {
    backgroundColor: 'transparent',
    position: 'absolute',
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderRightWidth: 70,
    borderTopWidth: 70,
    borderRightColor: 'transparent',
    borderTopColor: '#ffc117',
  },
  promoBanner: {
    backgroundColor: '#ffc117',
    flexDirection: 'row',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'flex-end',
    bottom: 0,
    width: '80%',
    marginLeft: 35,
  },
});

export interface IRestaurantCardProps {
  store: any;
}

 export const MemorizedRestaurant = React.memo(RestaurantCard);
export default MemorizedRestaurant;
 */
