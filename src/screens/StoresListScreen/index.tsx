/**
 *
 * StoresListScreen
 *
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  VirtualizedList,
  TouchableOpacity,
} from 'react-native';

import StoreListContainer from 'containers/StoreListContainer';
import FiltersContainer from 'containers/FiltersContainer';
import theme from 'theme/theme';

// const key = 'storesListScreen';

export const StoresListScreen: React.FC<IStoresListScreenProps> = (props) => {
  const { service } = props.route.params;

  return (
    <View style={styles.container}>
      <FiltersContainer tags={service.tags} />
      <StoreListContainer service={service} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.palette.default.light,
    //  backgroundColor: 'red'
  },
});

export interface IStoresListScreenProps {
  route: any;
}

export default StoresListScreen;
