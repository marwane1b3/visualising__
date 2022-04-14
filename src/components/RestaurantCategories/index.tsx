/**
 *
 * StoresListScreen
 *
 */

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

//import console = require('console');

export const RestaurantCategories: React.FC<IRestaurantCategoriesProps> = ({
  categorie,
  onChange,
}) => {
  const [color, setColor] = useState('#E7F0FF');

  //
  return (
    <TouchableOpacity
      onPress={() => {
        if (color === '#E7F0FF') {
          setColor('#1583D8');
          categorie.isSelect = true;
        } else if (color === '#1583D8') {
          setColor('#E7F0FF');
          categorie.isSelect = false;
        }

        onChange(categorie);
        // console.log(categorie);
      }}
      style={{
        //flex: 1,
        //  marginBottom: 50,
        marginLeft: 15,

        height: 65,
        width: 65,
        alignItems: 'center',
        // justifyContent: 'center',
        borderRadius: 15,
        // elevation: 1,
        // backgroundColor: color,
      }}>
      <>
        <View
          style={{
            height: 55,
            // marginBottom: 20,
            width: 55,
            borderRadius: 15,
            backgroundColor: color,
          }}
        />
        <Text
          style={{
            textAlign: 'center',
            color: 'black',
            //margin: 5,
            fontSize: 14,
          }}>
          {categorie.name}
        </Text>
      </>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    elevation: 4,

    height: 150,
    margin: 15,
    overflow: 'hidden',
    borderRadius: 6,
  },
});

export interface IRestaurantCategoriesProps {
  categorie: any;
  onChange: any;
}

export const MemorizedCategorie = React.memo(RestaurantCategories);
