import AdressExpress from 'components/AdressExpress';
import ExpressInputs from 'components/ExpressInputs';
import ChoubikContainer from 'containers/ChoubikContainer';
import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import theme from 'theme/theme';
import { useSelector, useDispatch } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { createStructuredSelector } from 'reselect';
import reducer, { initialState } from './reducer';
import saga from './saga';
import {
  audioSelector,
  imageSelector,
  mapShowSelector,
  textSelector,
  DestinationLocationSelector,
  PickupLocationSelector,
  DeliveryTimeOptionsSelector,
  DateSelector,
  modalSelector,
} from './selectors';

import {
  makeSelectPickedAddress,
  makeSelectDestinationAddresses,
} from 'containers/AddressesHandler/selectors';
import {
  setAudioAction,
  setPhotoAction,
  setTextAction,
  setDestinationsAction,
  setTimeDeliveryOption,
  requestTimeDeliveryOptionAction,
  getDateAction,
} from './actions';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import { useIsFocused } from '@react-navigation/native';
import { setAddressDestinations } from 'containers/AddressesHandler/actions';
import DeliveryTimeContainer from 'containers/DeliveryTimeContainer';
import Wallet from '../../../assets/icons/wallet.svg';

/* tslint:disable */
interface Props {}
const stateSelector = createStructuredSelector({
  audioPath: audioSelector(),
  imagePath: imageSelector(),
  showMap: mapShowSelector(),
  term: textSelector(),
  PickupLoction: PickupLocationSelector(),
  DestinationLocation: DestinationLocationSelector(),

  pickedAddress: makeSelectPickedAddress,
  destinationAddresses: makeSelectDestinationAddresses,
  selectedDeliveryTime: DeliveryTimeOptionsSelector(),
  selectedDate: DateSelector(),
  modalVisible: modalSelector(),
});
const key = 'ExpressScreen';

const ExpressScreen = (props: Props) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const dispatch = useDispatch();

  /*@ts-nocheck*/
  const {
    selectedDeliveryTime,
    selectedDate,
    modalVisible,
    DestinationLocation,
    PickupLoction,
    pickedAddress,
    destinationAddresses,
  } = useSelector(stateSelector);
  //pickup Data
  const pickupData = [PickupLoction];
  const isFocused = useIsFocused();
  useEffect(() => console.log(DestinationLocation), [DestinationLocation]);
  useEffect(() => {
    dispatch(requestTimeDeliveryOptionAction());
  }, []);
  const renderpickupDataItem = (items: any) => {
    // console.log(items.item[0]);

    return (
      <View>
        <AdressExpress
          isPickup={items.item.isPickup ? true : false}
          adress={items.item.isPickup ? pickedAddress?.address : null}
          index={items.index}
        />
        <ExpressInputs />
        <ChoubikContainer
          height={100}
          audioPath={items.item.data.audioPath}
          setAudioAction={setAudioAction}
          images={items.item.data.photoArray}
          setPhotoAction={setPhotoAction}
          term={items.item.data.comment}
          seTextAction={setTextAction}
          displayMap={false}
          isPickup={true}
          index={items.index}
        />
      </View>
    );
  };

  const addMoreDestinations = (data: any) => {
    let newData = [];
    newData.push(...DestinationLocation, data[0]);
    dispatch(setDestinationsAction(newData));

    //     newData.map((a: any, index: number) => {
    //    //   console.log(a.data.address.address, 'at', index);
    //     });
  };

  // console.log(deliveryData);
  const handleDelete = (data: any) => {
    //console.log(data);

    let newData = [];
    let newAddress = [];
    console.log(data.index);

    newData = DestinationLocation.filter(
      (a: any, index: any) => index !== data.index,
    );
    newAddress = destinationAddresses.filter(
      (a: any, index: any) => index !== data.index,
    );

    if (DestinationLocation.length === 1) {
      dispatch(setDestinationsAction(DestinationLocation, data.index));
      dispatch(
        setAddressDestinations(
          destinationAddresses[data.index],
          false,
          data.index,
        ),
      );
    } else {
      newData = DestinationLocation.filter(
        (a: any, index: any) => index !== data.index,
      );
      dispatch(setDestinationsAction(newData));
      newAddress = destinationAddresses.filter(
        (a: any, index: any) => index !== data.index,
      );
      dispatch(
        setAddressDestinations(newAddress[data.index], false, data.index),
      );
    }
    //  console.log(newData.length);
  };

  const renderDeliveryData = (items: any, handleDelete: Function) => {
    return (
      <View>
        {DestinationLocation.length > 1 && (
          <TouchableOpacity
            style={{
              borderWidth: 1,
              // flexWrap: 'wrap',
              //  position: 'absolute',
              justifyContent: 'center',
              alignItems: 'center',
              // left: 15,
              width: 25,
              height: 25,
              backgroundColor: 'red',
              borderRadius: 25,
            }}
            onPress={() => handleDelete(items)}>
            <Text style={{ fontSize: 25, position: 'absolute', top: -8 }}>
              x
            </Text>
          </TouchableOpacity>
        )}
        <View style={{ flexDirection: 'column' }}>
          <AdressExpress
            isPickup={items.item.isPickup ? true : false}
            adress={
              !items.item.isPickup
                ? items.item.data?.address.address
                  ? items.item.data?.address.address
                  : null
                : null
            }
            index={items.index}
          />
          <ExpressInputs />
          <ChoubikContainer
            height={100}
            audioPath={items.item.data.audioPath}
            setAudioAction={setAudioAction}
            images={items.item.data.photoArray}
            setPhotoAction={setPhotoAction}
            term={items.item.data.comment}
            seTextAction={setTextAction}
            displayMap={false}
            isPickup={false}
            index={items.index}
          />
        </View>
      </View>
    );
  };
  const screenData = [
    <View style={styles.ExpressScrenStyle}>
      <Text style={styles.informationTitleStyle}>Informations</Text>
      <FlatList
        data={pickupData}
        renderItem={renderpickupDataItem}
        keyExtractor={(item, index) => index.toString()}
      />

      <FlatList
        data={DestinationLocation}
        renderItem={(items: any) => renderDeliveryData(items, handleDelete)}
        listKey={(item: any, index: any) => `_key ${index.toString()}`}
        keyExtractor={(item, index) => `123_key${index.toString()}`}
      />
      <TouchableOpacity
        style={styles.addMoreDestinationsTextContainerStyle}
        onPress={() => {
          addMoreDestinations(initialState.DestinationLocations);
        }}>
        <Text style={styles.addMoreDestinationsTextStyle}>
          Ajouter un autre lieu de livraison
        </Text>
      </TouchableOpacity>
      <DeliveryTimeContainer
        selectedDate={selectedDate}
        selectedDeliveryTimeOption={selectedDeliveryTime}
        setTimeDeliveryOption={setTimeDeliveryOption}
        getDateAction={getDateAction}
      />
      <Text style={styles.ChoubikContainerDetailDeliveryTimeTitleStyle}>
        Moyen de paiement
      </Text>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          //justifyContent: 'space-between',

          height: 60,
          //  borderWidth: 1,
          alignItems: 'center',
        }}
        onPress={() => console.log('plop')}>
        <Wallet width={38} height={38} />
        <Text
          style={{
            marginLeft: 15,
          }}>
          Choisir un moyen de paiement
        </Text>
      </TouchableOpacity>
      <Text style={styles.ChoubikContainerDetailDeliveryTimeTitleStyle}>
        Détail du Paiement
      </Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={styles.ChoubikSimpleTextStyle}>Total :</Text>
        <Text style={styles.ChoubikSimpleTextStyle}>100 DH</Text>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: 25,
        }}>
        <TouchableOpacity style={styles.ConfirmButton}>
          <Text style={styles.ConfirmButtonTitle}>Confirmer</Text>
        </TouchableOpacity>
      </View>
    </View>,
  ];

  return (
    <FlatList
      data={screenData}
      renderItem={(items) => <>{items.item}</>}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export default ExpressScreen;

const styles = StyleSheet.create({
  ExpressScrenStyle: {
    flex: 1,
    backgroundColor: theme.palette.default.light,
    //paddingLeft: 11,
    paddingHorizontal: 15,
  },
  informationTitleStyle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 17,
  },
  addMoreDestinationsTextStyle: {
    fontSize: 17,
    color: '#FF9F2F',
  },
  addMoreDestinationsTextContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 25,
  },
  ChoubikContainerDetailDeliveryTimeTitleStyle: {
    fontSize: 23,
    paddingBottom: 10,
  },
  ChoubikSimpleTextStyle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  ConfirmButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: theme.palette.default.main,
    alignItems: 'center',
    marginVertical: 17,
    width: '80%',
  },
  ConfirmButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
});
/**
 *   const ExpressScreen = (props: Props) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const dispatch = useDispatch();

  const {
    audioPath,
    imagePath,
    showMap,
    term,
    DestinationLocation,
    PickupLoction,
    pickedAddress,
  } = useSelector(stateSelector);
  //pickup Data
  const pickupData = [PickupLoction];

  useEffect(() => console.log(DestinationLocation, PickupLoction), [
    DestinationLocation,
    PickupLoction,
  ]);
  const renderpickupDataItem = (items: any) => {
    // console.log(items.item[0]);

    return (
      <View>
        <AdressExpress
          isPickup={items.item.isPickup ? true : false}
          adress={items.item.isPickup ? pickedAddress?.address : null}
        />
        <ExpressInputs />
        <ChoubikContainer
          height={100}
          audioPath={items.item.data.audioPath}
          setAudioAction={setAudioAction}
          images={items.item.data.photoArray}
          setPhotoAction={setPhotoAction}
          term={term}
          seTextAction={setTextAction}
          displayMap={false}
          isPickup={true}
        />
      </View>
    );
  };

  const deliveryData = DestinationLocation;

  const addMoreDestinations = (data: any) => {
    let newData = [];
    newData.push(...deliveryData, data[0]);
    dispatch(setDestinationsAction(newData));

    console.log(newData);
  };

  // console.log(deliveryData);
  const handleDelete = (data: any) => {
    //console.log(data);

    let newData = [];

    newData = deliveryData.filter((a: any, index: any) => index !== data.index);

    //console.log(newData);

    dispatch(setDestinationsAction(newData));
  };

  const renderDeliveryData = (items: any, handleDelete: Function) => {
    return (
      <View>
        {items.index !== 0 && (
          <TouchableOpacity
            style={{
              borderWidth: 1,
              // flexWrap: 'wrap',
              //  position: 'absolute',
              justifyContent: 'center',
              alignItems: 'center',
              // left: 15,
              width: 25,
              height: 25,
              backgroundColor: 'red',
              borderRadius: 25,
            }}
            onPress={() => handleDelete(items)}>
            <Text style={{ fontSize: 25, position: 'absolute', top: -8 }}>
              x
            </Text>
          </TouchableOpacity>
        )}
        <View style={{ flexDirection: 'column' }}>
          <AdressExpress isPickup={items.item.isPickup ? true : false} />
          <ExpressInputs />
          <ChoubikContainer
            height={100}
            audioPath={items.item.data.audioPath}
            setAudioAction={setAudioAction}
            images={items.item.data.photoArray}
            setPhotoAction={setPhotoAction}
            term={term}
            seTextAction={setTextAction}
            displayMap={false}
            isPickup={false}
            index={items.index++}
          />
        </View>
      </View>
    );
  };
  const screenData = [
    <View style={styles.ExpressScrenStyle}>
      <Text style={styles.informationTitleStyle}>Informations</Text>
      <FlatList
        data={pickupData}
        renderItem={renderpickupDataItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <FlatList
        data={deliveryData}
        renderItem={(items: any) => renderDeliveryData(items, handleDelete)}
        listKey={(item: any, index: any): any => `_key${index.toString()}`}
        keyExtractor={(item, index) => `_key${index.toString()}`}
      />
      <TouchableOpacity
        style={styles.addMoreDestinationsTextContainerStyle}
        onPress={() => {
          addMoreDestinations(deliveryData);
        }}>
        <Text style={styles.addMoreDestinationsTextStyle}>
          Ajouter un autre lieu de livraison
        </Text>
      </TouchableOpacity>
    </View>,
  ];

  return (
    <FlatList
      data={screenData}
      renderItem={(items) => <>{items.item}</>}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};
 *
 *
 */
