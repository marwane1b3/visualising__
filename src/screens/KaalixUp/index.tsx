/**
 *
 * KaalixUp
 *
 */

import React, { memo,useEffect } from 'react';
import { View, StyleSheet, Image, Dimensions, Text, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import makeSelectKaalixUp,{makeSelectUserLoyaltyData} from './selectors';
import {getUserLoyaltyAction} from './actions';
import reducer from './reducer';
import saga from './saga';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { FormattedMessage } from 'components/FormattedMessage';
import messages from './messages';
import { useNavigation } from '@react-navigation/core';
import { SCREENS } from 'navigators/constants';
import { makeSelectUserDetailsData } from "containers/UserDetails/selectors";
const stateSelector = createStructuredSelector( {
  kaalixUp: makeSelectKaalixUp(),
  user:makeSelectUserDetailsData,
  userLoyalty:makeSelectUserLoyaltyData
} );

const key = 'kaalixUp';

export const KaalixUp: React.NamedExoticComponent<IKaalixUpProps> = memo( ( { } ) =>
{
  useInjectReducer( { key, reducer } );
  useInjectSaga( { key, saga } );

  /* eslint-disable no-unused-vars */
  const { kaalixUp,user,userLoyalty } = useSelector( stateSelector );
  const dispatch = useDispatch();

  const navigation = useNavigation();
  const navigateToPointsHistory = () =>
  {
    navigation.navigate( SCREENS.HISORY );
  };
  const navigateToWinPoints = () =>
  {
    navigation.navigate( SCREENS.WINPOINTS );
  };
  const navigateToKaalixWinPoints = () =>
  {
    navigation.navigate( SCREENS.KAALIX_WIN_POINTS );
  };
  /* eslint-enable no-unused-vars */
  userLoyalty && console.log(userLoyalty);
  
  useEffect(() => {
    user && user.entityId && dispatch(getUserLoyaltyAction(user.entityId))
  }, [dispatch,user])

  return (
    <View style={ styles.container }>
      <View style={ styles.imageViewStyle }>
        <Image source={

          {
            uri: 'https://filestore.community.support.microsoft.com/api/images/72e3f188-79a1-465f-90ca-27262d769841'
          }
        }

          style={ styles.imageStyle }
        />
      </View>
      <View style={ styles.viewtextStyle }>
        <Text style={ styles.textStyle }>Vous Avez </Text>
        <View style={ styles.viewPointsStyle }>
          <Text style={ styles.pointsNumberStyle }>{userLoyalty && userLoyalty.kaalixLoyalty} </Text>
          <Text style={ styles.pointsText }>Points</Text>
        </View>
      </View>

      <View style={ {
        padding: 28,

      } }>
        <TouchableOpacity style={ { marginBottom: 22 } } onPress={ navigateToPointsHistory }>
          <View style={ styles.insideTouche }>
            <Text style={ styles.textTouchable }>Voir mon historiques des points</Text>
            <Icon name="keyboard-arrow-right" size={ 20 } color='#CDD4D9' />
          </View>
        </TouchableOpacity>
        <View style={ styles.devider }></View>
        <TouchableOpacity onPress={ navigateToKaalixWinPoints } style={ { marginBottom: 22 } }>
          <View style={ styles.insideTouche } >
            <Text style={ styles.textTouchable }>Gagner des points dans le magasin</Text>
            <Icon name="keyboard-arrow-right" size={ 20 } color='#CDD4D9' />
          </View>
        </TouchableOpacity>
        <View style={ styles.devider }></View>
        <TouchableOpacity onPress={ navigateToWinPoints }>
          <View style={ styles.insideTouche } >
            <Text style={ styles.textTouchable }>Comment gagner des points</Text>
            <Icon name="keyboard-arrow-right" size={ 20 } color='#CDD4D9' />
          </View>
        </TouchableOpacity>


      </View>
    </View>
  );
} );

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',

  },
  imageStyle: {
    width: Dimensions.get( 'window' ).width,
    height: Dimensions.get( 'window' ).width - 165
  },
  imageViewStyle: {
    marginTop: -4,
    marginBottom: 12
  },
  viewtextStyle: {
    marginHorizontal: 28,
    marginBottom: 4,
    marginTop: 6
  },
  viewPointsStyle: {
    flexDirection: 'row',
    marginRight: 12,
    alignItems: 'center'
  },
  pointsNumberStyle: {
    fontSize: 38,
    fontWeight: "bold"
  },
  textStyle: {
    fontSize: 17,
    marginBottom: 2
  },
  pointsText: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: -7,
    color: '#00262F'
  },
  devider: {
    width: "98%",
    backgroundColor: '#CDD4D9',
    height: 1,
    marginBottom: 15
  },
  insideTouche: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textTouchable: {
    fontSize: 19
  }
} );


export interface IKaalixUpProps { }



export default KaalixUp;
