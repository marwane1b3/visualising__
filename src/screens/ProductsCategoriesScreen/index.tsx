/**
 *
 * ProductsCategoriesScreen
 *
 */

import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import makeSelectProductsCategoriesScreen from './selectors';
import reducer from './reducer';
import saga from './saga';
import { FormattedMessage } from 'components/FormattedMessage';
import messages from './messages';
import { useNavigation, useRoute } from '@react-navigation/core';
import { SCREENS } from 'navigators/constants';
import { TouchableOpacity } from 'react-native-gesture-handler';

const stateSelector = createStructuredSelector({
  productsCategoriesScreen: makeSelectProductsCategoriesScreen(),
});

const key = 'productsCategoriesScreen';

export const ProductsCategoriesScreen: React.FC<IProductsCategoriesScreenProps> = ({}) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  /* eslint-disable no-unused-vars */
  const { productsCategoriesScreen } = useSelector(stateSelector);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  /* eslint-enable no-unused-vars */

  const navigateToProductsList = () => {
    navigation.navigate(SCREENS.PRODUCTS_LIST);
  };
  const navigateToItemsList = () => {
    navigation.navigate(SCREENS.ITEMS_LIST);
  };
  return (
    <View style={styles.container}>
      {/* <FormattedMessage {...messages.header} /> */}
      <TouchableOpacity onPress={navigateToProductsList} style={styles.button}>
        <Text>navigateToProductsList</Text>
      </TouchableOpacity>
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

export interface IProductsCategoriesScreenProps {}

export default ProductsCategoriesScreen;
