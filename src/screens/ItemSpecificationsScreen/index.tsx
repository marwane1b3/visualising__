/**
 *
 * ItemSpecificationsScreen
 *
 */

import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  TextInput,
  Text,
  Image,
  Dimensions,
  SectionList,
  Pressable,
  Animated,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import makeSelectItemSpecificationsScreen, {
  makeSelectItemSpecData,
  makeSelectItemSpecLoading,
  makeSelectItemSpecError,
  makeSelectSpecifications,
  makeSelectItemAndSpecificationsPrice,
  makeSelectItemQuantity,
  makeSelectReducedSpecs,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  getItemSpecificationsAction,
  setQuantity,
  setSpecificationChoiceSelected,
  setSpecificationOpen,
} from './actions';
import { FormattedMessage } from 'components/FormattedMessage';
import messages from './messages';
import { useNavigation } from '@react-navigation/core';
import { SCREENS } from 'navigators/constants';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import theme from 'theme/theme';
import { addItemAction } from 'containers/ShoppingCard/actions';

const stateSelector = createStructuredSelector({
  itemSpecificationsScreen: makeSelectItemSpecificationsScreen(),
  itemSpecif: makeSelectItemSpecData,
  loading: makeSelectItemSpecLoading,
  error: makeSelectItemSpecError,
  reducedSpecs: makeSelectReducedSpecs,
  itemAndSpecificationsPrice: makeSelectItemAndSpecificationsPrice,
  specifications: makeSelectSpecifications,
  quantity: makeSelectItemQuantity,
});

const key = 'itemSpecificationsScreen';

export const ItemSpecificationsScreen: React.FC<IItemSpecificationsScreenProps> =
  ({ route }: any) => {
    useInjectReducer({ key, reducer });
    useInjectSaga({ key, saga });

    /* eslint-disable no-unused-vars */
    const {
      itemSpecif,
      loading,
      error,
      reducedSpecs,
      quantity,
      itemAndSpecificationsPrice,
      specifications,
    } = useSelector(stateSelector);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [colorV, setColorV] = useState('');

    /* eslint-enable no-unused-vars */

    const navigateToItemsList = () => {
      navigation.goBack();
    };
    const { item, product } = route.params;
    const [note, setNote] = useState('');

    useEffect(() => {
      dispatch(setQuantity(1));
      item && dispatch(getItemSpecificationsAction(item._id));
    }, [item]);

    const checkSpecChoiceDisabled = (specListItem: any, section: any) => {
      return (
        !specListItem.selected &&
        section.spec.list.filter((c: any) => c.selected).length >=
          section.spec.maxChoices
      );
    };

    const handleAddItemToShoppingCart = () => {
      const specificationsToAdd = specifications.map((spec: any) => {
        const { list, ...specification } = spec;
        specification.list = list.filter((choice: any) => choice.selected);
        return specification;
      });
      let totalPrice = 0;
      let itemPrice = item.price;
      let specificationPrice = 0;
      specificationsToAdd.forEach((specification: any) => {
        specification.list.forEach((specItem: any) => {
          if (specItem.selected) {
            if (specification.priceconfig === 'add')
              specificationPrice += specItem.price;
            else if (specification.priceconfig === 'override')
              itemPrice = specItem.price;
          }
        });
      });
      totalPrice = (itemPrice + specificationPrice) * quantity;

      let itemToAdd = {
        itemId: item._id,
        quantity: quantity,
        name: item.name,
        itemPrice: itemPrice,
        specificationPrice: specificationPrice,
        itemTotalPrice: totalPrice,
        specifications: specificationsToAdd,
        reducedSpecs:
          reducedSpecs +
          (note != '' ? (reducedSpecs != '' ? ', ' : '') + note : ''),
      };

      dispatch(addItemAction(itemToAdd, item, product));
      navigation.goBack();
      // console.log({ itemToAdd: JSON.stringify(itemToAdd) });
    };

    return (
      <View style={styles.container}>
        {loading && (
          <View>
            <Text>Loading....</Text>
          </View>
        )}
        {specifications && !loading && (
          <>
            <Animated.SectionList
              // stickySectionHeadersEnabled
              // ref={itemsSectionListRef}
              ListHeaderComponent={() => (
                <>
                  {itemSpecif.imageUrl != '' &&
                    itemSpecif.imageUrl != 'imageUrl' && (
                      <Image
                        source={{
                          uri: itemSpecif.imageUrl,
                        }}
                        style={styles.itemImageStyle}
                        resizeMode="cover"
                      />
                    )}
                  <View
                    style={{
                      justifyContent: 'flex-start',
                      flexDirection: 'row',
                      paddingHorizontal: 15,
                      backgroundColor: 'transparent',
                      position: 'absolute',
                      marginTop: 11,
                    }}>
                    <TouchableOpacity onPress={() => navigateToItemsList()}>
                      <Icon
                        style={{ padding: 5, paddingRight: 10 }}
                        name="arrow-left"
                        size={20}
                        color={
                          itemSpecif.imageUrl != '' &&
                          itemSpecif.imageUrl != 'imageUrl'
                            ? '#FFFFFF'
                            : theme.palette.default.main
                        }
                      />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.titleStyle}>{itemSpecif.name} </Text>
                  <View style={styles.descView}>
                    <Text style={styles.descStyle}>
                      {(itemSpecif.description || '').trim()}{' '}
                      {itemSpecif.imageUrl}
                    </Text>
                    {/* <Text style={styles.descStyle}> specs Selectionnés: {reducedSpecs}</Text> */}
                  </View>
                </>
              )}
              onViewableItemsChanged={({ viewableItems, changed }) => {
                try {
                } catch (e) {}
              }}
              viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
              sections={specifications.map((spec: any, index: number) => {
                return {
                  title: spec.name,
                  specIndex: index,
                  spec: spec,
                  data: spec.list.map(
                    (specificationChoice: any, index: number) => {
                      return {
                        ...specificationChoice,
                        specificationChoiceIndex: index,
                      };
                    },
                  ),
                };
              })}
              keyExtractor={(item, index) => item + index}
              renderSectionHeader={({ section }) => (
                <>
                  {/* <Text>{JSON.stringify(section.spec)}</Text> */}
                  <TouchableOpacity
                    style={styles.sectionHeader}
                    key={section.spec._id}
                    onPress={() => {
                      dispatch(setSpecificationOpen(section.specIndex));
                    }}>
                    <View
                      style={{
                        flexDirection: 'column',
                      }}>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: '700',
                        }}>
                        {section.spec.name}
                      </Text>
                      <View>
                        <Text style={{ color: 'grey', fontSize: 16 }}>
                          {section.spec.type == 'single'
                            ? 'Choisir une option'
                            : `choisir un maximum de ${section.spec.maxChoices} options`}
                        </Text>
                        {/*                         
                          <Text style={{ color: 'red', fontSize: 14 }}>
                          {'Veuillez coisir un choix'}
                          </Text>
                        */}
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      {section.spec.required && (
                        <View
                          style={{
                            backgroundColor: colorV ? colorV : '#ffd79e',
                          }}>
                          <Text
                            style={{
                              color: colorV ? '#FFFFFF' : '#000',
                              fontSize: 12,
                            }}>
                            obligatoire
                          </Text>
                        </View>
                      )}
                      {section.spec.open ? (
                        <MaterialIcons
                          name="keyboard-arrow-up"
                          color="grey"
                          size={22}
                        />
                      ) : (
                        <MaterialIcons
                          name="keyboard-arrow-right"
                          color="grey"
                          size={22}
                        />
                      )}
                    </View>
                  </TouchableOpacity>
                </>
              )}
              // SectionSeparatorComponent={() => (
              //   <View
              //     style={{ marginVertical: theme.spacing.default[0] }}></View>
              // )}
              renderItem={({ item: specListItem, section }) => {
                return (
                  section.spec.open && (
                    <TouchableOpacity
                      disabled={checkSpecChoiceDisabled(specListItem, section)}
                      style={[styles.row]}
                      onPress={() => {
                        dispatch(
                          setSpecificationChoiceSelected(
                            section.specIndex,
                            specListItem.specificationChoiceIndex,
                          ),
                        );
                      }}>
                      <Text
                        style={[
                          styles.rowViewStyle,
                          {
                            flex: 1,
                            color: checkSpecChoiceDisabled(
                              specListItem,
                              section,
                            )
                              ? 'grey'
                              : 'black',
                          },
                        ]}>
                        {specListItem.name}
                      </Text>

                      <View style={{ flexDirection: 'row' }}>
                        {!!specListItem.price && specListItem.price > 0 && (
                          <Text
                            style={[
                              {
                                paddingRight: theme.spacing.default[1],
                                color: checkSpecChoiceDisabled(
                                  specListItem,
                                  section,
                                )
                                  ? 'grey'
                                  : 'black',
                              },
                            ]}>
                            {specListItem.price} Dhs
                          </Text>
                        )}

                        <AntDesign
                          name={specListItem.selected ? 'checkcircle' : 'plus'}
                          size={20}
                          color={
                            checkSpecChoiceDisabled(specListItem, section)
                              ? 'grey'
                              : '#28B873'
                          }
                        />
                      </View>
                    </TouchableOpacity>
                  )
                );
              }}
              ListFooterComponent={() => (
                <>
                  <View
                    style={{
                      padding: 16,
                    }}>
                    <TextInput
                      placeholder="Ajouter une note"
                      defaultValue={note}
                      multiline={true}
                      numberOfLines={4}
                      onChangeText={(text: string) => setNote(text)}
                      style={{
                        color: '#CDD4D9',
                        borderColor: '#CDD4D9',
                        borderRadius: 12,
                        borderWidth: 1,
                        justifyContent: 'flex-start',
                      }}
                    />
                  </View>
                  <View style={styles.addRemove}>
                    <TouchableOpacity
                      onPress={() => {
                        quantity > 1 && dispatch(setQuantity(quantity - 1));
                      }}
                      style={[
                        styles.minusPlusStyle,
                        {
                          backgroundColor:
                            quantity === 1 ? '#28B87329' : '#28B873',
                        },
                      ]}>
                      <Text
                        style={[
                          styles.ationsStyle,
                          { color: quantity === 1 ? '#28B873' : 'white' },
                        ]}>
                        -
                      </Text>
                    </TouchableOpacity>
                    <View>
                      <Text
                        style={{
                          color: '#28B873',
                          fontWeight: '700',
                          fontSize: 24,
                        }}>
                        {quantity}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => dispatch(setQuantity(quantity + 1))}
                      style={styles.minusPlusStyle}>
                      <Text style={styles.ationsStyle}>+</Text>
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={handleAddItemToShoppingCart}>
                    <Text
                      style={{
                        fontSize: 19,
                        color: '#FFFFFF',
                      }}>
                      Ajouter (x{quantity}){' '}
                      {itemAndSpecificationsPrice.toFixed(2)} Dhs
                    </Text>
                  </TouchableOpacity>
                </>
              )}
              // onScroll={}
            />
            {/* <Text>{JSON.stringify(specifications)}</Text> */}
          </>
        )}
      </View>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: 24,
  },
  itemImageStyle: {
    width: Dimensions.get('window').width,
    height: 250,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
  },
  titleStyle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#28B873',
    alignSelf: 'center',
    marginTop: 18,
  },
  descStyle: {
    color: '#999999',
    textAlign: 'center',
  },
  descView: {
    paddingHorizontal: theme.spacing.default[0],
    alignSelf: 'center',
    paddingTop: theme.spacing.default[0],
  },
  row: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionHeader: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 18,
  },
  minusPlusStyle: {
    backgroundColor: '#28B873',
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    margin: 20,
  },
  ationsStyle: {
    fontSize: 20,
    color: 'white',
  },
  checkedView: {
    width: 20,
    height: 20,
    borderRadius: 50,
    borderColor: '#28B873',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowViewStyle: {
    fontSize: 15,
  },
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#28B873',
    width: 230,
    height: 50,
    alignSelf: 'center',
    margin: 20,
    borderRadius: 30,
  },
  addRemove: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export interface IItemSpecificationsScreenProps {}

export default ItemSpecificationsScreen;
