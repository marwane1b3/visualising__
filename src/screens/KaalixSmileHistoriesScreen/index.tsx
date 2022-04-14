/**
 *
 * KaalixSmileHistoriesScreen
 *
 */

import React, { memo } from 'react';
import { View, StyleSheet,TouchableOpacity,Text,FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import makeSelectKaalixSmileHistoriesScreen from './selectors';
import reducer from './reducer';
import saga from './saga';
import { FormattedMessage } from 'components/FormattedMessage';
import messages from './messages';
import SmilesHistoriesItem from 'components/SmilesHistoriesItem';
import { useNavigation } from '@react-navigation/core';
import {SCREENS} from 'navigators/constants'


const stateSelector = createStructuredSelector({
  kaalixSmileHistoriesScreen: makeSelectKaalixSmileHistoriesScreen(),
});

const key = 'kaalixSmileHistoriesScreen';

export const KaalixSmileHistoriesScreen: React.NamedExoticComponent<IKaalixSmileHistoriesScreenProps> = memo(({}) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  /* eslint-disable no-unused-vars */
  const { kaalixSmileHistoriesScreen } = useSelector(stateSelector);
  const dispatch = useDispatch();
   const navigation = useNavigation();
   const navigateToKaalixSmile = () =>
  {
    navigation.navigate( SCREENS.KAALIX_SMILES );
  };
  /* eslint-enable no-unused-vars */
 const DATA = [
    {
      id: 1,
      name: 'Pizza Bilane',
      cmd: 'X1222',
      date: '17-03-2021 17h41',
      smiles: 100
    },
    {
      id: 2,
      name: 'Pizza Bilane',
      cmd: 'X1222',
      date: '17-03-2021 17h41',
      smiles: 500
    },
    {
      id: 3,
      name: 'Pizza Bilane',
      cmd: 'X1222',
      date: '17-03-2021 17h41',
      smiles: 100
    },
    {
      id: 4,
      name: 'Pizza Bilane',
      cmd: 'X1222',
      date: '17-03-2021 17h41',
      smiles: 500
    },
  ]
 const renderItem = ( { item }: any ) => (
    <SmilesHistoriesItem name={ item.name } cmd={ item.cmd } date={ item.date } smiles={ item.smiles } />
  );
  return (
    <View style={styles.container}>
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
          onPress={ () => navigateToKaalixSmile() }
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
          Historique de kaalix'Smile
        </Text>
      </View>
      <View style={ { height: '100%', marginTop: 100, } }>

        <FlatList
          data={ DATA }
          renderItem={ renderItem }
          keyExtractor={ ( item: any ) => item.id }
        />

      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});


export interface IKaalixSmileHistoriesScreenProps {}



export default KaalixSmileHistoriesScreen;
