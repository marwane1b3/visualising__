import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { createStructuredSelector } from 'reselect';
import reducer from './reducer';
import saga from './saga';
import { getLoader, getTriData, getTriName } from './selectors';
import {
  requestMultiTriAction,
  setMUltiTriAction,
  setMultiData,
} from './actions';
import TriComponent from 'components/TriComponent';
import { data } from './constants';
const key = 'trisContainer';

interface Props {}
const stateSelector = createStructuredSelector({
  dataNames: getTriData(),
  selectedNames: getTriName(),
  loading: getLoader(),
});
const TriDataContainer = (props: Props) => {
  useInjectSaga({ key, saga });
  useInjectReducer({ key, reducer });

  const { dataNames, loading, selectedNames } = useSelector(stateSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestMultiTriAction());
  }, []);

  useEffect(() => {
    if (selectedNames.length > 0 && dataNames.length > 0) {
      let fulList: any;
      fulList = dataNames.map((b: any) => {
        if (b.triText === selectedNames[0].triText) {
          return {
            id: selectedNames[0].id,
            triText: selectedNames[0].triText,
            uri: selectedNames[0].uri,
            isSelect: selectedNames[0].isSelect,
          };
        } else {
          return {
            id: b.id,
            triText: b.triText,
            uri: b.uri,
            isSelect: false,
          };
        }
      });
      console.log('from clickEvent full List : ', fulList);
      dispatch(setMultiData(fulList));
    } else {
      dispatch(setMultiData(data));
    }
  }, [selectedNames]);

  const handleClick = (Obj: any) => {
    // console.log(Obj);

    let selectedList: any;
    // let fulList: any;
    // fulList = data.map((b: any) => {
    //   if (b.triText === Obj.triText) {
    //     return {
    //       id: Obj.id,
    //       triText: Obj.triText,
    //       uri: Obj.uri,
    //       isSelect: !Obj.isSelect,
    //     };
    //   } else {
    //     return Object.assign(
    //       b,
    //       {},
    //       {
    //         isSelect: false,
    //       },
    //     );
    //   }
    // });
    // console.log('from clickEvent full List : ', fulList);
    // dispatch(setMultiData(fulList));
    if (selectedNames?.map((a: any) => a.triText).includes(Obj.triText)) {
      selectedList = selectedNames.filter(
        (a: any) => a.triText !== Obj.triText,
      );
    } else {
      selectedList = [
        {
          id: Obj.id,
          triText: Obj.triText,
          uri: Obj.uri,
          isSelect: !Obj.isSelect,
        },
      ];
    }

    console.log('from clickEvent SelectedListItem', selectedList);
    dispatch(setMUltiTriAction(selectedList));
  };

  const renderItem = (items: any) => (
    <TriComponent data={items.item} pressFunction={handleClick} />
  );
  return (
    <>
      {!loading && dataNames && (
        <View style={{ marginHorizontal: 10, marginTop: 10 }}>
          <Text
            style={{
              fontSize: 20,
              margin: 10,
              color: 'black',
              fontWeight: 'bold',
            }}>
            Trier par
          </Text>

          <View>
            <FlatList
              data={dataNames}
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

export default TriDataContainer;

const styles = StyleSheet.create({});

/******
 * const handleClick = (Obj: any) => {
    // console.log(Obj);

    let selectedList;
    let fulList;
    fulList = dataNames.map((b: any) => {
      if (b.triText === Obj.triText) {
        return {
          id: Obj.id,
          triText: Obj.triText,
          uri: Obj.uri,
          isSelect: !Obj.isSelect,
        };
      } else {
        return Object.assign(
          b,
          {},
          {
            isSelect: false,
          },
        );
      }
    });
    console.log('from clickEvent full List : ', fulList);
    dispatch(setMultiData(fulList));
    if (selectedNames?.map((a: any) => a.triText).includes(Obj.triText)) {
      selectedList = selectedNames.filter(
        (a: any) => a.triText !== Obj.triText,
      );
    } else {
      selectedList = [
        {
          id: Obj.id,
          triText: Obj.triText,
          uri: Obj.uri,
          isSelect: !Obj.isSelect,
        },
      ];
    }

    console.log('from clickEvent SelectedListItem', selectedList);
    dispatch(setMUltiTriAction(selectedList));
  };
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */
