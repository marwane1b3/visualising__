import React, { useEffect, useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Animated,
} from 'react-native';
// import { makeSelectPayload } from 'containers/FiltersContainer/selectors';
import { createStructuredSelector } from 'reselect';
import { useNavigation } from '@react-navigation/core';
import { useSelector, useDispatch } from 'react-redux';
import reducer from './reducer';
import { getMultiFilters, requestMultiFilters } from './actions';
import saga from './saga';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { getName } from 'containers/MuliCatgories/selectors';
import MultiCategories from 'containers/MuliCatgories';
import { setMultiData } from 'containers/FourchettePrixContainer/actions';
import { data } from 'containers/FourchettePrixContainer/constants';
import { getTriData } from 'containers/FourchettePrixContainer/selectors';
import FourchettePrixContainer from 'containers/FourchettePrixContainer';
import { setMoreSingleCategory } from 'containers/MuliCatgories/actions';
// import { newDumbCatgories } from 'containers/FiltersContainer/Dcategories';
// import // getCategoriesList,
// // getCategoriesListSuccess,
// 'containers/FiltersContainer/actions';
import { setMUltiTriAction } from 'containers/FourchettePrixContainer/actions';
import { getTriName } from 'containers/FourchettePrixContainer/selectors';
import {
  setMUltiPromoAction,
  setMultiPromoData,
} from 'containers/TypePromo/actions';
import { dataPromo } from 'containers/TypePromo/constants';
import { getPromoData, getPromoName } from 'containers/TypePromo/selectors';
import TypePromo from 'containers/TypePromo';
import { makeSelecttagList } from 'containers/FiltersContainer/selectors';
import { setTagList } from 'containers/MuliCatgories/actions';
import theme from 'theme/theme';

const stateSelector = createStructuredSelector({
  // payload: makeSelectPayload(),
  filterNames: getName(),
  initialTriData: getTriData(),
  triNames: getTriName(),
  promoFullList: getPromoData(),
  promoSelectedItem: getPromoName(),
});
interface Props {
  dismissFlag: boolean;
  shutModal: any;
  tags: any;
}
const key = 'filters';

const MultiFilterScreen = (props: Props) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const { filterNames, triNames, promoFullList, promoSelectedItem } =
    useSelector(stateSelector);
  // const [flip, setFlip] = useState(false);
  React.useEffect(() => {
    dispatch(requestMultiFilters());
  }, []);
  useEffect(() => {
    dispatch(getMultiFilters([]));
    clearAll();
  }, []);
  const navigation: any = useNavigation();
  const dispatch = useDispatch();

  const clearAll = () => {
    // setFlip(true);
    dispatch(setMoreSingleCategory([]));
    dispatch(setMUltiTriAction([]));
    // dispatch(getCategoriesList());
    dispatch(
      setTagList(
        props.tags.map((t: object) => {
          return { ...t, isSelect: false };
        }),
      ),
    );
    dispatch(setMultiData(data));
    dispatch(setMultiPromoData(dataPromo));
    dispatch(setMUltiPromoAction([]));
  };

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 450,
      useNativeDriver: true,
    }).start();
  };

  const fadIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 450,
      useNativeDriver: true,
    }).start();
  };
  const translation = useRef(new Animated.Value(0)).current;
  const expand = () => {
    Animated.timing(translation, {
      toValue: -theme.dimensions.width / 4 + 20,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };
  const shrink = () => {
    Animated.timing(translation, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };
  useEffect(() => {
    if (
      triNames.length > 0 ||
      filterNames.length > 0 ||
      promoSelectedItem.length > 0
    ) {
      shrink();
    } else {
      expand();
    }
  }, [translation, shrink, expand]);
  useEffect(() => {
    if (
      triNames.length > 0 ||
      filterNames.length > 0 ||
      promoSelectedItem.length > 0
    ) {
      fadIn();
    } else {
      fadOut();
    }
  }, [fadeAnim, fadIn, fadOut]);
  const renderScrollItems = [
    <FourchettePrixContainer />,
    <TypePromo />,
    <View style={{ marginBottom: 70 }}>
      <MultiCategories />
    </View>,
  ];

  return (
    <View style={styles.screenContainer}>
      <View style={{ marginBottom: 40 }}>
        <FlatList
          data={renderScrollItems}
          renderItem={(items) => <>{items.item}</>}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      {/* <BackButton /> */}
      <View
        style={{
          width: '100%',
          position: 'absolute',
          bottom: 0,
          backgroundColor: theme.palette.default.light,
          flex: 1,
          padding: 5,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          //  elevation: 5,
        }}>
        <Animated.View style={{ opacity: fadeAnim }}>
          <TouchableOpacity
            style={styles.confirmBtn}
            onPress={() => {
              clearAll();
            }}>
            <Text
              style={{
                color: theme.palette.default.main,
                fontSize: 18,
                textAlign: 'center',
              }}>
              Effacer
            </Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View
          style={{
            paddingHorizontal: 50,
            backgroundColor: theme.palette.default.main,
            paddingVertical: 15,

            //left: '7%',
            marginRight: 15,
            borderWidth: 1,
            borderColor: '#42f554',
            borderRadius: 75,
            transform: [{ translateX: translation }],
          }}>
          <TouchableOpacity
            onPress={() => {
              //setStateData(filterNames);
              dispatch(
                getMultiFilters([
                  { filterNames },
                  { triNames },
                  { promoSelectedItem },
                ]),
              );
              //  console.log(stateData);
              //    dispatch(getCategoriesListSuccess(newDumbCatgories));
              // navigation.goBack();
              clearAll();
              props.shutModal(props.dismissFlag);
            }}>
            <Text style={styles.title}>Confirmer</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};

export default MultiFilterScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    borderColor: 'black',
    borderWidth: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  confirmBtn: {
    backgroundColor: theme.palette.default.light,

    paddingVertical: 15,
    paddingHorizontal: 50,
    //left: '7%',
    borderWidth: 1,
    borderColor: theme.palette.default.main,
    borderRadius: 75,
  },
  title: {
    color: theme.palette.default.light,
    fontSize: 18,
    textAlign: 'center',
  },
});

/***


import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { makeSelectPayload } from 'containers/FiltersContainer/selectors';
import { createStructuredSelector } from 'reselect';
import { useNavigation } from '@react-navigation/core';
import { useSelector, useDispatch } from 'react-redux';
import reducer from './reducer';
import { getMultiFilters, requestMultiFilters } from './actions';
import saga from './saga';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { getName } from 'containers/MuliCatgories/selectors';
import MultiCategories from 'containers/MuliCatgories';
import FourchettePrix from 'components/FourchettePrix';
import { setMoreSingleCategory } from 'containers/MuliCatgories/actions';
const stateSelector = createStructuredSelector({
  payload: makeSelectPayload(),
  filterNames: getName(),
});
interface Props {
  dismissFlag: boolean;
  shutModal: any;
}
const key = 'filters';

const MultiFilterScreen = (props: Props) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const { payload, filterNames } = useSelector(stateSelector);
  const [flip, setFlip] = useState(false);
  React.useEffect(() => {
    dispatch(requestMultiFilters());
  }, []);

  // React.useEffect(() => {
  //   console.log(filterNames);
  // }, [filterNames]);

  const navigation: any = useNavigation();
  const dispatch = useDispatch();
  //const [clean, setClean] = React.useState(false);
  const callBack = () => {
    setFlip((prevState) => !prevState);
  };
  const clearAll = () => {
    setFlip(true);
    dispatch(setMoreSingleCategory([]));
    dispatch(getMultiFilters([]));
  };

  const renderScrollItems = [
    <FourchettePrix />,
    <View>
      <MultiCategories test={flip} callTest={callBack} />
    </View>,
  ];

  return (
    <View style={styles.screenContainer}>
      <View style={{ marginBottom: 40 }}>
        <FlatList
          data={renderScrollItems}
          renderItem={(items) => <>{items.item}</>}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      {/* <BackButton />
      <View
        style={{
          width: '100%',
          position: 'absolute',
          bottom: 0,
          backgroundColor: '#f7f7f7',
          flex: 1,
          padding: 5,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          elevation: 5,
        }}>
        <TouchableOpacity
          style={styles.confirmBtn}
          onPress={() => {
            clearAll();

            console.log('more maintainance please .');
          }}>
          <Text style={styles.title}>Effacer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.confirmBtn}
          onPress={() => {
            //setStateData(filterNames);
            dispatch(getMultiFilters([{ filterNames }]));
            //  console.log(stateData);

            // navigation.goBack();
            props.shutModal(props.dismissFlag);
          }}>
          <Text style={styles.title}>Appliquer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MultiFilterScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  confirmBtn: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    paddingHorizontal: 50,
    //left: '7%',
    borderWidth: 1,
    borderColor: '#42f554',
    borderRadius: 75,
  },
  title: {
    color: '#42f554',
    fontSize: 18,
  },
});









 */
