/**
 *
 * ItemsListScreen
 *
 */
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { FormattedMessage } from 'components/FormattedMessage';
import {
  addItemAction,
  clearCardAction,
  setSelectedStoreAction,
} from 'containers/ShoppingCard/actions';
import {
  makeSelectItems,
  makeSelectorderPrice,
} from 'containers/ShoppingCard/selectors';
import { SCREENS } from 'navigators/constants';

import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { createStructuredSelector } from 'reselect';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';
import {
  requestListItems,
  getProductsList,
  getListItems,
  getFullList,
  indexTesting,
  getProductsAction,
  getId,
} from './actions';
import makeSelectItemsListScreen, {
  selectProducts,
  selectError,
  selectLoader,
  selectFullList,
} from './selectors';
import Search from 'components/SearchBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import theme from 'theme/theme';
import ItemsListContainer from 'containers/ItemsListContainer';

const stateSelector = createStructuredSelector({
  itemsListScreen: makeSelectItemsListScreen(),
  // productNames: selectProducts(),
  loading: selectLoader(),
  error: selectError(),
  fullList: selectFullList(),
  orderPrice: makeSelectorderPrice,
});

const key = 'itemsListScreen';
export interface IItemsListScreenProps {
  route: any;
}

export const ItemsListScreen: React.FC<IItemsListScreenProps> = ({ route }) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const { storeDetails } = route.params;
  /* eslint-disable no-unused-vars */
  console.log('storeDetails' + JSON.stringify(storeDetails._id));

  const { error, loading, fullList, itemsListScreen, orderPrice } =
    useSelector(stateSelector);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  useEffect(() => {
    dispatch(getId(storeDetails._id));
  }, []);
  useEffect(() => {
    dispatch(requestListItems());

    dispatch(setSelectedStoreAction(storeDetails));
  }, []);

  /* eslint-enable no-unused-vars */

  /* eslint-enable no-unused-vars */

  const navigateToITemSpecifications = () => {
    navigation.navigate(SCREENS.ITEM_SPECIFICATIONS);
  };

  const addItem = () => {
    // dispatch(addItemAction({}));
  };
  const clearCard = () => {
    dispatch(clearCardAction({}));
  };
  const uri =
    'https://www.mycuisine.com/wp-content/uploads/2018/12/burger-rossini.jpg';

  return (
    <View style={{ flex: 1 }}>
      {/* <ImageBackground source={{ uri }} style={styles.image}>
        <View style={styles.rgba}>
          <SafeAreaView style={{ marginTop: 15, flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Icon name="arrow-back-outline" style={styles.goBackIcon}></Icon>
            </TouchableOpacity>
            <Search />
          </SafeAreaView>
          <View style={styles.container}>
            <Text style={styles.title}>{storeDetails.name}</Text>
          </View>
        </View>
      </ImageBackground> */}

      {fullList.length > 0 && !loading && !error && (
        <ItemsListContainer data={fullList} />
      )}
      <TouchableOpacity
        onPress={() => navigation.navigate(SCREENS.SHOPPING_CARD)}
        style={{ paddingVertical: 10 }}>
        <Text>GO TO CART {orderPrice}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //justifyContent: 'center',
    marginTop: 25,
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontSize: 40,
    fontFamily: 'Nova-Condensed',
    color: theme.palette.default.light,
  },
  image: {
    width: '100%',
    height: 200,
    borderWidth: 1,
    borderBottomWidth: 20,
    borderColor: 'black',
  },
  goBackIcon: {
    fontSize: 30,
    paddingTop: 7,
    paddingHorizontal: 7,
    color: theme.palette.default.light,
  },
  rgba: {
    width: '100%',
    height: 200,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
});

export default ItemsListScreen;
