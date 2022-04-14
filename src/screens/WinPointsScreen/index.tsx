/**
 *
 * WinPointsScreen
 *
 */

import React, { memo } from 'react';
import { View, StyleSheet, Image, Dimensions, Text, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import makeSelectWinPointsScreen from './selectors';
import reducer from './reducer';
import saga from './saga';
import { FormattedMessage } from 'components/FormattedMessage';
import messages from './messages';
import { useNavigation } from '@react-navigation/core';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SCREENS } from 'navigators/constants';

const stateSelector = createStructuredSelector( {
  winPointsScreen: makeSelectWinPointsScreen(),
} );

const key = 'winPointsScreen';

export const WinPointsScreen: React.NamedExoticComponent<IWinPointsScreenProps> = memo( ( { } ) =>
{
  useInjectReducer( { key, reducer } );
  useInjectSaga( { key, saga } );

  /* eslint-disable no-unused-vars */

  const { winPointsScreen } = useSelector( stateSelector );
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const navigateToKaalixUp = () =>
  {
    navigation.navigate( SCREENS.KAALIXUP );
  };
  /* eslint-enable no-unused-vars */

  return (
    <View style={ styles.container }>
      <View style={ { padding: 0, margin: 0 } }>
        <Image source={

          {
            uri: 'https://filestore.community.support.microsoft.com/api/images/72e3f188-79a1-465f-90ca-27262d769841'
          }
        }

          style={ {
            width: Dimensions.get( 'window' ).width,
            height: Dimensions.get( 'window' ).width - 85,
          } }
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
          Comment gagner des points
        </Text>
      </View>
      <View style={ {
        padding: 25
      } }>
        <Text style={ styles.title }>Comment fonctionne Kaalix'Up</Text>
        <Text style={ styles.description }>Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
        sed diam nonumy eirmod tempor invidunt ut labore et dolore magna
        aliquyam erat, sed diam voluptua. At vero eos et accusam et
          justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet</Text>
      </View>
    </View>
  );
} );

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
  },
  description: {
    fontSize: 16,
    marginTop: 12,
    fontWeight: '600',
    color: "#00262F",
  }
} );


export interface IWinPointsScreenProps { }



export default WinPointsScreen;
