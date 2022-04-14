import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ServicesContainer from 'containers/ServicesContainer';

import TabsNavigator from 'components/TabsNavigator';
import AdBannierContainer from 'containers/AdBannierContainer';
import { useIsFocused } from '@react-navigation/native';
import { createStructuredSelector } from 'reselect';
import { makeSelectErrorPubMessage } from 'containers/AdBannierContainer/selectors';
const stateSelector = createStructuredSelector({
  errorMsg: makeSelectErrorPubMessage(),
});
interface Props {
  route: any;
}

const ServicesScreen = (props: Props) => {
  const { serviceCategory } = props.route.params;
  // console.log(serviceCategory.serviceCategory._id);
  const { errorMsg } = useSelector(stateSelector);
  const dispatch = useDispatch();
  const isFocus = useIsFocused();
  const [mounted, setMounted] = useState(false);

  const dummy = [
    <ServicesContainer serviceCategory={serviceCategory} />,
    <View
      style={{
        marginTop: 30,
        // marginHorizontal: 10,
        elevation: 3,
      }}>
      {isFocus && (
        <AdBannierContainer serviceId={serviceCategory.serviceCategory._id} />
      )}
    </View>,

    isFocus && <TabsNavigator />,
  ];

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: '#FFFFFF',
          padding: 10,
        }}>
        <FlatList
          data={dummy}
          showsVerticalScrollIndicator={false}
          renderItem={(items) => <>{items.item}</>}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </>
  );
};

export default ServicesScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  containerItem: {
    marginTop: 10,
    // margin: 1,
    resizeMode: 'contain',
    alignItems: 'center',
  },
});
