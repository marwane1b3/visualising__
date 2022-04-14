import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Linking,
  ImageBackground,
} from 'react-native';
import { createStructuredSelector } from 'reselect';
import theme from 'theme/theme';
import { PromosData } from './constants';
import { useDispatch, useSelector } from 'react-redux';
import {
  makeSelectErrorPubMessage,
  makeSelectpublicityGroupTabsState,
} from 'containers/AdBannierContainer/selectors';
import { useNavigation } from '@react-navigation/native';
import { MICROSERVICE_BASE_URL } from 'utils';
import { SCREENS } from 'navigators/constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
interface Props {}
const stateSelector = createStructuredSelector({
  PromotionsData: makeSelectpublicityGroupTabsState(),
  errorMsg: makeSelectErrorPubMessage(),
});
const Promotion = (props: Props) => {
  const { PromotionsData, errorMsg } = useSelector(stateSelector);
  const navigation = useNavigation();

  //console.log('PromosData', PromosData.publicitySubGroups);
  const getPromotions = (promos: any) => {
    const publicityGroups = promos?.publicitySubGroups;

    const onlyPromos = publicityGroups[0];
    // console.log(onlyPromos);

    return onlyPromos ? onlyPromos?.pubs : null;
  };
  const handlePress = async (item: any) => {
    if (item.type === 'Store') {
      fetch(`${MICROSERVICE_BASE_URL.CONTENT}/store/${item.storeId}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((body: any) => {
          navigation.navigate(SCREENS.ITEMS_LIST, {
            storeDetails: body,
          });
        })
        .catch((err) => console.log('error ', err));
    } else {
      await Linking.openURL(item.externalLink).catch((err) =>
        console.error('oops : ', err),
      );
    }
  };
  const renderItem = (items: any) => (
    <TouchableOpacity
      onPress={() => {
        handlePress(items.item);
      }}
      style={{ padding: 10 }}>
      <ImageBackground
        source={{ uri: items.item.imageUrl }}
        style={{
          width: 150,
          height: 80,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
          overflow: 'hidden',
        }}>
        <View
          style={{
            width: 150,
            height: 80,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.3)',
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: theme.palette.default.light,
            }}>
            {items.item.name}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.palette.default.light,
      }}>
      {Object.keys(PromotionsData).length > 0 && errorMsg.length === 0 && (
        <View style={styles.container}>
          <FlatList
            data={getPromotions(PromotionsData)}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            listKey="someUniqueString"
            numColumns={2}
          />
        </View>
      )}
    </View>
  );
};

export default Promotion;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    alignItems: 'center',

    marginTop: 5,
  },
});

const tmpData = [
  {
    uri: 'https://filestore.community.support.microsoft.com/api/images/72e3f188-79a1-465f-90ca-27262d769841',
  },
  {
    uri: 'https://filestore.community.support.microsoft.com/api/images/72e3f188-79a1-465f-90ca-27262d769841',
  },
  {
    uri: 'https://filestore.community.support.microsoft.com/api/images/72e3f188-79a1-465f-90ca-27262d769841',
  },
  {
    uri: 'https://filestore.community.support.microsoft.com/api/images/72e3f188-79a1-465f-90ca-27262d769841',
  },
  {
    uri: 'https://filestore.community.support.microsoft.com/api/images/72e3f188-79a1-465f-90ca-27262d769841',
  },
  {
    uri: 'https://filestore.community.support.microsoft.com/api/images/72e3f188-79a1-465f-90ca-27262d769841',
  },
];
