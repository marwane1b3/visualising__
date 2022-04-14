/**
 *
 * MapScreen
 *
 */

import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Platform,
  KeyboardAvoidingView,
  Dimensions,
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import makeSelectMapScreen from './selectors';
import reducer from './reducer';
import saga from './saga';
// import { FormattedMessage } from 'components/FormattedMessage';
// import messages from './messages';
import MapView, {
  PROVIDER_GOOGLE,
  Polygon,
  Camera,
  Region,
} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import {
  getCitiesAction,
  getCustomerGPSAction,
  addAddressAction,
  updateAddressAction,
  setAddressPickup,
  setAddressDestinations,
} from 'containers/AddressesHandler/actions';
import {
  makeSelectLoading as makeSelectLoadingCities,
  makeSelectCities,
  makeSelectCustomerGPS,
  makeSelectDestinationAddresses,
} from 'containers/AddressesHandler/selectors';
import { DestinationLocationSelector } from 'screens/ExpressScreen/selectors';
import { setDestinationAddress } from 'screens/ExpressScreen/actions';

import { CommonActions, useNavigation } from '@react-navigation/core';

import { Loader } from 'components/Loader';
import { DEFAULT_POSITION } from './constants';
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
// import MapMarker from '../../../assets/icons/map-marker.svg';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Axios from 'axios';
import { schema } from './validationSchema';
import ControlledTextInput from 'components/ControlledTextInput';
import Button from 'components/Button';

import { ActionButton } from 'components/ActionButton';
import { makeSelectUserDetailsData } from 'containers/UserDetails/selectors';
import { getCustomerGPS } from 'containers/AddressesHandler/saga';
import { checkAddressInZone } from 'containers/AddressesHandler/LocationHelper';
import { NAVIGATORS, SCREENS } from 'navigators/constants';
import {
  ADD_ADDRESS,
  SET_DESTINATIONS_ADDRESSES,
  SET_PICKUP_ADDRESS,
  UPDATE_ADDRESS,
} from 'containers/AddressesHandler/constants';

const stateSelector = createStructuredSelector({
  mapScreen: makeSelectMapScreen(),
  loadingCities: makeSelectLoadingCities,
  cities: makeSelectCities,
  customerGPS: makeSelectCustomerGPS,
  userDetails: makeSelectUserDetailsData,
  destinationAddresses: makeSelectDestinationAddresses,
  DestinationLocation: DestinationLocationSelector(),
});
export interface IMapScreenProps {
  route: any;
}
const key = 'mapScreen';

const getStatusBarHeight = () => {
  //TODO: CHECK THIS FOR IOS
  const dimen = Dimensions.get('window');
  const isIPhoneX =
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height === 812 ||
      dimen.width === 812 ||
      dimen.height === 896 ||
      dimen.width === 896);

  return Platform.select({
    ios: isIPhoneX ? 44 : 20,
    android: StatusBar.currentHeight,
    default: 0,
  });
};

export const MapScreen: React.FC<IMapScreenProps> = ({ route }) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const {
    action,
    address: addressToUpdate,
    isPickup,
    index: destinationAddressIndex,
  } = route.params;
  useEffect(
    () => console.log('destination index at :', destinationAddressIndex),
    [],
  );

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const mapRef: any = useRef<MapView>(null);
  // const addresseInputref: any = useRef<typeof ControlledTextInput>(null);
  const googleAutocompletRef: any = useRef<typeof GooglePlacesAutocomplete>(
    null,
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue: setAddressFormvalues,
  } = useForm({
    resolver: yupResolver(schema),
  });
  /* eslint-disable no-unused-vars */
  const {
    mapScreen,
    loadingCities,
    cities,
    customerGPS,
    userDetails,
    destinationAddresses,
    DestinationLocation,
  } = useSelector(stateSelector);

  //useEffect(() => console.log('user data', userDetails), []);
  const [mapReady, setMapReady] = useState(false);
  const [inZone, setInZone] = useState(true);
  const [currentRegion, setCurrentRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0,
    cityId: '',
    cityName: '',
  });
  const animateMap = (latitude: number, longitude: number) => {
    mapReady &&
      mapRef &&
      mapRef.current &&
      mapRef.current.animateCamera(
        {
          center: {
            latitude,
            longitude,
          },
          zoom: 16,
          // heading: 0,
          // pitch: 0,
          // altitude: 5,
        },
        { duration: 1000 },
      );
  };

  const onRegionChange = async (region: Region) => {
    const inZoneResponse = checkAddressInZone(
      { latitude: region.latitude, longitude: region.longitude },
      cities,
    );
    inZoneResponse && setInZone(inZoneResponse.inZone);

    setCurrentRegion({
      cityId: inZoneResponse.cityId,
      cityName: inZoneResponse.cityName,
      ...region,
    });

    try {
      const result = await Axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${region.latitude},${region.longitude}&key=AIzaSyAb_AdNmuBqPDLbT-UPQy-qIGfH9G1C_JE`,
      );
      const formatted_address =
        result && result.data && result.data.results[0]
          ? result.data.results[0].formatted_address
          : '';
      if (googleAutocompletRef && googleAutocompletRef.current) {
        googleAutocompletRef.current.clear();
        // TODO: if we dont want it to be cleared evry time we call googleAutocompletRef.current.setAddressText(formatted_address);
      }
      if (setAddressFormvalues) {
        setAddressFormvalues('address', formatted_address);
      }
    } catch (e) {}
  };

  const onSubmit = (payload: { address: string; details: string }) => {
    switch (action) {
      case UPDATE_ADDRESS:
        dispatch(
          updateAddressAction({
            address: payload.address,
            location: [currentRegion.latitude, currentRegion.longitude],
            longitudeDelta: currentRegion.latitudeDelta,
            latitudeDelta: currentRegion.longitudeDelta,
            details: payload.details,
            type: 'home',
            label: 'string',
            picked: true,
            cityId: currentRegion.cityId,
            cityName: currentRegion.cityName,
            customerId: userDetails?.entityId,
            addressId: addressToUpdate._id,
          }),
        );
        navigation.goBack();
        break;
      case ADD_ADDRESS: // DEFAULT IS ADD ADDRESS
        dispatch(
          addAddressAction({
            address: payload.address,
            location: [currentRegion.latitude, currentRegion.longitude],
            longitudeDelta: currentRegion.latitudeDelta,
            latitudeDelta: currentRegion.longitudeDelta,
            details: payload.details,
            type: 'home',
            label: 'string',
            picked: true,
            cityId: currentRegion.cityId,
            cityName: currentRegion.cityName,
            customerId: userDetails?.entityId,
          }),
        );
        navigation.goBack();
        break;
      case SET_PICKUP_ADDRESS:
        dispatch(setAddressPickup(payload.address, isPickup));
        navigation.navigate(NAVIGATORS.MAIN_STACK, {
          screen: SCREENS.EXPRESS,
        });
        break;
      case SET_DESTINATIONS_ADDRESSES:
        console.log(destinationAddresses);
        let newArray = destinationAddresses.map((a: any) => {
          return { ...a };
        });
        // const newDestinationsAdress = DestinationLocation.map((a: any) => {
        //   return { ...a };
        // });

        const newAddress = {
          address: payload.address,
          details: '',
          location: [0, 0],
        };
        dispatch(setDestinationAddress(newAddress, destinationAddressIndex));
        if (
          newArray
            .map((a: any, index: number) => index)
            .includes(destinationAddressIndex)
        ) {
          newArray[destinationAddressIndex] = {
            data: {
              address: payload.address,
              details: '',
              location: [0, 0],
            },
          };
        } else {
          newArray.push({
            data: {
              address: payload.address,
              details: '',
              location: [0, 0],
            },
          });
        }
        // dispatch(
        //   setDestinationsAction(newDestinationsAdress, destinationAddressIndex),
        // );

        dispatch(
          setAddressDestinations(
            newArray[destinationAddressIndex],
            isPickup,
            destinationAddressIndex,
          ),
        );
        navigation.navigate(NAVIGATORS.MAIN_STACK, {
          screen: SCREENS.EXPRESS,
        });
        break;
    }

    // if (isPickup) {
    //   dispatch(setAddressPickup(payload.address, isPickup));
    //   navigation.navigate(NAVIGATORS.MAIN_STACK, {
    //     screen: SCREENS.EXPRESS,
    //   });
    // }
    // console.log(payload)
    /**
     *  if (isPickup) {
      dispatch(setAddressPickup(payload.address, isPickup));
      navigation.navigate(NAVIGATORS.MAIN_STACK, {
        screen: SCREENS.EXPRESS,
      });
    } else if (isPickup === false) {
      dispatch(setAddressDestinations(payload.address, isPickup, destinationAddressIndex));
      navigation.navigate(NAVIGATORS.MAIN_STACK, {
        screen: SCREENS.EXPRESS,
      });
    }
     */
  };

  /* eslint-enable no-unused-vars */

  const handleCurrentLocationPress = () => {
    //TODO: Check difference between UPDATE_ADDRESS and ADD_ADDRESS
    switch (action) {
      case UPDATE_ADDRESS:
        !customerGPS.gpsActive && dispatch(getCustomerGPSAction());
        break;
      case ADD_ADDRESS:
        dispatch(getCustomerGPSAction());
        break;
    }
    customerGPS.gpsActive &&
      animateMap(customerGPS.latitude, customerGPS.longitude);
  };

  useEffect(() => {
    console.log({ action });
    // This UseEffect is to ask for location enable
    switch (action) {
      case UPDATE_ADDRESS:
        if (setAddressFormvalues) {
          setAddressFormvalues('details', addressToUpdate.details);
        }
        break;
      case ADD_ADDRESS:
      case SET_PICKUP_ADDRESS:
        if (!customerGPS.gpsActive) {
          dispatch(getCustomerGPSAction());
        }
        break;
    }
  }, []);

  useEffect(() => {
    switch (action) {
      // Animate Map to address that we want to update
      case UPDATE_ADDRESS:
        if (
          addressToUpdate.location &&
          addressToUpdate.location.length > 0 &&
          mapReady
        ) {
          animateMap(addressToUpdate.location[0], addressToUpdate.location[1]);
        }
        break;
      // Animate Map to Current GPS position
      case ADD_ADDRESS:
      case SET_PICKUP_ADDRESS:
        if (mapReady && customerGPS.gpsActive) {
          animateMap(customerGPS.latitude, customerGPS.longitude);
        }
        break;
    }
  }, [mapReady, customerGPS]);

  const GooglePlacesInput = () => {
    return (
      <SafeAreaView
        pointerEvents="box-none"
        style={styles.GooglePlacesContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name="arrow-back-outline" style={styles.goBackIcon}></Icon>
        </TouchableOpacity>
        <View style={{ paddingHorizontal: 6, paddingRight: 24, flex: 1 }}>
          <GooglePlacesAutocomplete
            ref={googleAutocompletRef}
            renderLeftButton={() => (
              <View style={styles.LefButtonContainer}>
                <Icon name="search" style={styles.leftButtonIcon}></Icon>
              </View>
            )}
            renderRightButton={() => (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  if (googleAutocompletRef && googleAutocompletRef.current) {
                    googleAutocompletRef.current.clear();
                  }
                }}>
                <View style={styles.rightButtonContainer}>
                  <Icon
                    name="close-circle-outline"
                    style={styles.rightButtonIcon}
                  />
                </View>
              </TouchableOpacity>
            )}
            placeholder="Search"
            styles={{
              container: styles.googleAutocompletContainer,
              textInputContainer: styles.googleAutocompletInputContainer,
              textInput: styles.googleAutocompletInput,
              listView: styles.googleAutocompleteListView,
              row: {},
            }}
            fetchDetails={true}
            onPress={(data, details) => {
              if (details?.geometry?.location) {
                animateMap(
                  details.geometry.location.lat,
                  details?.geometry.location.lng,
                );
              }
            }}
            query={{
              key: 'AIzaSyAb_AdNmuBqPDLbT-UPQy-qIGfH9G1C_JE',
              language: 'en',
            }}
          />
        </View>
      </SafeAreaView>
    );
  };

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <GooglePlacesInput />
      <View style={{ flex: 1 }}>
        <Loader isLoading={loadingCities}>
          <MapView
            onMapReady={() => {
              setMapReady(true);
            }}
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            ref={mapRef}
            showsUserLocation={true}
            showsMyLocationButton={false}
            initialCamera={{
              center: {
                latitude: DEFAULT_POSITION.LATITUDE,
                longitude: DEFAULT_POSITION.LONGITUDE,
              },
              pitch: 0,
              zoom: 6,
              heading: 0,
              altitude: 0,
            }}
            onRegionChangeComplete={onRegionChange}>
            {cities.map((city: any) => {
              return (
                city.cityLocations.length > 0 && (
                  <Polygon
                    key={city._id}
                    coordinates={city.cityLocations.map((c: number[]) => {
                      return { latitude: c[1], longitude: c[0] };
                    })}
                    fillColor={'#28B87325'}
                    strokeColor={'#28B87350'}></Polygon>
                )
              );
            })}
          </MapView>
        </Loader>
        <View style={styles.mapMarkerContainer}>
          <View
            pointerEvents="box-none"
            style={{
              flex: 1,
            }}>
            <View style={{ flex: 1 }}>
              <View style={{ flex: 1 }}></View>
              <Image
                source={require('assets/images/map-marker.png')}
                style={styles.mapMarkerIcon}></Image>
            </View>
            <View style={{ flex: 1 }}>
              <View style={{ flex: 1, alignItems: 'center' }}>
                {!inZone && (
                  <Text style={styles.outOfZoneText}>Vous etes Hors Zone</Text>
                )}
              </View>
              <TouchableOpacity
                style={styles.currentLocationTouchable}
                onPress={handleCurrentLocationPress}>
                <Icon
                  name="md-locate"
                  style={styles.currentLocationIcon}></Icon>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.formContainer}>
        <ControlledTextInput
          alwaysFocused
          editable={false}
          selectTextOnFocus={false}
          control={control}
          label="address"
          name="address"
          errorMessage={errors.address?.message}
          staticHolder="Addresse"
          inputStyle={styles.addressInput}
          defaultValue=""
        />
        <ControlledTextInput
          control={control}
          label="details"
          name="details"
          errorMessage={errors.details?.message}
          defaultValue=""
          staticHolder={"Détails d'adresse"}
          placeholderTextColor={'grey'}
          inputStyle={styles.detailsInput}
          multiline
        />
        <ActionButton
          disabled={!inZone}
          onPress={handleSubmit(onSubmit)}
          title={'Enregistrer'}
          textColor={'white'}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  map: StyleSheet.absoluteFillObject,
  mapMarkerContainer: {
    flex: 1,
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  mapMarkerIcon: {
    alignSelf: 'center',
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  outOfZoneText: {
    backgroundColor: 'white',
    color: 'red',
    borderRadius: 5,
    paddingHorizontal: 5,
    fontWeight: 'bold',
  },
  currentLocationTouchable: {
    backgroundColor: 'white',
    borderRadius: 50,
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    width: 32,
    height: 32,
  },
  currentLocationIcon: {
    fontSize: 30,
    color: 'grey',
  },
  goBackIcon: {
    fontSize: 30,
    paddingTop: 7,
    paddingHorizontal: 7,
    color: '#28B873',
  },
  GooglePlacesContainer: {
    position: 'absolute',
    zIndex: 100,
    width: '100%',
    paddingBottom: 50,
    paddingTop: getStatusBarHeight(),
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  LefButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 5,
    // backgroundColor: 'yellow',
  },
  leftButtonIcon: { fontSize: 25, color: '#28B873' },
  rightButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    paddingRight: 5,
  },
  rightButtonIcon: { fontSize: 25, color: '#28B873' },
  googleAutocompletContainer: {
    backgroundColor: 'transparent',
  },
  googleAutocompletInputContainer: {
    backgroundColor: 'white',
    borderRadius: 50,
    height: 45,
  },
  googleAutocompletInput: {
    color: 'black',
    backgroundColor: 'transparent',
    borderRadius: 50,
    fontSize: 14,
  },
  googleAutocompleteListView: {
    backgroundColor: 'transparent',
    paddingTop: 8,
    borderRadius: 5,
  },
  formContainer: {
    paddingHorizontal: 24,
    paddingTop: 12,
    backgroundColor: 'white',
  },
  addressInput: {
    color: 'black',
    borderColor: '#CDD4D9',
    marginVertical: 2,
    borderRadius: 3,
  },
  detailsInput: {
    color: 'black',
    minHeight: 80,
    borderColor: '#CDD4D9',
    marginVertical: 2,
    borderRadius: 3,
  },
});

export default MapScreen;
