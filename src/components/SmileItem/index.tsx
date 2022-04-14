/**
 *
 * SmileItem
 *
 */

import React, { memo } from 'react';
import { Text, View, StyleSheet } from 'react-native';


export const SmileItem: React.NamedExoticComponent<ISmileItemProps> = memo( ( { name, numSmiles } ) =>
{
  return (
    <View style={ styles.cards }  >
      <View>
        <Text style={ styles.storeName }>{ name }</Text>
      </View>
      <Text style={ [ styles.storePoints, { color: numSmiles < 0 ? "#FF1E32" : "#28B873" } ] }>{ numSmiles } Smiles</Text>
    </View>
  );
} );

export interface ISmileItemProps
{
  name: string;
  numSmiles: number;
}

const styles = StyleSheet.create( {
  cards: {
    width: "100%",
    height: "auto",
    marginBottom: 7,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    marginTop: 7
  },
  storeName: {
    fontSize: 16,
  },
  storePoints: {
    fontSize: 16,

  },
} )
export default SmileItem;
