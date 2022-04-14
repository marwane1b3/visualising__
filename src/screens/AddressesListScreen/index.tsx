/**
 *
 * AddressesListScreen
 *
 */

import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import makeSelectAddressesListScreen from './selectors';
import reducer from './reducer';
import saga from './saga';
import { FormattedMessage } from 'components/FormattedMessage';
import messages from './messages';
import { makeSelectAddressesList } from 'containers/AddressesHandler/selectors';
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {
  addAddressAction,
  setPickedAddress,
  deleteAddressAction,
} from 'containers/AddressesHandler/actions';
import { makeSelectLoading as makeSelectLoadingAddresses } from 'containers/AddressesHandler/selectors';
import { makeSelectUserDetailsData } from 'containers/UserDetails/selectors';
import { useNavigation } from '@react-navigation/core';
import { SCREENS } from 'navigators/constants';
import Icon from 'react-native-vector-icons/Ionicons';
import { ActionButton } from 'components/ActionButton';
import {
  ADD_ADDRESS,
  UPDATE_ADDRESS,
} from 'containers/AddressesHandler/constants';
import theme from 'theme/theme';
const stateSelector = createStructuredSelector({
  addressesListScreen: makeSelectAddressesListScreen(),
  addressesList: makeSelectAddressesList,
  userDetails: makeSelectUserDetailsData,
  loadingAddresses: makeSelectLoadingAddresses,
});

const key = 'addressesListScreen';

export const AddressesListScreen: React.FC<IAddressesListScreenProps> = ({}) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  /* eslint-disable no-unused-vars */
  const {
    addressesListScreen,
    addressesList,
    userDetails,
    loadingAddresses,
  } = useSelector(stateSelector);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  /* eslint-enable no-unused-vars */

  const navigateToMap = (address?: IAddress, isUpdate?: boolean) => {
    navigation.navigate(SCREENS.MAP_SCREEN, {
      action: isUpdate ? UPDATE_ADDRESS : ADD_ADDRESS,
      address: address,
    });
  };

  // const openDeleteAddress = (address: IAddress) => {
  //   dispatch(deleteAddressAction({ addressId: address._id }));
  // };

  const deleteAddress = (address: IAddress) => {
    dispatch(deleteAddressAction({addressId: address._id}));
  };

  return (
    <>
      <View style={styles.topContainer}>
        <ActionButton
          onPress={() => navigateToMap()}
          title={'Ajouter une adresse'}
          textColor={'white'}
        />
        <View style={styles.viewseparator} />
        <FormattedMessage
          style={styles.savedAddressTitle}
          {...messages.title}
        />
      </View>
      <ScrollView style={styles.container}>
        <View style={{ width: '100%' }}>
          <ScrollView>
            {addressesList?.map((address: IAddress) => (
              <View key={`${address?._id}`} style={styles.addressContainer}>
                <View style={{ flex: 1 }}>
                  <TouchableOpacity
                    style={{ padding: 8 }}
                    onPress={() => {
                      dispatch(setPickedAddress(address));
                      navigation.goBack();
                    }}>
                    <Text
                      numberOfLines={1}
                      style={{ color: '#28B873', fontWeight: 'bold' }}>
                      {address.address}
                    </Text>
                    {/* <Text numberOfLines={2}>{JSON.stringify(address.location)}</Text> */}
                    <Text numberOfLines={2}>{address.details}</Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    flex: 0.3,
                  }}>
                  <TouchableOpacity
                    onPress={() => navigateToMap(address, true)}>
                    <Icon
                      name="pencil-sharp"
                      style={{ fontSize: 25, color: '#FF9F2F' }}></Icon>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => deleteAddress(address)}>
                    <Icon
                      name="trash-bin"
                      style={{ fontSize: 25, color: '#6D7177' }}></Icon>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    backgroundColor: theme.palette.default.light,
  },
  viewseparator: {
    backgroundColor: '#707070',
    height: 0.5,
    width: '90%',
    marginVertical: 20,
  },
  container: {
    flex: 1,
    backgroundColor: theme.palette.default.light,
  },
  savedAddressTitle: {
    color: 'black',
    fontWeight: 'bold',
  },
  addressContainer: {
    flex: 1,
    flexDirection: 'row',
    borderColor: '#CDD4D9',
    borderWidth: 1,
    borderRadius: 3,
    marginHorizontal: 12,
    marginVertical: 6,
    height: 80,
    overflow: 'hidden',
  },
});

export interface IAddressesListScreenProps {}
export interface IAddress {
  _id: string;
  address: string;
  cityId: string;
  customerId: string;
  details: string;
  displayName: string;
  label: string;
  latitudeDelta: number;
  longitudeDelta: number;
  picked: boolean;
  type: string;
  location: Array<number>;
  cityName: string;
}

export default AddressesListScreen;
