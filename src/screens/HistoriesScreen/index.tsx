/**
 *
 * HistoriesScreen
 *
 */

import React, { memo } from 'react';
import { View, StyleSheet, FlatList, Text, Dimensions, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import makeSelectHistoriesScreen from './selectors';
import reducer from './reducer';
import saga from './saga';
import { FormattedMessage } from 'components/FormattedMessage';
import messages from './messages';
import Item from 'components/Item';
import { useNavigation } from '@react-navigation/core';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SCREENS } from 'navigators/constants';

const stateSelector = createStructuredSelector( {
  historiesScreen: makeSelectHistoriesScreen(),
} );

const key = 'historiesScreen';


export const HistoriesScreen: React.NamedExoticComponent<IHistoriesScreenProps> = memo( ( { } ) =>
{
  useInjectReducer( { key, reducer } );
  useInjectSaga( { key, saga } );

  /* eslint-disable no-unused-vars */
  const { historiesScreen } = useSelector( stateSelector );
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const navigateToKaalixUp = () =>
  {
    console.log( " clicked " )
    navigation.navigate( SCREENS.KAALIXUP );
  };
  /* eslint-enable no-unused-vars */

  const DATA = [
    {
      id: 1,
      name: 'Pizza Bilane',
      cmd: 'X1222',
      date: '17-03-2021 17h41',
      points: 100
    },
    {
      id: 2,
      name: 'Pizza Bilane',
      cmd: 'X1222',
      date: '17-03-2021 17h41',
      points: 500
    },
    {
      id: 3,
      name: 'Pizza Bilane',
      cmd: 'X1222',
      date: '17-03-2021 17h41',
      points: 100
    },
    {
      id: 4,
      name: 'Pizza Bilane',
      cmd: 'X1222',
      date: '17-03-2021 17h41',
      points: 500
    },
  ]

  const renderItem = ( { item }: any ) => (
    <Item name={ item.name } cmd={ item.cmd } date={ item.date } points={ item.points } />
  );
  return (
    <View style={ styles.container }>
      <View style={ { height: '100%', marginTop: 100, } }>

        <FlatList
          data={ DATA }
          renderItem={ renderItem }
          keyExtractor={ ( item: any ) => item.id }
        />

      </View>
      <View
        style={ {
          justifyContent: 'flex-start',
          flexDirection: 'row',
          paddingTop: 40,
          paddingHorizontal: 15,
          backgroundColor: 'transparent',
          position: 'absolute',
        } }>
        <TouchableOpacity
          onPress={ () => navigateToKaalixUp() }
        >
          <Icon
            style={ { padding: 5, paddingRight: 10 } }
            name="arrow-left"
            size={ 20 }
            color="#28B873"
          />
        </TouchableOpacity>

        <Text
          style={ {
            padding: 2,
            color: '#2F423C',
            fontSize: 19,
            fontWeight: '700',
          } }>
          Historique de kaalix'up
        </Text>
      </View>
    </View >
  );
} );

const styles = StyleSheet.create( {
  container: {
    backgroundColor: '#FFFFFF',
  },
} );


export interface IHistoriesScreenProps { }



export default HistoriesScreen;
