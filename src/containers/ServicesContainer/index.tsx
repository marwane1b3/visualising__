import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';

import reducer from './reducer';
import saga from './saga';

import { createStructuredSelector } from 'reselect';
import { colors } from 'theme/colors';
import { useNavigation } from '@react-navigation/core';
import { Image } from 'react-native';
import theme from 'theme/theme';
import ServiceComponent from 'components/ServiceComponent';
import { NAVIGATORS, SCREENS } from 'navigators/constants';

const stateSelector = createStructuredSelector({});
const key = 'ServicesContainer';

const ServicesContainer: React.FC<IServicesContainer> = ({
  serviceCategory,
}) => {
  useInjectSaga({ key, saga });
  useInjectReducer({ key, reducer });

  const navigation: any = useNavigation();

  const handlePress = (service: any) => {
    navigation.navigate(SCREENS.STORES_LIST, {
      service: service,
    });
    //TODO: It might need some check on service.type
  };

  return (
    <>
      {serviceCategory && serviceCategory.services.length > 0 && (
        <View style={styles.container}>
          <View style={styles.serviceCategoryContainerStyle}>
            <Text style={styles.serviceCategoryNameStyle}>
              {serviceCategory.serviceCategory.name}
            </Text>
          </View>
          <FlatList
            columnWrapperStyle={{
              justifyContent: 'space-between',
              paddingHorizontal: 20,
            }}
            data={serviceCategory.services
              // .concat(serviceCategory.services)
              // .concat(serviceCategory.services)
              // .concat(serviceCategory.services)
              // .concat(serviceCategory.services)
              // .concat(serviceCategory.services)
              // .concat(serviceCategory.services)
              .slice(0, 7)}
            keyExtractor={(item, index) => 'FL_SERVICES' + index}
            renderItem={({ item, index }) => (
              <ServiceComponent
                service={item}
                handlePress={() => handlePress(item)}
              />
            )}
            numColumns={4}
          />
        </View>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    margin: 20,
  },

  serviceCategoryContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  serviceCategoryIconStyle: {
    resizeMode: 'contain',
    alignItems: 'center',
  },
  serviceCategoryNameStyle: {
    textAlign: 'center',
    fontSize: 24,
    letterSpacing: 1.5,
    fontWeight: 'bold',
    marginLeft: 12,
  },
});
export interface IServicesContainer {
  serviceCategory: any;
}

export default ServicesContainer;
