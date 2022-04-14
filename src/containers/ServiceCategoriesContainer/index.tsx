import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { createStructuredSelector } from 'reselect';
import reducer from './reducer';
import saga from './saga';
import { makeSelectServiceCategories, makeSelectloading } from './selectors';
import { getServiceCategoriesAction } from './actions';
import ServiceComponent from 'components/ServiceComponent';
import Plus from '../../../assets/icons/Groupe 4517.svg';
import theme from 'theme/theme';
import { makeSelectPickedAddress } from 'containers/AddressesHandler/selectors';
import { useNavigation } from '@react-navigation/core';
import { SCREENS } from 'navigators/constants';

const key = 'ServiceCategoriesContainer';

const stateSelector = createStructuredSelector({
  serviceCategories: makeSelectServiceCategories(),
  loading: makeSelectloading(),
  pickedAddress: makeSelectPickedAddress,
});

const ServiceCategoriesContainer: React.FC<IServiceCategoriesContainer> =
  ({}) => {
    useInjectSaga({ key, saga });
    useInjectReducer({ key, reducer });

    const navigation: any = useNavigation();

    const dispatch = useDispatch();

    const { serviceCategories, loading, pickedAddress } =
      useSelector(stateSelector);

    useEffect(() => {
      // console.log({ message: 'From Cat', pickedAddress });
      if (pickedAddress?.cityId && pickedAddress?.cityId !== '')
        dispatch(getServiceCategoriesAction());
    }, [pickedAddress]);

    const handlePress = (serviceCategory: any) => {
      // Alert.alert(JSON.stringify(serviceCategory.serviceCategory.name));
      switch (serviceCategory.serviceCategory.name) {
        case 'Boutiques':
          navigation.navigate(SCREENS.SERVICES, { serviceCategory });
          break;
        case 'Chobik lobik':
          navigation.navigate(SCREENS.Choubik, { serviceCategory });
          break;
        case 'Coursier':
          navigation.navigate(SCREENS.EXPRESS, { serviceCategory });
          break;
        default:
          navigation.navigate(SCREENS.SERVICES, { serviceCategory });
          break;
      }
      // TODO: Perform Check for services Like Choubik Loubik and Coursier
    };
    return (
      <View
        style={{
          paddingHorizontal: 12,
        }}>
        {loading && <Text>Loading serviceCategories</Text>}
        {!loading && serviceCategories && (
          <>
            <Text style={styles.title}>Catégorie</Text>
            <FlatList
              columnWrapperStyle={{
                justifyContent: 'space-between',
                // paddingHorizontal: 20,
                //    backgroundColor: 'yellow',
              }}
              data={
                serviceCategories
                // .concat(serviceCategories)
                // .concat(serviceCategories)
                // .concat(serviceCategories)
                // .concat(serviceCategories)
                // .concat(serviceCategories)
                // .concat(serviceCategories)
                // .concat(serviceCategories)
                // .concat(serviceCategories)
                // .concat(serviceCategories)
                // .concat(serviceCategories)
                // .concat(serviceCategories)
                // .concat(serviceCategories)
                // .concat(serviceCategories)
                // .slice(0,7)
              }
              renderItem={({ item, index }) => (
                <ServiceComponent
                  service={item.serviceCategory}
                  handlePress={() => handlePress(item)}
                />
              )}
              ListFooterComponent={() => (
                <TouchableOpacity
                  style={{
                    marginLeft: 15,
                    alignItems: 'center',
                    // justifyContent: 'center',
                    borderRadius: 15,
                    //height: 150,
                    //padding: 6,
                    //   maxWidth: theme.dimensions.width / 4 - 10,
                  }}
                  // onPress={() => setShowModal(true)}
                >
                  <Text>MORE</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => 'FL_SERVICE_CATEGORIES' + index}
              numColumns={4}
            />
          </>
        )}
      </View>
    );
  };
const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: theme.palette.default.dark,
    letterSpacing: 0.2,
    marginBottom: 15,
  },
});
export interface IServiceCategoriesContainer {}

export default ServiceCategoriesContainer;
