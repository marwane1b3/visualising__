/**
 *
 * CardManagerScreen
 *
 */

import React, { useEffect, useState } from 'react';
import
{
  View,
  StyleSheet,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import makeSelectCardManagerScreen, {
  makeSelectCardListScreen,
  makeSelectErrorScreen,
  makeSelectLoadingScreen,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getCardsAction } from './actions';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-community/async-storage';
import { getUserDetailsAction } from '../../containers/UserDetails/actions';
import
{
  makeSelectError,
  makeSelectLoading,
  makeSelectUserDetailsData,
} from '../../containers/UserDetails/selectors';

const stateSelector = createStructuredSelector( {
  cardManagerScreen: makeSelectCardManagerScreen(),
  cardList: makeSelectCardListScreen,
  error: makeSelectErrorScreen,
  loading: makeSelectLoadingScreen,
  userDetails: makeSelectUserDetailsData,
  user_loading: makeSelectLoading,
  user_error: makeSelectError,
} );

const key = 'cardManagerScreen';

export const CardManagerScreen: React.FC<ICardManagerScreenProps> = ( { } ) =>
{
  useInjectReducer( { key, reducer } );
  useInjectSaga( { key, saga } );

  const {
    cardManagerScreen,
    cardList,
    error,
    loading,
    userDetails,
    user_loading,
    user_error,
  } = useSelector( stateSelector );
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const getUserDetails = async () =>
  {
    const token = await AsyncStorage.getItem( 'refreshToken' );
    console.log( { token } );
    if ( token )
    {
      dispatch( getUserDetailsAction( token ) );
    }
  };
  useEffect( () =>
  {
    //getUserDetails();

    if ( userDetails )
    {
      console.log( userDetails );

      console.log( 'id', userDetails._id )
      console.log( 'entityId', userDetails.entityId )
      dispatch( getCardsAction( { customerId: userDetails.entityId } ) );
    }
  }, [] );
  const [ SelectedCard, setSelectedCard ] = useState( false );
  return (
    <ScrollView style={ styles.container }>
      <View style={ { marginHorizontal: 20 } }>
        <View
          style={ {
            justifyContent: 'flex-start',
            flexDirection: 'row',
            paddingTop: 40,
          } }>
          <Icon
            style={ { padding: 5, paddingRight: 10 } }
            name="arrow-left"
            size={ 20 }
            color="#28B873"
            onPress={ () => navigation.goBack() }
          />
          <Text
            style={ {
              padding: 2,
              color: '#2F423C',
              fontSize: 19,
              fontWeight: '700',
            } }>
            Vérification
          </Text>
        </View>
        <View>
          <View>
            <Text
              style={ { fontSize: 17, paddingVertical: 15, fontWeight: 'bold' } }>
              méthode de paiement
            </Text>
          </View>
          <View
            style={ {
              justifyContent: 'space-between',
              flexDirection: 'row', //Centered vertically
              alignItems: 'center',
              paddingVertical: 5,
            } }>
            <View
              style={ {
                justifyContent: 'space-between',
                flexDirection: 'row', //Centered vertically
                alignItems: 'center',
              } }>
              <Image
                // style={{ width: 50, height: 35, padding: 10 }}
                source={ require( '../../assets/images/carte.png' ) }
              />
              <Text
                style={ {
                  fontSize: 15,
                  textAlign: 'left',
                  paddingHorizontal: 15,
                } }>
                Card
              </Text>
            </View>
            <Text
              style={ {
                textAlign: 'center',
                fontSize: 16,
                fontWeight: '700',
                color: '#28B873',
              } }>
              VISA****2343
            </Text>
          </View>
          <View
            style={ {
              justifyContent: 'space-between',
              flexDirection: 'row', //Centered vertically
              alignItems: 'center',
              paddingVertical: 5,
            } }>
            <View
              style={ {
                justifyContent: 'space-between',
                flexDirection: 'row', //Centered vertically
                alignItems: 'center',
              } }>
              <Image
                // style={{ width: 50, height: 35, padding: 10 }}
                source={ require( '../../assets/images/kaalixPay.png' ) }
              />
              <Text
                style={ {
                  fontSize: 15,
                  textAlign: 'left',
                  paddingHorizontal: 15,
                } }>
                KaalixPay
              </Text>
            </View>
            <Text style={ { textAlign: 'center' } }>
              <Text style={ { fontSize: 16, fontWeight: '700' } }>Solde :</Text>
              <Text style={ { fontSize: 16, fontWeight: '600' } }> 100 DH</Text>
            </Text>
          </View>
          <View
            style={ {
              justifyContent: 'space-between',
              flexDirection: 'row', //Centered vertically
              alignItems: 'center',
              paddingVertical: 5,
            } }>
            <View
              style={ {
                justifyContent: 'space-between',
                flexDirection: 'row', //Centered vertically
                alignItems: 'center',
              } }>
              <Image
                // style={{ width: 50, height: 35, padding: 10 }}
                source={ require( '../../assets/images/cash.png' ) }
              />
              <Text
                style={ {
                  fontSize: 15,
                  textAlign: 'left',
                  paddingHorizontal: 15,
                } }>
                Cash
              </Text>
            </View>
            <Text style={ { textAlign: 'center' } }>
              <Text style={ { fontSize: 16, fontWeight: '700' } } />
              <Text style={ { fontSize: 16, fontWeight: '600' } } />
            </Text>
          </View>
        </View>
        <View>
          <View>
            <Text
              style={ { fontSize: 17, paddingVertical: 15, fontWeight: 'bold' } }>
              Gestion des cartes
            </Text>
          </View>
          <View>
            { cardList &&
              cardList.map( ( item: any, index: number ) =>
              {
                return (
                  <TouchableOpacity>
                    <Text
                      key={ index }
                      style={ {
                        fontSize: 16,
                        padding: 8,
                        textTransform: 'capitalize',
                        backgroundColor: item.selected ? '#28B873' : '#000000',
                      } }>
                      <Text style={ { margin: 10, fontWeight: 'bold' } }>
                        { item.type }
                      </Text>
                      <Text>{ item.numCarte + item.selected }</Text>
                    </Text>
                  </TouchableOpacity>
                );
              } ) }
          </View>
        </View>
        <View>
          <View>
            <Text
              style={ { fontSize: 17, paddingVertical: 15, fontWeight: 'bold' } }>
              Autres
            </Text>
          </View>
          <View>
            <Text style={ { fontSize: 15, paddingVertical: 2 } }>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a
            </Text>
          </View>
          <View>
            <TouchableOpacity
              style={ {
                borderRadius: 15,
                backgroundColor: '#28B873',
                flex: 1,
                marginHorizontal: 60,
                marginVertical: 20,
              } }
              onPress={ () => { } }>
              <Text
                style={ {
                  color: 'white',
                  textAlign: 'center',
                  paddingHorizontal: 40,
                  paddingVertical: 10,
                  fontSize: 16,
                } }>
                Confirmer
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
} );

export interface ICardManagerScreenProps { }

export default CardManagerScreen;
