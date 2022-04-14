/**
 *
 * SilverComponent
 *
 */

import React, { memo } from 'react';
import { View,Text,StyleSheet,FlatList,ScrollView} from 'react-native';


export const SilverComponent: React.NamedExoticComponent<ISilverComponentProps> = memo(({}) => {
   const DATA=[
    {
      id:1,
      serviceName:'Tous les services',
      cash:0,
      carte:1,
      kaalixUp:1
    },
    {
      id:2,
      serviceName:'Tous les services',
      cash:0,
      carte:1,
      kaalixUp:1
    },
  ]
  return (
     <ScrollView>
    <View
    style={{
      padding:20,
      width:"100%",
    }}
    >
      <Text style={{
        fontSize:12,
        color:"#4A4D54"
      }}>Lorem ipsum dolor sit amet, </Text>
      
      <View
      style={{
        width:"100%",
        height:'auto',
        backgroundColor:'#FFFFFF',
        borderRadius:12,
        marginTop:12,
        padding:12
      }}
      >
          <View 
            style={styles.listWrapper}
            >
              <Text style={styles.textHeadStyle}>Service</Text>
              <Text style={styles.textHeadStyle}>Cash</Text>
              <Text style={styles.textHeadStyle}>Carte</Text>
              <Text style={styles.textHeadStyle}>Kaalix'Up</Text>
          </View>
          <View style={{
            width:'107%',
            height:2,
            backgroundColor:'#CDD4D9',
            marginLeft:-12,
          }}></View>
    <FlatList
          data={ DATA }
          renderItem={ ({item}:any)=>(
          <View key={item.id} 
         
          >
            <View  style={styles.listWrapper}>
            <Text style={styles.textStyle}>{item.serviceName}</Text>
            <Text style={styles.textStyle}>{item.cash}</Text>
            <Text style={styles.textStyle}>{item.carte}</Text>
            <Text style={styles.textStyle}>{item.kaalixUp}</Text>
            </View>
            <View
            style={{
              backgroundColor:'#F1F2F6',
              height:1,
              width:'127%'
            }}
            ></View>
          </View>
          ) }
          keyExtractor={ ( item: any ) => item.id }
      />
      
      </View>
      
    </View>
    <View
    style={{
      backgroundColor:'#FFFFFF'
    }}
    >
       <View 
      style={{
        padding:20
      }}
      >
        <Text
          style={{
            color:"#999999"
          }}
        >Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
         eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et 
        justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet</Text>
      </View>
    </View>
    </ScrollView>
  );
});
const styles=StyleSheet.create({
  textStyle:{
    color:"#999999",
    flex:1,
    fontSize:10,
    alignSelf:'center',
    paddingLeft:10
  },
  textHeadStyle:{
    color:"black",
    fontSize:13,
    fontWeight:"700",
    paddingHorizontal:10,
    flex:1
    
  },
  listWrapper:{
    flexDirection:"row",
    justifyContent:'space-between',
    marginTop:10,
    width:"100%",
    alignItems:"center",
    marginBottom:14
    
  }
})
export interface ISilverComponentProps {}
export default SilverComponent;
