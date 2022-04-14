/**
 *
 * OrderHistoryFilterContainer
 *
 */

import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { getOrdersFilterData, getSelectedHistoryFilerData } from './selectors';
import { requestData, setData, setSelectedData } from './actions';
import reducer from './reducer';
import saga from './saga';
// import { data } from './constants';
import theme from 'theme/theme';
const stateSelector = createStructuredSelector({
  data: getOrdersFilterData(),
  selectedItem: getSelectedHistoryFilerData(),
});

const key = 'orderHistoryFilterContainer';

interface Props {}

const index = (props: Props) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const { data, selectedItem } = useSelector(stateSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(requestData());
  }, []);
  const filterFunction = (Obj: any) => {
    // console.log(Obj);

    let selectedList: any;
    let fulList: any;
    fulList = data.map((b: any) => {
      if (b.name === Obj.name) {
        return {
          id: Obj.id,
          name: Obj.name,

          isSelect: true,
        };
      } else {
        return {
          id: b.id,
          name: b.name,

          isSelect: false,
        };
      }
    });
    // console.log('from orders full List : ', fulList);
    dispatch(setData(fulList));

    selectedList = [
      {
        id: Obj.id,
        name: Obj.name,

        isSelect: true,
      },
    ];

    // console.log('from orders SelectedListItem', selectedList);
    dispatch(setSelectedData(selectedList));
  };

  const renderItem = (items: any) => {
    return (
      <TouchableOpacity
        onPress={() => {
          filterFunction(items.item);
        }}
        style={{
          margin: 5,
          elevation: 1,
          paddingVertical: 11,
          paddingHorizontal: 15,
          borderWidth: 0.5,
          borderColor: theme.palette.default.main,
          borderRadius: 45 / 2,
          backgroundColor: items.item.isSelect
            ? theme.palette.default.main
            : theme.palette.default.light,
          //flexDirection: 'row',
          //alignItems: 'center',
          // justifyContent: 'space-between',
          width: 150,
        }}>
        <Text
          style={{
            fontSize: 15,
            color: items.item.isSelect ? theme.palette.default.light : 'black',
            textAlign: 'center',
          }}>
          {items.item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <FlatList
        data={data}
        renderItem={renderItem}
        contentContainerStyle={{
          marginTop: 15,
          flexDirection: 'row',
          justifyContent: 'center',
        }}
        keyExtractor={(items: any, index) => index.toString()}
      />
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});

/**
 *
 *
 */
