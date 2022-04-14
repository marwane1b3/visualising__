/**
 *
 * CheckoutScreen
 *
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  ScrollView,
  Switch,
  Platform,
  Modal,
  Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import makeSelectCheckoutScreen, {
  DateSelector,
  DeliveryTimeOptionsSelector,
  makeSelectCardListScreen,
  makeSelectcleanUpAndGobackToHome,
  makeSelectDeliveryPriceDetail,
  makeSelectErrorScreen,
  makeSelectLoadingScreen,
  makeSelectPaymentDetailScreen,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { useAuthProtection } from 'hooks/useAuthProtection';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NAVIGATORS, SCREENS } from '../../navigators/constants';
import {
  useIsFocused,
  useNavigation,
  CommonActions,
} from '@react-navigation/core';
import {
  cleanUpCheckoutStateAction,
  createOrderAction,
  createPaymentAction,
  getCardsAction,
  getDateAction,
  getDeliveryPriceAction,
  requestTimeDeliveryOptionAction,
  setTimeDeliveryOption,
  updatePaymentAction,
} from './actions';
import RoundCheckbox from 'rn-round-checkbox';

import { makeSelectUserDetailsData } from '../../containers/UserDetails/selectors';
import {
  makeSelectAddressesList,
  makeSelectCustomerGPS,
  makeSelectPickedAddress,
  makeSelectLoading,
} from '../../containers/AddressesHandler/selectors';
import DeliveryTimeContainer from 'containers/DeliveryTimeContainer';
import {
  getCustomerGPSAction,
  setPickedAddress,
} from '../../containers/AddressesHandler/actions';
import CustomModal from '../../components/CustomModal';
import theme from '../../theme/theme';
import CardList from '../../containers/CardList';
import { stubFalse } from 'lodash';
import { getUrlAddCardSuccessAction } from 'containers/CardList/actions';
import { makeSelectCardSelectedScreen } from 'containers/CardList/selectors';
import { ADD_ADDRESS } from 'containers/AddressesHandler/constants';
import {
  makeSelectProducts,
  makeSelectSelectedStore,
} from 'containers/ShoppingCard/selectors';
import { DEFAULT_CART_DETAIL, getDistanceFromLatLonInKm } from './constants';
import * as yup from 'yup';
import ChooseModal from '../../components/chooseModal';
import RoundCheckbox2 from '../../components/RoundCheckbox';
import DatePicker from 'react-native-date-picker';

const stateSelector = createStructuredSelector({
  checkoutScreen: makeSelectCheckoutScreen(),
  paymentDetail: makeSelectPaymentDetailScreen,
  cardList: makeSelectCardListScreen,
  userDetails: makeSelectUserDetailsData,
  loading: makeSelectLoadingScreen,
  error: makeSelectErrorScreen,
  pickedAddress: makeSelectPickedAddress,
  customerGPS: makeSelectCustomerGPS,
  selectedDate: DateSelector(),
  selectedCard: makeSelectCardSelectedScreen,
  addressesList: makeSelectAddressesList,
  loadingAddress: makeSelectLoading,
  selectedDeliveryTime: DeliveryTimeOptionsSelector(),
  deliveryPriceDetail: makeSelectDeliveryPriceDetail,
  cleanUpAndGobackToHome: makeSelectcleanUpAndGobackToHome,
  shoppinCardProducts: makeSelectProducts,
  selectedStore: makeSelectSelectedStore,
});

const key = 'checkoutScreen';

export const CheckoutScreen: React.FC<ICheckoutScreenProps> = ({}) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  /* eslint-disable no-unused-vars */
  const {
    checkoutScreen,
    paymentDetail,
    loading,
    error,
    cardList,
    userDetails,
    pickedAddress,
    selectedDate,
    selectedDeliveryTime,
    customerGPS,
    selectedCard,
    addressesList,
    deliveryPriceDetail,
    cleanUpAndGobackToHome,
    shoppinCardProducts,
    selectedStore,
  } = useSelector(stateSelector);
  const dispatch = useDispatch();
  /* eslint-enable no-unused-vars */
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [isCash, setIsCash] = useState(true);
  const [isCard, setIsCard] = useState(false);
  const [showModalAddCard, setShowModalAddCard] = useState(false);
  const [UsePoint, setUsePoint] = useState(false);
  const [userName, setUserName] = React.useState('');
  const [userPhone, setUserPhone] = React.useState('');
  const [Cards, setCards] = useState([]);
  const [errors, setErrors] = useState({ phone: '', name: '' });
  useAuthProtection();
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState('+212');
  const [isFarFromPosition, setIsFarFromPosition] = useState(false);
  const [showModalFarFromPosition, setShowModalFarFromPosition] =
    useState(false);

  const navigateToAddCard = () => {
    navigation.navigate(SCREENS.MY_CARDS);
  };
  const countriesNumber = ['+212', '+33'];
  const payment = ({ paymentGateway }: { paymentGateway: string }) => {
    return {
      paymentGateway: paymentGateway,
      latitude: pickedAddress.location[0],
      longitude: pickedAddress.location[1],
      //TODO: Change storeId whenever we can get it from cartDetailsContainer
      storeId: selectedStore._id,
      cityId: pickedAddress.cityId,
      customerId: userDetails.entityId,
      destinationAddress: {
        location: pickedAddress.location,
        name: userName ? userName : 'DKk',
        phone: userPhone ? userPhone : '0666666666',
        address: pickedAddress.address,
      },
      cartDetails: shoppinCardProducts,
    };
  };

  useEffect(() => {
    console.log(
      JSON.stringify(DEFAULT_CART_DETAIL),
      JSON.stringify(shoppinCardProducts),
    );
  });

  const createPayment = (paymentGateway: string) => {
    dispatch(createPaymentAction(payment({ paymentGateway })));
  };

  const updatePayment = (paymentGateway: string) => {
    dispatch(
      updatePaymentAction(payment({ paymentGateway }), paymentDetail._id),
    );
  };
  const paymentHandler = () => {
    schema.isValid({ name: userName, phone: userPhone }).then((valid) => {
      if (valid) {
        console.log(
          'valide === >',
          valid,
          'isFarFromPosition',
          isFarFromPosition,
        );
        if (!isFarFromPosition) {
          if (isCash) {
            createOrder();
          } else {
            updatePayment('Card');
          }
        } else {
          setShowModalFarFromPosition(true);
        }
      } else {
        // validateName(userName);
        validateNumber(userPhone);
      }
    });
  };

  const createOrder = () => {
    dispatch(
      createOrderAction({
        payment: paymentDetail,
        cartDetails: shoppinCardProducts,
        store: selectedStore,
        customer: {
          name: userDetails.username,
          _id: userDetails.entityId,
          email: userDetails.email || '',
          phone: userDetails.phone || userPhone || '066666666666',
        },
        city: { name: pickedAddress.cityName, _id: pickedAddress.cityId },
      }),
    );
  };

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      // dispatch(
      //   getDeliveryPriceAction({
      //     storeId: '60eb77955337a90022b466ba',
      //     cityId: pickedAddress.cityId,
      //     latLng: {
      //       lat: customerGPS.latitude,
      //       lng: customerGPS.longitude,
      //     },
      //   }),
      // );
    }
    dispatch(requestTimeDeliveryOptionAction());
    if (userDetails) {
      dispatch(getCardsAction({ customerId: userDetails.entityId }));
    }
  }, [isFocused]);

  useEffect(() => {
    console.log({ cleanUpAndGobackToHome });
    if (cleanUpAndGobackToHome) {
      dispatch(cleanUpCheckoutStateAction());
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: NAVIGATORS.MAIN_STACK }],
        }),
      );
    }
  }, [cleanUpAndGobackToHome]);

  useEffect(() => {
    if (!paymentDetail) {
      createPayment('Cash');
    }
  }, [paymentDetail]);

  useEffect(() => {
    console.log('THE URL IS :', (paymentDetail || {}).paymentUrl);
    if (
      paymentDetail &&
      paymentDetail.paymentUrl &&
      paymentDetail.paymentUrl !== ''
    ) {
      navigation.navigate(SCREENS.CHECKOUT_PAYMENT, {
        paymentUrl: paymentDetail.paymentUrl,
      });
    }
  }, [paymentDetail]);
  const schema = yup.object().shape({
    name: yup.string().required(),
    phone: yup
      .string()
      .trim()
      .matches(/^[6785]\d{8}$/, 'Is not in correct format')
      .required(),
  });
  const validateNumber = (value: any) => {
    setUserPhone(value);
    // var re = new RegExp('(\\+212|0)[6785]\\d{8}$');
    var re = new RegExp('^[6785]\\d{8}$');
    if (!re.test(value)) {
      errors['phone'] = 'number invalid';
      setErrors({ ...errors });
    } else {
      setErrors({ ...errors, phone: '' });
    }
  };

  const validateName = (value: any) => {
    setUserName(value);
    if (!value) {
      errors['name'] = 'name is required';
      setErrors({ ...errors });
      //setErrors(errors);
      console.log(errors);
    } else {
      setErrors({ ...errors, name: '' });
    }
  };
  const getUserAddress = async () => {
    if (pickedAddress.fromGPS) {
      let distanceList = await addressesList.map((item: any, index: any) => {
        let distance =
          getDistanceFromLatLonInKm(item.location, pickedAddress.location) *
          1000; //distance km .. * 1000 = m
        return { index, distance };
      });
      distanceList = await distanceList.sort((a: any, b: any) =>
        a.distance > b.distance ? 1 : b.distance > a.distance ? -1 : 0,
      );
      distanceList = await distanceList.filter(
        (item: any) => item.distance < 200,
      );
      if (distanceList.length > 0) {
        dispatch(setPickedAddress(addressesList[distanceList[0].index]));
      }
    }
  };

  const getDistance = async () => {
    if (!pickedAddress.fromGPS) {
      let distance = await getDistanceFromLatLonInKm(
        [customerGPS.latitude, customerGPS.longitude],
        pickedAddress.location,
      );
      if (distance * 1000 > 1000) {
        //distance km .. * 1000 = m
        setIsFarFromPosition(true);
      }
    }
  };
  useEffect(() => {
    console.log('*********new pickedAddress**********', pickedAddress);
    setIsFarFromPosition(false);
    getUserAddress();
    if (customerGPS) {
      getDistance();
    }
  }, [pickedAddress, addressesList]);

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={{ marginHorizontal: 20 }}>
          <View style={{}}>
            <View>
              <Text style={styles.cardTitle}>Informations</Text>
            </View>
            {/*<Text>customerGPS  :{JSON.stringify(customerGPS)}</Text>*/}
            {/*<Text>pickedAddress :{JSON.stringify(pickedAddress)}</Text>*/}
            {/*<Text>addressesList : {JSON.stringify(addressesList)}</Text>*/}
            <TouchableOpacity
              onPress={() => {
                addressesList &&
                addressesList.length > 0 &&
                !pickedAddress.fromGPS &&
                isFarFromPosition
                  ? setShowModal(true)
                  : navigation.navigate(NAVIGATORS.ADDRESS, {
                      action: ADD_ADDRESS,
                    });
              }}>
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  padding: 10,
                  borderWidth: 1,
                  borderColor: '#CDD4D9',
                }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 15, color: '#28B873' }}>
                    Lieu de livraison
                  </Text>
                  {pickedAddress && (
                    <Text
                      style={{ fontSize: 14, color: '#000000' }}
                      numberOfLines={2}>
                      {pickedAddress.address || ''}
                      {pickedAddress.fromGPS && (
                        <Text
                          style={{ fontSize: 12, color: 'red', padding: 10 }}
                          numberOfLines={1}>
                          &nbsp;&nbsp;&nbsp;&nbsp;( Ajouter le détail d'adresse
                          )
                        </Text>
                      )}
                    </Text>
                  )}
                  {isFarFromPosition && (
                    <Text
                      style={{ fontSize: 12, color: 'red' }}
                      numberOfLines={1}>
                      ( Loin de la position actuelle )
                    </Text>
                  )}
                </View>
                <View style={{}}>
                  <FontAwesome
                    style={{ padding: 10 }}
                    name="edit"
                    size={20}
                    color="#28B873"
                  />
                </View>
              </View>
            </TouchableOpacity>
            <View
              style={{
                justifyContent: 'space-around',
                flexDirection: 'row',
                // paddingTop: 10,
              }}>
              <View
                style={{
                  flexDirection: 'column',
                  flex: 1,
                  marginHorizontal: 2,
                }}>
                <TextInput
                  style={{
                    borderColor: errors?.name ? '#d9001a' : '#5eff74',
                    color: 'black',
                    borderBottomWidth: 1,
                    fontSize: 16,
                    // height: 35,
                    // flex: 1,
                  }}
                  placeholder={'Nom'}
                  placeholderTextColor="grey"
                  onChangeText={(value) => {
                    setUserName(value);
                    // validateName(value);
                  }}
                />
                {!!errors?.name && (
                  <Text style={{ fontSize: 12, color: 'red', paddingLeft: 5 }}>
                    {errors?.name}
                  </Text>
                )}
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  flex: 1,
                  marginHorizontal: 2,
                }}>
                <View
                  style={{
                    justifyContent: 'flex-start',
                    flexDirection: 'row',
                  }}>
                  <View
                    style={{
                      borderColor: errors?.phone ? '#d9001a' : '#5eff74',
                      borderBottomWidth: 1,
                    }}>
                    <Text
                      style={{
                        marginTop: 13,
                        fontSize: 16,
                        fontWeight: '600',
                      }}>
                      {selectedCountryCode}
                    </Text>
                  </View>

                  <TextInput
                    keyboardType={'phone-pad'}
                    style={{
                      borderColor: errors?.phone ? '#d9001a' : '#5eff74',
                      color: 'black',
                      borderBottomWidth: 1,
                      fontSize: 16,
                      // height: 35,
                      // flex: 1,
                    }}
                    placeholder={'Tel (Ex : 6********)'}
                    placeholderTextColor="grey"
                    onChangeText={(value) => {
                      validateNumber(value);
                    }}
                  />
                </View>
                {!!errors?.phone && (
                  <Text style={{ fontSize: 12, color: 'red', paddingLeft: 5 }}>
                    {errors?.phone}
                  </Text>
                )}
              </View>
            </View>
            {/*<Text>{JSON.stringify(errors)}</Text>*/}
          </View>

          <View>
            <DeliveryTimeContainer
              selectedDate={selectedDate}
              selectedDeliveryTimeOption={selectedDeliveryTime}
              setTimeDeliveryOption={setTimeDeliveryOption}
              getDateAction={getDateAction}
            />
          </View>
          <View>
            <View>
              <Text style={styles.cardTitle}>Moyen de paiment</Text>
            </View>
            <View
              style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
              <View
                style={{ justifyContent: 'flex-start', flexDirection: 'row' }}>
                <Text style={{ color: '#999999', fontSize: 14 }}>
                  Utiliser vos points Kaalix'Up (20 Pts)
                </Text>
                <FontAwesome
                  style={{ paddingLeft: 10 }}
                  name="info-circle"
                  size={15}
                  color="#28B873"
                />
              </View>
              <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={false ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                value={UsePoint}
                onValueChange={(checked) => {
                  setUsePoint(checked);
                }}
              />
            </View>
            <View>
              <Text style={{ fontSize: 15, marginVertical: 10 }}>
                Choisir un autre moyen de paiement
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row', //Centered vertically
                alignItems: 'center',
                paddingVertical: 5,
              }}>
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row', //Centered vertically
                  alignItems: 'center',
                }}>
                <Image
                  // style={{ width: 50, height: 35, padding: 10 }}
                  source={require('../../assets/images/cash.png')}
                />
                <Text
                  style={{
                    fontSize: 15,
                    textAlign: 'left',
                    paddingHorizontal: 15,
                  }}>
                  Cash
                </Text>
              </View>
              <Text style={{ textAlign: 'center' }}>
                {/*<Text style={{ fontSize: 16, fontWeight: '700' }}>(60 DH)</Text>*/}
              </Text>
              <RoundCheckbox2
                size={22}
                checked={isCash}
                onValueChange={() => {
                  setIsCash(true);
                  setIsCard(false);
                }}
                icon={'checkmark'}
                backgroundColor={'#28B873'}
              />
            </View>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row', //Centered vertically
                alignItems: 'center',
                paddingVertical: 5,
              }}>
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row', //Centered vertically
                  alignItems: 'center',
                }}>
                <Image
                  // style={{ width: 50, height: 35, padding: 10 }}
                  source={require('../../assets/images/carte.png')}
                />
                <Text
                  style={{
                    fontSize: 15,
                    textAlign: 'left',
                    paddingHorizontal: 15,
                  }}>
                  Carte
                </Text>
              </View>
              {cardList && (
                <View
                  style={{
                    justifyContent: 'flex-start',
                    flexDirection: 'row',
                  }}>
                  {selectedCard && (
                    <Text style={{ textAlign: 'center' }}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: '700',
                          color: '#28B873',
                        }}>
                        {(selectedCard || { type: '' }).type +
                          ' ******' +
                          (
                            selectedCard || { numCarte: ' xxxxxxx ' }
                          ).numCarte.split('xxxxxx')[1]}
                      </Text>
                    </Text>
                  )}
                  <TouchableOpacity onPress={() => setShowModalAddCard(true)}>
                    <FontAwesome
                      style={{ paddingLeft: 10 }}
                      name="chevron-down"
                      size={20}
                      color="#00262F"
                    />
                  </TouchableOpacity>
                </View>
              )}
              <RoundCheckbox2
                size={22}
                checked={isCard}
                onValueChange={() => {
                  setIsCard(true);
                  setIsCash(false);
                }}
                icon={'checkmark'}
                backgroundColor={'#28B873'}
              />
            </View>
          </View>
          {/* <View>
            <View>
              <Text style={{ fontSize: 17, paddingVertical: 20 }}>
                Code Promo
              </Text>
            </View>
            <TextInput
              style={{
                borderColor: '#CDD4D9',
                borderWidth: 1,
                marginHorizontal: 5,
                fontSize: 15,
              }}
              placeholder={'Entrer votre code promo'}
            />
          </View> */}
          {/* <View style={{ flex: 1, height: 1, backgroundColor: '#CDD4D9' }} /> */}
          <View>
            <View>
              <Text style={styles.cardTitle}>Détail du Paiement</Text>
            </View>
            {paymentDetail && !loading && (
              <View>
                <View
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text style={{ fontSize: 15 }}>Delivery Price:</Text>
                  <Text style={{ fontSize: 15 }}>
                    {paymentDetail.deliveryPrice + ' DH'}
                  </Text>
                </View>
                <View
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingTop: 10,
                  }}>
                  <Text style={{ fontSize: 15 }}>orderPrice :</Text>
                  <Text style={{ fontSize: 15 }}>
                    {paymentDetail.orderPrice + ' DH'}
                  </Text>
                </View>
                <View
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingTop: 10,
                  }}>
                  <Text style={{ fontSize: 15 }}>promo :</Text>
                  <Text style={{ fontSize: 15 }}>
                    {paymentDetail.promo + ' dh'}
                  </Text>
                </View>
                <View
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingTop: 15,
                  }}>
                  <Text style={{ fontWeight: '700', fontSize: 18 }}>
                    Total :
                  </Text>
                  <Text style={{ fontWeight: '700', fontSize: 18 }}>
                    {paymentDetail.total + ' DH'}
                  </Text>
                </View>
              </View>
            )}
            <View>
              <TouchableOpacity
                style={{
                  flex: 1,
                  marginVertical: 20,
                  backgroundColor: '#28B873',
                  borderRadius: 50,
                  marginHorizontal: 40,
                }}
                onPress={paymentHandler}>
                <Text
                  numberOfLines={1}
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    paddingHorizontal: 40,
                    paddingVertical: 10,
                    fontSize: 16,
                  }}>
                  {isCash ? 'create Order' : 'Proceder au paiment'}
                </Text>
              </TouchableOpacity>
              {/*/!* <Text>loading {JSON.stringify(loading)}</Text>*/}
              {/*<Text>error {JSON.stringify(error)}</Text>*/}
              {/*<Text>data {JSON.stringify(paymentDetail)}</Text>*/}
              {/*<Text>userDetails {JSON.stringify(userDetails)} </Text>*/}
              {/* <Text>pickedAddress {JSON.stringify(pickedAddress)}</Text> */}
              {/* <Text>deliveryPriceDetail {JSON.stringify(deliveryPriceDetail)}</Text>*/}
              {/*<Text>paymentDetail {JSON.stringify(paymentDetail)}</Text>*/}
            </View>
          </View>
        </View>
        <View>
          {/* <Modal
            animationType="slide"
            transparent={true}
            visible={showModalAddCard}
            onRequestClose={() => {
              setShowModalAddCard(false);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                  }}>
                  <Text
                    style={{
                      margin: 20,
                      textAlign: 'left',
                      fontWeight: 'bold',
                      fontSize: 17,
                    }}>
                    Gestion des cartes
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      setShowModalAddCard(false);
                    }}>
                    <Icon
                      style={{ padding: 10 }}
                      name="close"
                      size={20}
                      color="black"
                    />
                  </TouchableOpacity>
                </View>
                <View style={{ borderTopWidth: 1, borderColor: '#0000001A' }}>
                  <CardList />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    borderTopWidth: 1,
                    borderColor: '#0000001A',
                  }}>
                  <TouchableOpacity
                    style={{
                      borderRadius: 15,
                      backgroundColor: '#28B873',
                      flex: 1,
                      marginVertical: 25,
                      marginHorizontal: 20,
                    }}
                    onPress={navigateToAddCard}>
                    <Text
                      style={{
                        color: 'white',
                        textAlign: 'center',
                        paddingHorizontal: 40,
                        paddingVertical: 10,
                        fontSize: 15,
                      }}>
                      Ajouter une nouvelle carte
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal> */}
        </View>
      </ScrollView>
      <CustomModal
        title={'Gestion des cartes'}
        showModal={showModalAddCard}
        setShowModal={setShowModalAddCard}
        actionTitle={'Ajouter une nouvelle carte'}
        mainAction={() => {
          setShowModalAddCard(false);
          navigateToAddCard();
        }}>
        <CardList />
      </CustomModal>
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
          <Ionicons
            name="locate"
            style={{
              fontSize: 25,
              color: '#2F423C',
              paddingVertical: 1,
            }}
          />
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
        {/*    <Ionicons*/}
        {/*      name="location-outline"*/}
        {/*      style={{*/}
        {/*        fontSize: 25,*/}
        {/*        color: '#2F423C',*/}
        {/*        paddingVertical: 1,*/}
        {/*      }}*/}
        {/*    />*/}
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
      <ChooseModal
        title={'Vous êtes loin de votre position GPS'}
        actionTitle={'Oui, je commande avec cette adresse'}
        failedActionTitle={'Non, je commande avec une autre adresse'}
        showModal={showModalFarFromPosition}
        setShowModal={setShowModalFarFromPosition}
        pickedAddress={{ pickedAddress }}
        successAction={async () => {
          await setIsFarFromPosition(false);
          await paymentHandler();
          setShowModalFarFromPosition(false);
        }}
        failedAction={() => {
          setShowModalFarFromPosition(false);
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
    marginVertical: 5,
  },
  switchEnableBorder: {
    borderColor: '#6fa6d3',
    borderWidth: 1,
    fontSize: 14,
  },
  switchDisableBorder: {
    borderColor: '#f2f2f2',
    borderWidth: 1,
    fontSize: 14,
  },
  centeredView: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.71)',
  },
  modalView: {
    marginTop: 150,
    marginHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 17,
    paddingVertical: 20,
  },
});

export interface ICheckoutScreenProps {}

export default CheckoutScreen;

/**
 *
 * CheckoutScreen
 *
 */
