/**
 *
 * KaalixSmilesScreen
 *
 */

import React, { memo } from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import LinearGradient from 'react-native-linear-gradient';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import makeSelectKaalixSmilesScreen from './selectors';
import reducer from './reducer';
import saga from './saga';
import Icon from "react-native-vector-icons/MaterialIcons"
import { FormattedMessage } from 'components/FormattedMessage';
import messages from './messages';
import SmileItem from 'components/SmileItem';
import { useNavigation } from '@react-navigation/core';
import {SCREENS } from 'navigators/constants'
const stateSelector = createStructuredSelector( {
  kaalixSmilesScreen: makeSelectKaalixSmilesScreen(),
} );

const key = 'kaalixSmilesScreen';

export const KaalixSmilesScreen: React.NamedExoticComponent<IKaalixSmilesScreenProps> = memo( ( { } ) =>
{
  useInjectReducer( { key, reducer } );
  useInjectSaga( { key, saga } );

  /* eslint-disable no-unused-vars */
  const { kaalixSmilesScreen } = useSelector( stateSelector );
  const dispatch = useDispatch();
  const navigation=useNavigation()
  /* eslint-enable no-unused-vars */

  const DATA = [
    {
      id: 1,
      name: "Sumo Suchi",
      numSmiles: +3
    },
    {
      id: 2,
      name: "Sumo Suchi",
      numSmiles: -5
    },
    {
      id: 3,
      name: "Sumo Suchi",
      numSmiles: +10
    },
    {
      id: 4,
      name: "Sumo Suchi",
      numSmiles: +10
    },
    {
      id: 5,
      name: "Sumo Suchi",
      numSmiles: +10
    },
    {
      id: 6,
      name: "Sumo Suchi",
      numSmiles: +10
    },
  ]
  const renderItem = ( { item }: any ) => (
    <SmileItem name={ item.name } numSmiles={ item.numSmiles } />
  );
  const navigateToSmilesHistory =()=>{
    navigation.navigate(SCREENS.KAALIX_SMILE_HISTORIES )
  }
  const navigateToWinSmiles =()=>{
    navigation.navigate(SCREENS.KAALIX_WIN_SMILES )
  }

  return (
    <View style={ styles.container }>
      <View style={ styles.container }>
        <LinearGradient colors={ [ '#28B873', '#18CC60' ] } start={ { x: 0, y: 0 } } end={ { x: 1, y: 0 } } style={ styles.linearGradient }>
          <View style={ styles.innerLinear }>
            <Text style={ styles.textTitle }>Membre</Text>
          </View>
          <View style={ styles.viewContent }>
            <View
              style={ styles.lineStyle }
            ></View>
            <View>
              <Icon name="emoji-emotions" size={ 26 } color='#FFFFFF' />
            </View>
          </View>
          <Text
            style={ styles.textDesc }
          >Obtenez 300 Smiles supplémentaires avant le 31 mars pour passer au statut Silver</Text>
          <LinearGradient colors={ [ '#2EBB66', '#0BB24D' ] } start={ { x: 0, y: 0 } } end={ { x: 1, y: 0 } } style={ styles.bottomLinear }>
            <TouchableOpacity>
              <View
                style={ styles.insideBottomlinear }
              >
                <Text style={ { color: "#FFFFFF" } }>Découvrir les avantages de chaque statut</Text>
                <Icon name="keyboard-arrow-right" size={ 20 } color='#FFFFFF' />
              </View>
            </TouchableOpacity>
          </LinearGradient>
        </LinearGradient>

        <View style={ { backgroundColor: "#FFFFFF", marginBottom: 10, paddingTop: 15 } }>
          <View style={ styles.viewtextStyle }>
            <Text style={ styles.textStyle }>Vous Avez </Text>
            <View style={ styles.viewPointsStyle }>
              <Text style={ styles.pointsNumberStyle }>200 </Text>
              <Text style={ styles.pointsText }>Smiles</Text>
            </View>
          </View>

          <View style={ { padding: 28 } }>
            <TouchableOpacity style={ { marginBottom: 22 } }
            onPress={ navigateToSmilesHistory }
            >
              <View style={ styles.insideTouche }>
                <Text style={ styles.textTouchable }>Voir mon historiques des smiles</Text>
                <Icon name="keyboard-arrow-right" size={ 20 } color='#CDD4D9' />
              </View>
            </TouchableOpacity>
            <View style={ styles.devider }></View>
            <TouchableOpacity
            onPress={ navigateToWinSmiles }
            >
              <View style={ styles.insideTouche } >
                <Text style={ styles.textTouchable }>Comment gagner des smiles</Text>
                <Icon name="keyboard-arrow-right" size={ 20 } color='#CDD4D9' />
              </View>
            </TouchableOpacity>


          </View>
        </View>
        <View style={ { backgroundColor: '#FFFFFF', padding: 25, height: 300 } }>
          <ScrollView>
          <Text style={ {
            color: "#00262F",
            fontSize: 20,
            fontWeight: '700',
          } }>Les derniers smiles gagnés</Text>

          <FlatList
            data={ DATA }
            renderItem={ renderItem }
            keyExtractor={ ( item: any ) => item.id }
          />
          </ScrollView>
        </View>
      </View>
    </View>
  );
} );

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    backgroundColor: '#F1F2F6',
  },
  linearGradient: {
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 9,
    width: Dimensions.get( 'window' ).width - 35,
    height: 180,
    alignSelf: 'center',
    marginTop: 15,
  },
  innerLinear: {
    paddingTop: 15,
    paddingLeft: 15
  },
  textTitle: {
    fontSize: 23,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 1
  },
  viewContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  lineStyle: {
    width: '86%',
    height: 3,
    backgroundColor: '#FFFFFF',
    marginLeft: 9,
    borderRadius: 9
  },
  bottomLinear: {
    bottom: 0,
    height: 30,
    width: "108.6%",
    position: 'absolute',
    right: 0,
  },
  textDesc: {
    padding: 9,
    fontSize: 15,
    color: '#FFFFFF',
    marginLeft:6
  },
  insideBottomlinear: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 30,
    marginRight: 27,
    marginTop: 2,
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


export interface IKaalixSmilesScreenProps { }



export default KaalixSmilesScreen;
