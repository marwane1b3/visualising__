/**
 *
 * Item
 *
 */

import React, { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';


export const Item: React.NamedExoticComponent<IItemProps> = memo( ( { name, cmd, date, points } ) =>
{
  return (
    <View style={ styles.cards }  >
      <View>
        <Text style={ styles.storeName }>{ name }</Text>
        <Text style={ styles.textDateCmdStyle }>Commande N° { cmd }</Text>
        <Text style={ styles.textDateCmdStyle }> { date }</Text>
      </View>
      <Text style={ [ styles.storePoints, { color: points > 300 ? "#FF1E32" : "#28B873" } ] }>+{ points } Points</Text>
    </View>
  );
} );

export interface IItemProps
{
  name: string,
  cmd: string,
  date: string,
  points: number
}
const styles = StyleSheet.create( {

  cards: {
    width: "90%",
    height: "auto",
    backgroundColor: '#FFFFFF',
    marginBottom: 18,
    alignSelf: 'center',
    borderRadius: 9,
    shadowColor: "grey",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.28,
    shadowRadius: 12,
    elevation: 13,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12
  },
  storeName: {
    fontSize: 18,
    fontWeight: '700'
  },
  storePoints: {
    fontSize: 18,
    fontWeight: '700',

  },
  textDateCmdStyle: {
    color: '#999999',
    fontSize: 14,
    marginBottom: 3
  }
} )
export default Item;
