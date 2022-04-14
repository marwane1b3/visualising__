import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';

import theme from 'theme/theme';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectButtonsActions, selectSelectedActionButton } from './selectors';
import {
  setOrdersButtonActionsData,
  setSelectedButtonActionData,
} from './actions';
import { useNavigation } from '@react-navigation/native';
import { addItemAction } from 'containers/ShoppingCard/actions';

interface Props {
  index: number;
  data: any;
  storeDetails: any;
}
const stateSelector = createStructuredSelector({
  actionButtons: selectButtonsActions(),
  selectedActionButton: selectSelectedActionButton(),
});
import { DeliveredOrdersActions } from './constants';
import { SCREENS } from 'navigators/constants';
import { MICROSERVICE_BASE_URL } from 'utils';

const Helper = (props: Props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { actionButtons, selectedActionButton } = useSelector(stateSelector);
  console.log(props.storeDetails.store._id);

  const filterFunction = (Obj: any) => {
    // console.log(Obj);

    let selectedList: any;
    let fulList: any;
    fulList = actionButtons[props.index].data.map((b: any) => {
      if (b.name === Obj.name) {
        return {
          id: Obj.id,
          name: Obj.name,

          isSelect: !Obj.isSelect,
        };
      } else {
        return {
          id: b.id,
          name: b.name,

          isSelect: false,
        };
      }
    });
    //console.log('from orders full List : ', fulList);
    dispatch(setOrdersButtonActionsData(fulList, props.index));

    /// navigation if recommander

    switch (Obj.id) {
      case 0:
        navigation.navigate(SCREENS.POURBOIR, {
          CommandeDetails: props.storeDetails,
        });
        break;

      case 1:
        props.storeDetails.payment.cartDetails.forEach((cartItem: any) => {
          let product = {
            productId: cartItem.productId,
            name: cartItem.name,
          };

          cartItem.items.forEach((item: any) => {
            console.log('from helper item : ', JSON.stringify(item));
            let itemToAdd = {
              itemId: item._id,
              quantity: 1,
              name: item.name,
              specificationPrice: 0,
              itemPrice: item?.price ? item.price : item.itemPrice,
              itemTotalPrice: item.price ? item?.price : item.itemTotalPrice,
              specifications: item.specifications,
            };

            dispatch(addItemAction(itemToAdd, item, product));
          });
        });
        /// checking if store is open  :
        fetch(
          `${MICROSERVICE_BASE_URL.CONTENT}/reorder/${props.storeDetails.store._id}`,
          {
            method: 'POST',
            body: JSON.stringify({
              cartDetails: props.storeDetails.payment.cartDetails,
            }),
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          },
        )
          .then((response) => response.json())
          .then((body: any) => {
            console.log('respoonse : ', body.status);

            if (body.status === 'OK') {
              navigation.navigate(SCREENS.SHOPPING_CARD);
            } else {
              console.log('No bueno ');
            }
          })
          .catch((err) => console.log('error ', err));

        break;
      case 2:
        navigation.navigate(SCREENS.RECLAMATION, {
          CommandeDetails: props.storeDetails,
        });
        break;
    }
  };

  const getTimeDiff = (date1: any, date2: any) => {
    const diffInMs = Math.abs(date2 - date1);
    return diffInMs / (1000 * 60 * 60 * 24);
  };
  function formatDate(date: any) {
    let d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    let year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  const conditionalTiming = () => {
    const date = new Date();

    const date1 = new Date(formatDate(date).toString());
    const date2 = new Date(
      props.storeDetails.createdAt.slice(0, 10).toString(),
    );

    if (getTimeDiff(date1, date2) > 20) {
      return props.data[props.index].data.filter((a: any) => a.id == '1');
    } else {
      return props.data[props.index].data;
    }
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {conditionalTiming().map((a: any, index: number) => {
        return (
          <TouchableOpacity
            key={index.toString()}
            onPress={() => {
              filterFunction(a);
            }}
            style={{
              marginLeft: 10,
              // elevation: 1,
              marginVertical: 7,
              marginHorizontal: 8,
              borderWidth: 0.5,
              borderColor: theme.palette.default.main,
              borderRadius: 30 / 2,
              backgroundColor: theme.palette.default.main,

              //flexDirection: 'row',

              // justifyContent: 'space-between',
              //  width: 120,
              flexWrap: 'wrap',
              paddingHorizontal: 5,
              paddingVertical: 2,
              height: 25,
            }}>
            <Text
              style={{
                fontSize: 13,
                color: theme.palette.default.light,

                textAlign: 'center',
              }}>
              {a.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default Helper;

const styles = StyleSheet.create({});
