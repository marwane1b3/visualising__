/**
 *
 * ProductsListScreen
 *
 */

import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import makeSelectProductsListScreen from './selectors';
import reducer from './reducer';
import saga from './saga';
import { FormattedMessage } from 'components/FormattedMessage';
import messages from './messages';
import {
  CommonActions,
  StackActions,
  useNavigation,
} from '@react-navigation/core';
import { SCREENS } from 'navigators/constants';
import { TouchableOpacity } from 'react-native-gesture-handler';

const stateSelector = createStructuredSelector({
  productsListScreen: makeSelectProductsListScreen(),
});

const key = 'productsListScreen';

export const ProductsListScreen: React.FC<IProductsListScreenProps> = ({}) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  /* eslint-disable no-unused-vars */
  const { productsListScreen } = useSelector(stateSelector);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  /* eslint-enable no-unused-vars */

  const navigateToItemsList = () => {
    navigation.navigate(SCREENS.ITEMS_LIST);
  };
  // const goBack = () => {
  //   navigation.dispatch(CommonActions.goBack());
  // };

  return (
    <View style={styles.container}>
      {/* <FormattedMessage {...messages.header} /> */}

      <TouchableOpacity onPress={navigateToItemsList} style={styles.button}>
        <Text>navigateToItemsList</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  button: {
    padding: 8,
  },
});

export interface IProductsListScreenProps {}

export default ProductsListScreen;
