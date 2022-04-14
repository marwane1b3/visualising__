/**
 *
 * WinSmilesScreen
 *
 */

import React, { memo } from 'react';
import { View, StyleSheet,Text,TouchableOpacity, Image,Dimensions} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import makeSelectWinSmilesScreen from './selectors';
import reducer from './reducer';
import saga from './saga';
import { FormattedMessage } from 'components/FormattedMessage';
import messages from './messages';
import { useNavigation } from '@react-navigation/core';
import {SCREENS} from 'navigators/constants'
import Icon from 'react-native-vector-icons/FontAwesome';
import TopTabBar from 'components/TopTabBar'
import TabNavigator from 'components/TabNavigator'
import {TabNavigatorContainer} from '@react-navigation/native'

const stateSelector = createStructuredSelector({
  winSmilesScreen: makeSelectWinSmilesScreen(),
});

const key = 'winSmilesScreen';

export const WinSmilesScreen: React.NamedExoticComponent<IWinSmilesScreenProps> = memo(({}) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  /* eslint-disable no-unused-vars */
  const { winSmilesScreen } = useSelector(stateSelector);
  const dispatch = useDispatch();
  const navigation = useNavigation();
   const navigateToKaalixSmile = () =>
  {
    navigation.navigate( SCREENS.KAALIX_SMILES );
  };
  /* eslint-enable no-unused-vars */

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
          Comment gagner des smiles
        </Text>
      </View>
      
      <View
      style={{
        marginTop:56,
        justifyContent:'center',
        alignItems: 'center',
      }}
      >
            <Image
              resizeMode="contain"
                  style={styles.imageStyle}
                  source={require('../../assets/images/smiles.png')}
             />
                
            <Text
            style={styles.titleStyle}
            >Comment puis-je gagner des smiles</Text>
       
             <Text
            style={styles.descStyle}
            >Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna.</Text>
      </View>
              <TopTabBar  />
              
   
      
      
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#FFFFFF'
  },
  imageStyle:{
     width:250, 
     height:250,
     marginBottom:-11
  },
  descStyle:{
    padding:24,
    fontSize:13,
    textAlign:'center',
    marginTop:-9,
    marginBottom:-4
  },
  titleStyle:{
    fontSize:18,
    fontWeight:"700",
    
  }
});


export interface IWinSmilesScreenProps {}



export default WinSmilesScreen;
