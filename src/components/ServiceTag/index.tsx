/**
 *
 * StoresListScreen
 *
 */

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

//import console = require('console');

export const ServiceTag: React.FC<IServiceTagProps> = ({ tag, onPressTag }) => {
  const [color, setColor] = useState('#E7F0FF');

  //
  return (
    <TouchableOpacity
      onPress={onPressTag}
      style={{
        //flex: 1,
        //  marginBottom: 50,
        // marginLeft: 15,

        // height: 65,
        // width: 65,
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
            backgroundColor: tag.isSelect ? '#1583D8' : '#E7F0FF',
          }}
        />
        <Text
          style={{
            textAlign: 'center',
            color: 'black',
            //margin: 5,
            fontSize: 14,
          }}>
          {tag.name}
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

export interface IServiceTagProps {
  tag: any;
  onPressTag: any;
}

export const MemoisedServiceTag = React.memo(ServiceTag);
