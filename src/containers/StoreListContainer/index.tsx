import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import MemorizedRestaurant from '../../components/RestaurantCard';
import { useSelector, useDispatch } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { createStructuredSelector } from 'reselect';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectStores,
  makeSelectError,
  makeSelectLoading,
} from './selectors';
import { getFilters } from 'screens/MultiFiltersScreen/selectors';
// import { makeSelectSinglePayload } from '../FiltersContainer/selectors';
import { getStoresAction } from './actions';
import theme from 'theme/theme';
import { makeSelecttagList } from 'containers/FiltersContainer/selectors';
import { makeSelectPickedAddress } from 'containers/AddressesHandler/selectors';
import getDistance from 'geolib/es/getDistance';
const stateSelector = createStructuredSelector({
  loading: makeSelectLoading(),
  stores: makeSelectStores(),
  error: makeSelectError(),
  // singleCategory: makeSelectSinglePayload(),
  AllMightyFilters: getFilters(),
  tagList: makeSelecttagList(),
  pickedAddress: makeSelectPickedAddress,
});

const key = 'storesListContainer';

export const StoreListContainer: React.FC<IStoreListContainer> = ({
  service,
}) => {
  useInjectSaga({ key, saga });
  useInjectReducer({ key, reducer });

  const { loading, stores, AllMightyFilters, tagList, pickedAddress } =
    useSelector(stateSelector);
  //console.log(singleCategory);

  const dispatch = useDispatch();
  // useEffect(() => {
  //   AllMightyFilters.map((a: object) => console.log(a));
  // }, [AllMightyFilters]);
  useEffect(() => {
    dispatch(getStoresAction(service._id));
  }, []);
  // this is for the four multiple tags :
  const smallFilters = (shops: [], tagList: []) => {
    let selectedItems = tagList.filter((a: any) => {
      if (a.isSelect !== false) {
        return a;
      }
    });
    //  console.log(selectedItems);

    let newShops = shops.filter((a: any) => {
      let onlyNames = selectedItems.map((b: any) => b.name);
      for (let index = 0; index < onlyNames.length; index++) {
        if (a.tags.includes(onlyNames[index])) {
          return a;
        }
      }
    });
    if (newShops.length > 0) {
      return newShops;
    } else {
      // console.log('no stores available');
      return stores;
    }
  };

  // this is for verification of modal selected Items if none returns a false  .
  const verifyMoreFilters = (moreFilters: []) => {
    let check = moreFilters.map((a: any) => {
      if (
        a.filterNames?.length > 0 ||
        a.triNames?.length > 0 ||
        a.promoSelectedItem?.length > 0
      ) {
        return true;
      }
    });
    if (check.includes(true)) {
      return true;
    } else {
      return false;
    }
  };
  const distance = (location1: any, location2: any) => {
    return getDistance(
      { lat: location1[0], lng: location1[1] },
      { lat: location2[0], lng: location2[1] },
    );
  };
  // this is for More action modal list tags
  const megaFilters = (shops: [], largeFilters: []) => {
    //// begin initialisation Lol

    const mapping = {
      FreeDelivery: 'frais livraison gratuit',
      Discount: 'reduction',
      DiscountUpTo: 'reduction',
      OfferedAboveMinCartPrice: '1 achat 1 offert',
      OneBoughtOneOffered: 'produit offert',
    };

    let FilterNames: any = largeFilters.filter((a: any) => {
      if (a.filterNames) return a.filterNames;
    });
    FilterNames = FilterNames[0].filterNames.map((b: any) => b.name);
    let TriNames: any = largeFilters.filter((a: any) => {
      if (a.triNames) return a.triNames;
    });
    TriNames = TriNames[0].triNames.map((b: any) => b.triText);
    let PromoTypes: any = largeFilters.filter((a: any) => {
      if (a.promoSelectedItem) return a.promoSelectedItem;
    });
    PromoTypes = PromoTypes[0].promoSelectedItem.map((b: any) => b.promoText);

    let filteredShops: any = [];
    // // // end Initialisation
    console.log(FilterNames.length);

    if (FilterNames.length > 0 && PromoTypes.length < 1) {
      filteredShops = shops.filter((shop: any) => {
        for (let index = 0; index < FilterNames.length; index++) {
          if (shop.tags.includes(FilterNames[index])) {
            return shop;
          }
        }
      });
      //  console.log("I' m heeere");
    } else if (FilterNames.length < 1 && PromoTypes.length > 0) {
      // console.log(' i want to be here !!');

      filteredShops = shops.filter((shop: any) => {
        if (Object.keys(mapping).includes(shop.promoTextPrimary)) {
          let value = mapping[shop.promoTextPrimary];
          if (PromoTypes.includes(value)) {
            return shop;
          }
        }
      });
      //  return stores;
    } else if (FilterNames.length > 0 && PromoTypes.length > 0) {
      filteredShops = shops.filter((shop: any) => {
        for (let index = 0; index < FilterNames.length; index++) {
          if (shop.tags.includes(FilterNames[index])) {
            return shop;
          }
        }
      });
      //  console.log('oooooooooooola', filteredShops);

      filteredShops = filteredShops.filter((shop: any) => {
        if (Object.keys(mapping).includes(shop.promoTextPrimary)) {
          let value = mapping[shop.promoTextPrimary];
          if (PromoTypes.includes(value)) {
            return shop;
          }
        }
      });
      console.log(
        'filteredShopsfilteredShopsfilteredShopsfilteredShops',
        filteredShops,
      );
    }
    //// tri material
    if (TriNames.length > 0) {
      if (TriNames[0] === 'Temps de préparation' && filteredShops.length > 0) {
        filteredShops = filteredShops
          .map((a: any) => a)
          .sort((x: any, y: any) => {
            let a = (x.preparationTimeMin + x.preparationTimeMax) / 2;
            let b = (y.preparationTimeMin + y.preparationTimeMax) / 2;

            return a - b;
          });
      } else if (TriNames[0] === 'Temps de préparation') {
        filteredShops = shops
          .map((a: any) => a)
          .sort((x: any, y: any) => {
            let a = (x.preparationTimeMin + x.preparationTimeMax) / 2;
            let b = (y.preparationTimeMin + y.preparationTimeMax) / 2;

            return a - b;
          });
      }
      if (TriNames[0] === 'le plus proche' && filteredShops.length > 0) {
        filteredShops = filteredShops
          .map((a: any) => a)
          .sort((a: any, b: any) => {
            return (
              distance(a.location, pickedAddress.location) -
              distance(b.location, pickedAddress.location)
            );
          });
      } else if (TriNames[0] === 'le plus proche') {
        filteredShops = shops
          .map((a: any) => a)
          .sort((a: any, b: any) => {
            return (
              distance(a.location, pickedAddress.location) -
              distance(b.location, pickedAddress.location)
            );
          });
      }

      if (TriNames[0] === 'frais de livraison' && filteredShops.length > 0) {
        filteredShops = filteredShops
          .map((a: any) => a)
          .sort((a: any, b: any) => {
            return a.deliveryPrice - b.deliveryPrice;
          });
      } else if (TriNames[0] === 'frais de livraison') {
        filteredShops = shops
          .map((a: any) => a)
          .sort((a: any, b: any) => {
            return a.deliveryPrice - b.deliveryPrice;
          });
      }

      if (TriNames[0] === 'Nombre de point' && filteredShops.length > 0) {
        filteredShops = filteredShops
          .map((a: any) => a)
          .sort((a: any, b: any) => {
            return a.rewardPoints - b.rewardPoints;
          });
      } else if (TriNames[0] === 'Nombre de point') {
        filteredShops = shops
          .map((a: any) => a)
          .sort((a: any, b: any) => {
            return a.rewardPoints - b.rewardPoints;
          });
      }
    }
    // end triMaterial
    // if any filter applied return the newShops else return original stores .
    if (filteredShops.length > 0) {
      console.log('Multiple promotions : ', filteredShops.length);

      return filteredShops;
    } else {
      // console.log("I' m heeere  elsing");

      return [];
    }
  };
  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading</Text>
      ) : (
        <FlatList
          data={
            verifyMoreFilters(AllMightyFilters)
              ? megaFilters(stores, AllMightyFilters)
              : smallFilters(stores, tagList)
          }
          renderItem={(items: any) => (
            <MemorizedRestaurant store={items.item} />
          )}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{
            // flex: 1,
            // justifyContent: 'center',
            backgroundColor: 'yellow',
          }}
          maxToRenderPerBatch={50}
          updateCellsBatchingPeriod={40}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    padding: theme.spacing.default[1],
  },
});

export interface IStoreListContainer {
  service: any;
}

export default StoreListContainer;
