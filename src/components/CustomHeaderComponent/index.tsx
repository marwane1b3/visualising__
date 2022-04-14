/**
 *
 * CustomHeaderComponent
 *
 */

import React, { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';


export const CustomHeaderComponent: React.NamedExoticComponent<ICustomHeaderComponentProps> = memo( ( { title } ) =>
{

  return (
    <View >
      <Text style={ styles.textStyle }>{ title }</Text>
    </View>
  );
} );

export interface ICustomHeaderComponentProps
{
  title: string;
}

const styles = StyleSheet.create( {
  textStyle: {
    fontSize: 22,
    fontWeight: "700",
    color: "white"
  }
} )
export default CustomHeaderComponent;
