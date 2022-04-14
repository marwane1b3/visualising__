import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import theme from 'theme/theme';
import { createStructuredSelector } from 'reselect';
interface Props {
  productWrapper: any;
}

const stateSelector = createStructuredSelector({});

const ProductSectionComponent = (props: Props) => {
  
  const { productWrapper } = props;

  return (
    <View
      style={{
        paddingHorizontal: theme.spacing.default[3],
      }}>
      {productWrapper.product && productWrapper.product.name != '' && (
        <View style={styles.headerContainerTitleStyle}>
          <Text numberOfLines={1} style={styles.headerTitleStyle}>
            {productWrapper.product.name}
          </Text>
        </View>
      )}
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
    borderTopColor: 'white',
  },
  selectedItemQuantityContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
});
export default ProductSectionComponent;
