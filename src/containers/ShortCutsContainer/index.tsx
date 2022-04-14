import React, { useEffect, useState } from 'react';
import
{
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { colors } from 'theme/colors';
import theme from 'theme/theme';
import LinearGradient from 'react-native-linear-gradient';
import KaalixSmile from '../../../assets/icons/Groupe 4398.svg';
import Parreiner from '../../../assets/icons/Groupe 4402.svg';
import KaalixUp from '../../../assets/icons/Groupe 4409.svg';
import Cartes from '../../../assets/icons/Groupe 4507.svg';
import { useNavigation } from '@react-navigation/core';
import { NAVIGATORS, SCREENS } from 'navigators/constants';
const ShortCutsContainer: React.FC<IShortCutsContainer> = ( { } ) =>
{
  // const { services } = useSelector(stateSelector);
  // const dispatch = useDispatch();

  const data = [
    { name: 'Parrainer', iconName: <Parreiner width={ 45 } height={ 45 } /> },
    { name: 'Mes Cartes', iconName: <Cartes width={ 45 } height={ 45 } /> },
    { name: 'kaalixSmile', iconName: <KaalixSmile width={ 45 } height={ 45 } /> },
    { name: "kaalix'up", iconName: <KaalixUp width={ 45 } height={ 45 } /> },
  ];
  /** 'Parrainer', 'Mes Cartes', 'kaalixSmile', "kaalix'up" */
  const renderItem = ( { item, index }: any ) => (
    <TouchableOpacity
      style={ styles.container }
      onPress={ () =>
      {
        if ( index == 1 )
        {
          navigateToMyCards();
        }
        index == 2 && navigateToKaalixSmiles()
        index == 3 && navigateToKaalixUp()

      } }>
      {/* <View style={styles.containerItem} /> */ }
      { item.iconName }
      <Text style={ styles.serviceName }>{ item.name }</Text>
    </TouchableOpacity>
  );

  const navigation = useNavigation();
  /* eslint-enable no-unused-vars */

  const navigateToMyCards = () =>
  {
    navigation.navigate( SCREENS.MY_CARDS );
  };
  const navigateToKaalixUp = () =>
  {
    navigation.navigate( SCREENS.KAALIXUP );
  };
  const navigateToKaalixSmiles = () =>
  {
    navigation.navigate( SCREENS.KAALIX_SMILES );
  };
  return (
    <>
      <View style={ styles.positionB }>
        <FlatList
          data={ data }
          renderItem={ renderItem }
          keyExtractor={ ( item, index ) => index.toString() }
          numColumns={ 4 }
        />
      </View>
      <LinearGradient
        start={ { x: 1, y: 1 } }
        end={ { x: 1, y: 0 } }
        colors={ [ '#CDD4D9', '#FFF' ] }
        style={ {
          position: 'absolute',
          height: 12,
          borderRadius: 15,
          marginLeft: 20,
          width: '90%',
          bottom: 20,
        } }></LinearGradient>
    </>
  );
};
const styles = StyleSheet.create( {
  positionB: {
    marginVertical: 20,
    // marginTop: 15,

    //height: 100,
    alignItems: 'center',
    borderRadius: 15,
    width: '90%',
    marginLeft: 20,
    padding: 15,
    elevation: 2,
    shadowRadius: 15,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderColor: '#CDD4D9',
  },

  container: {
    alignItems: 'center',
    padding: 12,
  },
  positionC: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    //borderColor: '#1583D8',
    width: '100%',
    margin: 5,
    paddingVertical: 5,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },
  containerItem: {
    borderWidth: 1,
    marginHorizontal: 12,
    // marginVertical: 10,
    width: 60,
    height: 60,
    borderRadius: 1,
    backgroundColor: '#0064FE',
  },
  serviceName: {
    color: theme.palette.default.dark,
    // fontFamily: 'Nova-regular',
    fontSize: 14,
    paddingVertical: 5,
    //fontWeight: 'bold',
  },
} );
export interface IShortCutsContainer { }

export default ShortCutsContainer;
