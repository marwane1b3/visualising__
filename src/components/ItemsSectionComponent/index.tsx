import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/core';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { colors } from 'theme/colors';
import theme from 'theme/theme';
import { createStructuredSelector } from 'reselect';
import { makeSelectProducts } from 'containers/ShoppingCard/selectors';
import { useDispatch, useSelector } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { SCREENS } from 'navigators/constants';
import {
  addItemAction,
  minusItemQuantity,
  plusItemQuantity,
} from 'containers/ShoppingCard/actions';
interface Props {
  productWrapper: any;
}
const stateSelector = createStructuredSelector({
  shoppinCardProducts: makeSelectProducts,
});

const ItemsSectionComponent = (props: Props) => {
  
  const dispatch = useDispatch();
 const navigation = useNavigation();

  const { productWrapper } = props;
  const { item , product } = productWrapper;
  const { shoppinCardProducts } = useSelector(stateSelector);

  const getSelectedItemsFromShoppingCard = (item: any, product: any) => {
    let tmp = shoppinCardProducts
      .filter((p: any) => product._id == p.productId)
      .reduce((acc: any, p: any) => {
        return [...acc, ...p.items.filter((i: any) => i.itemId == item._id)];
      }, []);
    return tmp;
  };
  
  const navigateToITemSpecifications = () => {
    navigation.navigate(SCREENS.ITEM_SPECIFICATIONS, { item, product });
  };

  return (
    <View
      style={{
        paddingHorizontal: theme.spacing.default[3],
      }}>
      <View key={`_KEY___${item._id}`} style={styles.itemContainerStyle}>
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.itemDetailsContainerStyle}
          onPress={navigateToITemSpecifications}>
          {item.imageUrl && item.imageUrl != 'imageUrl' && (
            <View style={styles.itemImageContainerStyle}>
              <Image
                source={{
                  uri: item.imageUrl,
                }}
                style={styles.itemImageStyle}
              />
            </View>
          )}
          <View style={styles.itemNameAndDescriptionContainerStyle}>
            <Text numberOfLines={2} style={styles.itemNameTextStyle}>
              {item.name}
            </Text>
            <Text numberOfLines={3} style={styles.itemDescriptionTextStyle}>
              {(item.description || '').trim()}
            </Text>
          </View>
          <View style={styles.itemPriceContainerStyle}>
            <Text style={styles.itemPriceTextStyle}>{item.price} Dh</Text>
            <View>
              <TouchableOpacity
                style={styles.addItemButtonStyle}
                onPress={() => {
                  if (item.specifications.length > 0) {
                    navigateToITemSpecifications();
                  } else {
                    dispatch(
                      addItemAction(
                        {
                          itemId: item._id,
                          quantity: 1,
                          name: item.name,
                          specificationPrice: 0,
                          itemPrice: item.price,
                          itemTotalPrice: item.price,
                          reducedSpecs: '',
                          specifications: [],
                        },
                        item,
                        product,
                      ),
                    );
                  }
                }}>
                <Text style={styles.addItemButtonTextStyle}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
        {getSelectedItemsFromShoppingCard(item, product).map(
          (selectedItem: any, index: number) => (
            <View
              key={'FLSELECTED' + selectedItem.itemId + index}
              style={[
                styles.selectedItemContainerStyle,
                index != 0 ? styles.selectedItemContainerTopBorder : {},
              ]}>
              <View style={styles.selectedItemQuantityContainerStyle}>
                <TouchableOpacity
                  onPress={() =>
                    dispatch(minusItemQuantity(selectedItem, product._id))
                  }>
                  <FontAwesome
                    style={{ padding: theme.spacing.default[1] }}
                    name="minus-circle"
                    size={20}
                    color={theme.palette.default.light}
                  />
                </TouchableOpacity>
                <Text style={{ color: theme.palette.default.light }}>
                  {selectedItem.quantity}
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    dispatch(plusItemQuantity(selectedItem, product._id))
                  }>
                  <FontAwesome
                    style={{ padding: theme.spacing.default[1] }}
                    name="plus-circle"
                    size={20}
                    color={theme.palette.default.light}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  numberOfLines={1}
                  style={{
                    fontWeight: 'bold',
                    color: theme.palette.default.light,
                  }}>
                  {selectedItem.name}
                </Text>
                {selectedItem.reducedSpecs != '' && (
                  <Text
                    numberOfLines={2}
                    style={{
                      color: theme.palette.default.light,
                      fontSize: 11,
                    }}>
                    {selectedItem.reducedSpecs}
                  </Text>
                )}
              </View>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: theme.palette.default.light,
                  paddingHorizontal: theme.spacing.default[1],
                }}>
                {selectedItem.itemTotalPrice * selectedItem.quantity} Dh
              </Text>
            </View>
          ),
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  headerContainerTitleStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.default.main,
    borderRadius: 10,
    paddingVertical: theme.spacing.default[0],
  },
  headerTitleStyle: {
    color: theme.palette.default.light,
    fontSize: 18,
    paddingHorizontal: theme.spacing.default[1],
  },
  itemContainerStyle: {
    backgroundColor: theme.palette.default.secondary,
    marginVertical: theme.spacing.default[1],
    elevation: 5,
    borderRadius: theme.spacing.default[2],
  },
  itemDetailsContainerStyle: {
    flexDirection: 'row',
    backgroundColor: theme.palette.default.secondary,
    elevation: 1,
    borderRadius: theme.spacing.default[2],
    overflow: 'hidden',
  },
  itemImageContainerStyle: {
    backgroundColor: theme.palette.default.light,
    padding: theme.spacing.default[1],
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  itemImageStyle: {
    width: 60,
    height: 60,
  },
  itemNameAndDescriptionContainerStyle: {
    flexDirection: 'column',
    flex: 1,
    paddingHorizontal: theme.spacing.default[0],
    paddingVertical: theme.spacing.default[1],
    backgroundColor: theme.palette.default.light,
  },
  itemNameTextStyle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: theme.palette.default.text,
  },
  itemDescriptionTextStyle: { fontSize: 13, color: theme.palette.default.text },
  itemPriceContainerStyle: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: theme.palette.default.light,
  },
  itemPriceTextStyle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: theme.palette.default.secondary,
    padding: theme.spacing.default[1],
  },
  addItemButtonStyle: {
    backgroundColor: theme.palette.default.main,
    borderBottomRightRadius: theme.spacing.default[2],
    width: theme.spacing.default[5],
    height: theme.spacing.default[5],
    alignSelf: 'flex-end',
  },
  addItemButtonTextStyle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
  selectedItemContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  selectedItemContainerTopBorder: {
    borderTopWidth: 0.2,
    borderTopColor: "white"
  },
  selectedItemQuantityContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
});
export default ItemsSectionComponent;
