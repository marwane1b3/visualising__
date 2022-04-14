/**
 *
 * ItemsListContainer
 *
 */

import React, { memo, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  SectionList,
  ImageBackground,
  SafeAreaView,
  Animated,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import makeSelectItemsListContainer from './selectors';
import { selectIndex } from 'screens/ItemsListScreen/selectors';

import reducer from './reducer';
import saga from './saga';
import theme from 'theme/theme';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  addItemAction,
  minusItemQuantity,
  plusItemQuantity,
} from 'containers/ShoppingCard/actions';
import { useState } from 'react';
import { makeSelectProducts } from 'containers/ShoppingCard/selectors';
import { useRef } from 'react';
import ProductSectionComponent from 'components/ProductSectionComponent';
import ItemsSectionComponent from 'components/ItemsSectionComponent';

const stateSelector = createStructuredSelector({
  itemsListContainer: makeSelectItemsListContainer(),
  index: selectIndex(),
});
const HEADER_SCROLL_DISTANCE = 160;

const key = 'itemsListContainer';
export interface IItemsListContainerProps {
  data: any;
}
const ItemsListContainer: React.FC<IItemsListContainerProps> = ({ data }) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  /* eslint-disable no-unused-vars */
  const {} = useSelector(stateSelector);
  const [products, setProducts] = useState([]);
  const [scrollTitle, setScrollTitle] = useState('');
  /* eslint-enable no-unused-vars    */

  const scrollEvent = useRef(new Animated.Value(0)).current;
  const headerOpacity = scrollEvent.interpolate({
    inputRange: [
      0,
      HEADER_SCROLL_DISTANCE / 4,
      HEADER_SCROLL_DISTANCE / 2,
      HEADER_SCROLL_DISTANCE * 3 / 4,
      HEADER_SCROLL_DISTANCE,
    ],
    outputRange: [0, 0, 0, 0, 1],
    extrapolate: 'clamp',
  });

  const itemsSectionListRef = useRef<SectionList>(null);
  const productsFlatListRef = useRef<FlatList>(null);
  const productsFlatListRef1 = useRef<FlatList>(null);

  useEffect(() => {
    setProducts(
      data.reduce((acc: any, productCategory: any) => {
        return [...acc, ...productCategory.products];
      }, []),
    );
  }, [data]);

  const renderProductItem = ({ item, index }: { item: any; index: number }) => {
    return (
      <TouchableOpacity
        style={{
          minWidth: 80,
          paddingVertical: theme.spacing.default[1],
          paddingHorizontal: theme.spacing.default[1],
          margin: theme.spacing.default[2],
          borderRadius: 50,
          backgroundColor:
            scrollTitle == item.product.name
              ? theme.palette.default.main
              : theme.palette.default.light,
          elevation: scrollTitle == item.product.name ? 3 : 0,
        }}
        onPress={() => {
          if (itemsSectionListRef && itemsSectionListRef.current) {
            itemsSectionListRef.current.scrollToLocation({
              animated: false,
              itemIndex: 0,
              sectionIndex: index,
              viewPosition: 0,
              viewOffset: 60,
            });
          }
          setScrollTitle(item.product.name);
        }}>
        <Text
          style={{
            fontSize: 14,
            color:
              scrollTitle == item.product.name
                ? theme.palette.default.light
                : theme.palette.default.main,
            textAlign: 'center',
          }}>
          {item.product.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const TheImage = ( ) => 
    <ImageBackground
      source={{
        uri: 'https://www.mycuisine.com/wp-content/uploads/2018/12/burger-rossini.jpg',
      }}
      style={styles.image}>
      <View style={styles.rgba}>
        <SafeAreaView style={{ marginTop: 15, flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={() => {
              // navigation.goBack();
            }}>
            {/* <Icon
                          name="arrow-back-outline"
                          style={styles.goBackIcon}></Icon> */}
          </TouchableOpacity>
          {/* <Search /> */}
        </SafeAreaView>
        <View style={styles.container}>
          <Text style={styles.title}>{'storeDetails.name'}</Text>
        </View>
      </View>
    </ImageBackground>
  ;

  const renderProductsHeader = (interpolate: boolean) => (
    <Animated.View
      style={[
        {
          backgroundColor: '#FFFFFF',
        },
        interpolate
          ? {
              position: 'absolute',
              zIndex: 100,
              opacity: headerOpacity,
              // transform: [
              //   { scaleY: headerOpacity }
              // ],
            }
          : {},
      ]}>
      <FlatList
        ref={productsFlatListRef}
        contentContainerStyle={{
          justifyContent: 'center',
        }}
        data={products}
        keyExtractor={(item: any, index: number) => `_key${index.toString()}`}
        renderItem={renderProductItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        // initialNumToRender={30}
      />
    </Animated.View>
  ); 

  return (
    <View style={styles.containerItemsListStyle}>
      {products && (
        <View
          style={{
            flex: 1,
          }}>
          {/* <View
            style={{
              backgroundColor: '#FFFFFF',
            }}>
            <FlatList
              ref={productsFlatListRef}
              contentContainerStyle={{
                justifyContent: 'center',
              }}
              data={products}
              keyExtractor={(item: any, index: number) =>
                `_key${index.toString()}`
              }
              renderItem={renderProductItem}
              horizontal
              showsHorizontalScrollIndicator={false}
              // initialNumToRender={30}
            />
          </View> */}
          {renderProductsHeader(true)}

          <Animated.SectionList
            // stickySectionHeadersEnabled
            ref={itemsSectionListRef}
            ListHeaderComponent={() => (
              <>
                <TheImage />
                <View
                  style={{
                    backgroundColor: '#FFFFFF',
                  }}>
                  <FlatList
                    ref={productsFlatListRef1}
                    contentContainerStyle={{
                      justifyContent: 'center',
                    }}
                    data={products}
                    keyExtractor={(item: any, index: number) =>
                      `_key${index.toString()}`
                    }
                    renderItem={renderProductItem}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    // initialNumToRender={30}
                  />
                </View>
              </>
            )}
            onViewableItemsChanged={({ viewableItems, changed }) => {
              try {
                setScrollTitle(
                  (viewableItems[0].section || { title: '' }).title,
                );
                if (productsFlatListRef && productsFlatListRef.current) {
                  productsFlatListRef.current.scrollToIndex({
                    animated: true,
                    index: (viewableItems[0].section || { titleIndex: 0 })
                      .titleIndex,
                    viewPosition: 0.5,
                  });
                }
                if (productsFlatListRef1 && productsFlatListRef1.current) {
                  productsFlatListRef1.current.scrollToIndex({
                    animated: true,
                    index: (viewableItems[0].section || { titleIndex: 0 })
                      .titleIndex,
                    viewPosition: 0.5,
                  });
                }
              } catch (e) {}
            }}
            viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
            sections={products.map((p: any, index: number) => {
              return {
                title: p.product.name,
                titleIndex: index,
                product: p.product,
                data: p.items,
              };
            })}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item, section }) => (
              <ItemsSectionComponent
                productWrapper={{ product: section.product, item: item }}
              />
            )}
            SectionSeparatorComponent={() => (
              <View style={{ marginVertical: theme.spacing.default[0] }}></View>
            )}
            renderSectionHeader={({ section }) => (
              <ProductSectionComponent
                productWrapper={{ product: section.product }}
              />
            )}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollEvent } } }],
              { useNativeDriver: true }, // <-- Add this
            )}
          />
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  containerItemsListStyle: {
    flex: 1,
    backgroundColor: theme.palette.default.light,
  },
  headerContainerTitleStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.default.main,
    borderRadius: 10,
    paddingVertical: theme.spacing.default[0],
  },
  headerTitleStyle: {
    color: theme.palette.default.light,
    fontSize: 18,
  },
  container: {
    //justifyContent: 'center',
    marginTop: 25,
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontSize: 40,
    fontFamily: 'Nova-Condensed',
    color: theme.palette.default.light,
  },
  image: {
    width: '100%',
    height: HEADER_SCROLL_DISTANCE,
    borderWidth: 1,
    borderBottomWidth: 20,
    borderColor: 'black',
  },
  goBackIcon: {
    fontSize: 30,
    paddingTop: 7,
    paddingHorizontal: 7,
    color: theme.palette.default.light,
  },
  rgba: {
    width: '100%',
    height: 200,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
});

export default ItemsListContainer;
