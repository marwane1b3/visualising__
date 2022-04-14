/**
 *
 * HomeScreen
 *
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { DrawerActions, useNavigation } from '@react-navigation/core';
import { NAVIGATORS, SCREENS } from 'navigators/constants';
import { deleteTokenAction } from 'providers/AuthProvider/actions';
import { makeSelectUserDetailsData } from 'containers/UserDetails/selectors';
import ServiceCategoriesContainer from 'containers/ServiceCategoriesContainer';
import ShortCutsContainer from 'containers/ShortCutsContainer';
import NotInZoneComponent from 'components/NotInZoneComponent';
import TabsNavigator from 'components/TabsNavigator';
import Icon from 'react-native-vector-icons/Ionicons';
import Caret from '../../../tools/logo/Icon awesome-caret-down.svg';
import {
  makeSelectAddressesList,
  makeSelectCustomerGPS,
  makeSelectPickedAddress,
} from 'containers/AddressesHandler/selectors';

import CustomModal from 'components/CustomModal';
import theme from 'theme/theme';
import {
  getCustomerGPSAction,
  setPickedAddress,
} from 'containers/AddressesHandler/actions';
import {
  ADD_ADDRESS,
  SET_PICKED_ADDRESS,
} from 'containers/AddressesHandler/constants';
import AdBannierContainer from 'containers/AdBannierContainer';
import { useIsFocused } from '@react-navigation/native';

const stateSelector = createStructuredSelector({
  userDetails: makeSelectUserDetailsData,
  customerGPS: makeSelectCustomerGPS,
  pickedAddress: makeSelectPickedAddress,
  addressesList: makeSelectAddressesList,
});

const key = 'homeScreen';

export interface IProps {
  images: string[];
}
// export const AdBannier = (props: IProps) => {
//   return (
//     <View style={{ width: '100%', height: 250 }}>
//       <SliderBox
//         images={props.images}
//         sliderBoxHeight={250}
//         onCurrentImagePressed={(index) => console.log(`image ${index} pressed`)}
//         dotColor="#FFEE58"
//         inactiveDotColor="#90A4AE"
//         paginationBoxVerticalPadding={20}
//         autoplay={true}
//         circleLoop
//         imageLoadingColor="#2196F3"
//       />
//     </View>
//   );
// };

export const HomeScreen: React.FC<IHomeScreenProps> = ({}) => {
  // useInjectReducer({ key, reducer });
  // useInjectSaga({ key, saga });

  /* eslint-disable no-unused-vars */
  const isFocus = useIsFocused();
  const dispatch = useDispatch();
  const navigation: any = useNavigation();

  const { userDetails, customerGPS, pickedAddress, addressesList } =
    useSelector(stateSelector);
  const [showModal, setShowModal] = useState(false);

  const navigateToCheckout = () => {
    navigation.navigate(SCREENS.CHECKOUT);
  };

  const handleCurrentAddressClick = () => {
    !pickedAddress || pickedAddress.fromGPS
      ? addressesList && addressesList.length > 0
        ? navigation.navigate(NAVIGATORS.ADDRESS, {
            action: ADD_ADDRESS,
          })
        : navigation.navigate(NAVIGATORS.ADDRESS, {
            screen: SCREENS.MAP_SCREEN,
            params: {
              action: ADD_ADDRESS,
            },
          })
      : setShowModal(true);
  };
  const dummy =
    pickedAddress &&
    ((!pickedAddress.fromGPS &&
      pickedAddress.location &&
      pickedAddress.location[0] != -1) ||
      (pickedAddress.fromGPS && customerGPS.gpsActive && customerGPS.inZone))
      ? [
          <ShortCutsContainer />,

          <ServiceCategoriesContainer />,
          isFocus && <AdBannierContainer />,
          isFocus && <TabsNavigator />,
        ]
      : [
          // <ServiceCategoriesContainer />,

          <ShortCutsContainer />,
          <NotInZoneComponent
            onPressAddAddress={() => {
              handleCurrentAddressClick();
            }}
          />,
        ];

  /* eslint-disable no-unused-vars */

  return (
    <>
      <TouchableOpacity
        style={{
          backgroundColor: theme.palette.default.main,
          alignItems: 'center',
          width: '100%',
        }}
        onPress={() => {
          handleCurrentAddressClick();
        }}>
        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={{
                fontSize: theme.fontSizing.default[4],
                color: theme.palette.default.light,
                fontWeight: 'bold',
                paddingRight: 15,
              }}>
              {pickedAddress ? pickedAddress.address : 'Position Actuelle'}
            </Text>
            <Caret width={15} height={15} />
          </View>
          {!customerGPS.gpsActive && (
            <Text
              style={{
                color: 'red',
                padding: 5,
                textAlign: 'center',
                backgroundColor: 'white',
              }}>
              Position Indisponible
            </Text>
          )}
        </View>
      </TouchableOpacity>
      <View style={styles.container}>
        <FlatList
          data={dummy}
          showsVerticalScrollIndicator={false}
          renderItem={(items) => <>{items.item}</>}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      {/* <Text>{JSON.stringify(customerGPS)}</Text>
       <Text>{JSON.stringify(pickedAddress)}</Text> */}
      <CustomModal
        title={'Choisissez une adresse de livraison'}
        showModal={showModal}
        setShowModal={setShowModal}
        actionTitle={'Ajouter une adresse'}
        mainAction={() => {
          setShowModal(false);
          addressesList && addressesList.length > 0
            ? navigation.navigate(NAVIGATORS.ADDRESS, {
                action: ADD_ADDRESS,
              })
            : navigation.navigate(NAVIGATORS.ADDRESS, {
                screen: SCREENS.MAP_SCREEN,
                params: {
                  action: ADD_ADDRESS,
                },
              });
        }}>
        {pickedAddress && !pickedAddress.fromGPS && (
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              flexDirection: 'row',
              padding: theme.spacing.default[1],
            }}
            onPress={() => {
              setShowModal(false);
              if (customerGPS.gpsActive) {
                dispatch(
                  setPickedAddress({
                    address: 'Position Actuelle',
                    cityId: customerGPS.cityId,
                    cityName: customerGPS.cityName,
                    createdAt: customerGPS.createdAt,
                    updatedAt: customerGPS.updatedAt,
                    details: '',
                    label: '',
                    latitudeDelta: 0,
                    longitudeDelta: 0,
                    picked: true,
                    location: [customerGPS.latitude, customerGPS.longitude],
                    type: 'home',
                    fromGPS: true,
                  }),
                );
              } else {
                dispatch(getCustomerGPSAction());
              }
            }}>
            <Icon
              name="locate"
              style={{
                fontSize: 25,
                color: '#2F423C',
                paddingVertical: 1,
              }}></Icon>
            <View
              style={{
                flex: 1,
                paddingHorizontal: theme.spacing.default[1],
                paddingVertical: 3,
              }}>
              <Text style={{}}>Position Actuelle</Text>
              {!customerGPS.gpsActive && (
                <Text style={{ color: 'red', fontSize: 12 }}>
                  Position indisponible
                </Text>
              )}
            </View>
          </TouchableOpacity>
        )}
        {/*{pickedAddress && !pickedAddress.fromGPS && (*/}
        {/*  <TouchableOpacity*/}
        {/*    style={{*/}
        {/*      justifyContent: 'center',*/}
        {/*      flexDirection: 'row',*/}
        {/*      padding: theme.spacing.default[1],*/}
        {/*    }}*/}
        {/*    onPress={() => {*/}
        {/*      setShowModal(false);*/}
        {/*      dispatch(setPickedAddress(pickedAddress));*/}
        {/*    }}>*/}
        {/*    <Icon*/}
        {/*      name="location-outline"*/}
        {/*      style={{*/}
        {/*        fontSize: 25,*/}
        {/*        color: '#2F423C',*/}
        {/*        paddingVertical: 1,*/}
        {/*      }}></Icon>*/}
        {/*    <View*/}
        {/*      style={{*/}
        {/*        flex: 1,*/}
        {/*        paddingHorizontal: theme.spacing.default[1],*/}
        {/*        paddingVertical: 3,*/}
        {/*      }}>*/}
        {/*      <Text>{pickedAddress.address}</Text>*/}
        {/*    </View>*/}
        {/*  </TouchableOpacity>*/}
        {/*)}*/}
      </CustomModal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'red',
    backgroundColor: '#FFFFFF',
    // padding: 5,
  },
  button: {
    padding: 8,
  },
});

export interface IHomeScreenProps {}
export default HomeScreen;
