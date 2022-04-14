/**
 *
 * KaalixWinPointsScreen
 *
 */

import React, { memo,useState,useEffect } from 'react';
import { View, StyleSheet, Text, Picker,TouchableOpacity,LogBox , TextInput, FlatList, Dimensions, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import makeSelectKaalixWinPointsScreen from './selectors';
import reducer from './reducer';
import saga from './saga';
import { FormattedMessage } from 'components/FormattedMessage';
import messages from './messages';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/core';
import { SCREENS } from 'navigators/constants';
import Search from '../../../tools/logo/Tracé 78.svg';

const stateSelector = createStructuredSelector({
  kaalixWinPointsScreen: makeSelectKaalixWinPointsScreen(),
});

const key = 'kaalixWinPointsScreen';

export const KaalixWinPointsScreen: React.NamedExoticComponent<IKaalixWinPointsScreenProps> = memo(({}) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  /* eslint-disable no-unused-vars */
 LogBox.ignoreAllLogs()
  const { kaalixWinPointsScreen } = useSelector(stateSelector);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const navigateToKaalixUp = () =>
  {
    navigation.navigate( SCREENS.KAALIXUP );
  };
  /* eslint-enable no-unused-vars */
const DATA=[
    { 
      id:1,
      name: "Pizza Blane",
      points:50,
      address:"N145 bloc 12 Quartier Kaalix ",
      city: "Casablanca",
      amount: 100,
      pointsWithAmount: 5,
      image:'https://www.mycuisine.com/wp-content/uploads/2018/12/burger-rossini.jpg',
      category:'massage'
    },
    { 
      id:2,
      name: "Pizza Blane",
      points:50,
      address:"N145 bloc 12 Quartier Kaalix ",
      city: "Mohammadia",
      amount: 300,
      pointsWithAmount: 25,
      image:'https://www.mycuisine.com/wp-content/uploads/2018/12/burger-rossini.jpg',
      category:'food'
    },
    { 
      id:3,
      name: "Pizza Blane",
      points:50,
      address:"N145 bloc 12 Quartier Kaalix ",
      city: "Rabat",
      amount: 100,
      pointsWithAmount: 5,
      image:'https://www.mycuisine.com/wp-content/uploads/2018/12/burger-rossini.jpg',
      category:'service'
    },
    { 
      id:4,
      name: "Pizza Blane",
      points:50,
      address:"N145 bloc 12 Quartier Kaalix ",
      city: "Tanger",
      amount: 200,
      pointsWithAmount: 10,
      image:'https://www.mycuisine.com/wp-content/uploads/2018/12/burger-rossini.jpg',
      category:'other'
    },
    { 
      id:5,
      name: "Pizza Blane",
      points:50,
      address:"N145 bloc 12 Quartier Kaalix ",
      city: "Marrakech",
      amount: 200,
      pointsWithAmount: 10,
      image:'https://www.mycuisine.com/wp-content/uploads/2018/12/burger-rossini.jpg',
      category:'delivries'
    },
    { 
      id:6,
      name: "Pizza Blane",
      points:50,
      address:"N145 bloc 12 Quartier Kaalix ",
      city: "Marrakech",
      amount: 200,
      pointsWithAmount: 10,
      image:'https://www.mycuisine.com/wp-content/uploads/2018/12/burger-rossini.jpg',
      category:'massage'
    },
  ]
  const [stores,setStores]=useState(DATA)
  const [searchCity,setSearchCity]=useState(DATA)
  const [city, setCity]=useState('')
   const [selectedValue, setSelectedValue] = useState("");
 
  
  const renderItem = ( { item }: any ) => (
    <View
    style={ {
      flexDirection: 'row',
    }}
    >
      <View >
      <Image source={{  uri: item.image}}
        style={ {
          width: 180,
          height: 110,
          borderRadius:15,
          marginBottom:12,
        } }
      />
        <Text
        style={ {
          position: 'absolute',
          fontSize:16,
          color: '#FFFFFF', 
          alignSelf: 'center',
          fontWeight: '700',
          marginTop:12,
        }}
        >{item.name}</Text>
        <View
        style={ {
          position: 'absolute',
          bottom: 12,
          backgroundColor: '#FF9F2F',
          padding:2,
          borderRadius: 15,
          width:105,
          alignItems: 'center',
          right: -0.2,
          borderTopRightRadius:0
        }}
        >
          <Text
          style={ {
            fontSize:15,
            fontWeight: '700',
            color: '#FFFFFF',
          }}
          >{item.points+' points'}</Text>
        </View>
      </View>
     <View
     style={{
       marginLeft:12,
       flexDirection: 'column',
       width: 180,
     }}
     >
       <Text
       style={{
         fontWeight: 'bold',
       }}
       > {item.address}</Text>
       <Text
       style={{
         fontWeight: 'bold',
       }}
       > {item.city}</Text>
       <Text>{item.amount + ' Dirhams = '+ item.pointsWithAmount +" points" }</Text>
     </View>
    </View>
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
          Gagner Des points dans le magasin
        </Text>
      </View>
     
      <View style={{
        marginTop:66,
        padding:15
      }}>
     <View style={{
        margin:10,
      }}>
        {/* <Search/> */}
        <TextInput 
          placeholder='Recherche par ville'
          value={city}
          onChangeText={text=>setCity(text)}
          style={{
            borderWidth:2,
            borderRadius:50,
            margin:12,
            borderColor:'#28B873',
            width:"100%",
            marginLeft:1,
            paddingHorizontal:12
          }}
        />
        <Picker
        // selectedValue={selectedValue}
        style={{ height: 50, width: '100%',margin:12}}
        onValueChange={(itemValue, itemIndex) => {
        if(city && itemValue ){
          const newData=stores.filter(item=>{
            const itemData= item.category===itemValue ? item.city.toUpperCase() : ''.toUpperCase()
            return itemData.indexOf(city.toUpperCase()) > -1
          })
          setSearchCity(newData)
          setCity(city)
      }else{
        setSearchCity(stores)
        setCity(city)
      }
    
        
        }}
      >
        <Picker.Item label="choisissez une categorie" value="" />
        {
          DATA && DATA.map(category=>(
            <Picker.Item key={category.id} label={category.category} value={category.category} />
          ))
        }
        
      </Picker>
      </View>
         <FlatList
            data={ searchCity && searchCity }
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
  },
  TextInput: {
    width: '80%',
    paddingVertical: 7,
    fontSize: 17,
    color: 'teal',
    paddingLeft: 15,
    borderWidth: 1,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:96,
    alignSelf:'center'
  },
});


export interface IKaalixWinPointsScreenProps {}



export default KaalixWinPointsScreen;
