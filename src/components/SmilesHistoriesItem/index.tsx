/**
 *
 * SmilesHistoriesItem
 *
 */

import React, { memo } from 'react';
import { View,StyleSheet,Text } from 'react-native';


export const SmilesHistoriesItem: React.NamedExoticComponent<ISmilesHistoriesItemProps> = memo(({ name, cmd, date, smiles }) => {
  return (
    <View style={ styles.cards }  >
      <View>
        <Text style={ styles.storeName }>{ name }</Text>
        <Text style={ styles.textDateCmdStyle }>Commande N° { cmd }</Text>
        <Text style={ styles.textDateCmdStyle }> { date }</Text>
      </View>
      <Text style={ [ styles.storePoints, { color: smiles > 300 ? "#FF1E32" : "#28B873" } ] }>+{ smiles } smiles</Text>
    </View>
  );
} );

export interface ISmilesHistoriesItemProps {
  name: string,
  cmd: string,
  date: string,
  smiles: number
}

const styles=StyleSheet.create({
  
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
})
export default SmilesHistoriesItem;
