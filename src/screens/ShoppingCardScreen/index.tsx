/**
 *
 * ShoppingCardScreen
 *
 */

import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { DrawerActions, useNavigation } from '@react-navigation/core';

import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import makeSelectShoppingCardScreen, {
  makeSelectShoppingCardProducts,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { FormattedMessage } from 'components/FormattedMessage';
import messages from './messages';
import { useEffect } from 'react';
import {
  makeSelectItems,
  makeSelectProducts,
} from 'containers/ShoppingCard/selectors';
import { FlatList } from 'react-native-gesture-handler';
import { SCREENS } from 'navigators/constants';
import theme from 'theme/theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  minusItemQuantity,
  plusItemQuantity,
} from 'containers/ShoppingCard/actions';

const stateSelector = createStructuredSelector({
  items: makeSelectItems,
  products: makeSelectProducts,
});

const key = 'shoppingCardScreen';

export const ShoppingCardScreen: React.FC<IShoppingCardScreenProps> = ({}) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  /* eslint-disable no-unused-vars */
  const { items, products } = useSelector(stateSelector);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  /* eslint-enable no-unused-vars */

  const minusQuantity = (item: any, product: any) => {
    dispatch(minusItemQuantity(item, product.productId));
  };
  const plusQuantity = (item: any, product: any) => {
    dispatch(plusItemQuantity(item, product.productId));
  };

  const navigateToCheckout = () => {
    navigation.navigate(SCREENS.CHECKOUT);
  };

  useEffect(() => {
    if (products.length == 0) {
      navigation.goBack();
    }
  }, [products]);

  const renderItem = ({ item: product }: { item: any }) => {
    console.log('from cart : ' + JSON.stringify(product.items));
    return (
      <View style={{}}>
        <Text>{product.name}</Text>

        <FlatList
          data={product.items}
          keyExtractor={(item, index) => 'FL' + item._id + index}
          renderItem={({ item }: { item: any }) => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  marginVertical: theme.spacing.default[0],
                  padding: theme.spacing.default[0],
                  backgroundColor: '#F7F7F7',
                  borderColor: '#CDD4D9',
                  borderWidth: 1,
                  borderRadius: 50,
                }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TouchableOpacity
                    onPress={() => minusQuantity(item, product)}>
                    <FontAwesome
                      style={{ padding: theme.spacing.default[1] }}
                      name="minus-circle"
                      size={20}
                      color="#28B873"
                    />
                  </TouchableOpacity>
                  <Text style={{ color: theme.palette.default.text }}>
                    {item.quantity}
                  </Text>
                  <TouchableOpacity onPress={() => plusQuantity(item, product)}>
                    <FontAwesome
                      style={{ padding: theme.spacing.default[1] }}
                      name="plus-circle"
                      size={20}
                      color="#28B873"
                    />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <View style={{ flex: 1 }}>
                    <Text
                      numberOfLines={1}
                      style={{
                        fontWeight: 'bold',
                        paddingHorizontal: theme.spacing.default[0],
                        color: theme.palette.default.text,
                      }}>
                      {item.name}
                    </Text>
                    {item.reducedSpecs != '' && (
                      <Text
                        numberOfLines={2}
                        style={{
                          paddingHorizontal: theme.spacing.default[0],
                          fontSize: 11,
                          color: theme.palette.default.text,
                        }}>
                        {item.reducedSpecs}
                      </Text>
                    )}
                  </View>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: theme.palette.default.text,
                      paddingHorizontal: theme.spacing.default[1],
                    }}>
                    {item.itemTotalPrice * item.quantity} Dh
                  </Text>
                </View>
              </View>
            );
          }}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {products && (
        <FlatList
          data={products}
          keyExtractor={(item, index) => 'FL' + item._id + index}
          renderItem={renderItem}
        />
      )}
      <TouchableOpacity onPress={() => navigateToCheckout()} style={{}}>
        <Text>Navigate to checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.palette.default.light,
    paddingVertical: theme.spacing.default[2],
    paddingHorizontal: theme.spacing.default[3],
    flex: 1,
  },
});

export interface IShoppingCardScreenProps {}

export default ShoppingCardScreen;
