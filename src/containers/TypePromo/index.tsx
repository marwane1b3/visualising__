import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector, useDispatch } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { createStructuredSelector } from 'reselect';
import reducer from './reducer';
import saga from './saga';
import { getLoader, getPromoData, getPromoName } from './selectors';
import {
  requestMultiPromoAction,
  setMUltiPromoAction,
  setMultiPromoData,
} from './actions';
import Item from 'components/TypePromoComponent';
const key = 'typePromos';

interface Props {}
const stateSelector = createStructuredSelector({
  dataPromoNames: getPromoData(),
  selectedPromoNames: getPromoName(),
  loading: getLoader(),
});
const PromoDataContainer = (props: Props) => {
  useInjectSaga({ key, saga });
  useInjectReducer({ key, reducer });

  const { dataPromoNames, loading, selectedPromoNames } =
    useSelector(stateSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestMultiPromoAction());
  }, []);

  const handleClick = (Obj: any) => {
    let selectedList;
    let fulList;
    fulList = dataPromoNames.map((b: any) => {
      if (b.promoText === Obj.promoText) {
        return {
          id: Obj.id,
          promoText: Obj.promoText,
          uri: Obj.uri,
          isSelect: !Obj.isSelect,
        };
      } else {
        return b;
      }
    });
    //console.log('from clickEvent full List promo data : ', fulList);
    dispatch(setMultiPromoData(fulList));

    if (
      selectedPromoNames?.map((a: any) => a.promoText).includes(Obj.promoText)
    ) {
      selectedList = selectedPromoNames.filter(
        (a: any) => a.promoText !== Obj.promoText,
      );
    } else {
      selectedList = [
        ...selectedPromoNames,
        {
          id: Obj.id,
          promoText: Obj.promoText,
          uri: Obj.uri,
          isSelect: !Obj.isSelect,
        },
      ];
    }

    //  console.log('from clickEvent SelectedListItem promo data', selectedList);
    dispatch(setMUltiPromoAction(selectedList));
  };

  const renderItem = (items: any) => (
    <Item data={items.item} pressFunction={handleClick} />
  );
  return (
    <>
      {!loading && dataPromoNames && (
        <View style={{ marginHorizontal: 10, marginTop: 10 }}>
          <Text
            style={{
              fontSize: 20,
              marginBottom: 19,
              color: 'black',
              fontWeight: 'bold',
            }}>
            Type promos
          </Text>
          <View>
            <FlatList
              data={dataPromoNames}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              numColumns={2}
            />
            <View />
          </View>
        </View>
      )}
    </>
  );
};

export default PromoDataContainer;

const styles = StyleSheet.create({});
