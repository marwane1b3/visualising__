import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  Pressable,
  StatusBar,
  Platform,
} from 'react-native';
import { ServiceTag } from '../../components/ServiceTag';

import { useSelector, useDispatch } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { createStructuredSelector } from 'reselect';
import reducer from './reducer';
import saga from './saga';
import { makeSelecttagList } from './selectors';
// import { getCategoriesList, getSingleFilter } from './actions';
import { useNavigation, NavigationAction } from '@react-navigation/core';
import MultiFiltersScreen from 'screens/MultiFiltersScreen';
import { changeTagSelect, setTagList } from './actions';
import theme from 'theme/theme';
import { getFilters } from 'screens/MultiFiltersScreen/selectors';
import { getMultiFilters } from 'screens/MultiFiltersScreen/actions';
const stateSelector = createStructuredSelector({
  tagList: makeSelecttagList(),
  AllMightyFilters: getFilters(),
});

const key = 'FiltersContainer';
export const FiltersContainer: React.FC<IFiltersContainerProps> = ({
  tags,
}) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const navigation: any = useNavigation();
  const dispatch = useDispatch();

  const { tagList, AllMightyFilters } = useSelector(stateSelector);

  const [showModal, setShowModal] = useState(false);

  const closeModal = (flag: boolean) => {
    setShowModal(!flag);
  };
  useEffect(() => {
    if (!showModal) {
      dispatch(
        setTagList(
          tags.map((t: object) => {
            return { ...t, isSelect: false };
          }),
        ),
      );
    }
  }, [showModal]);

  useEffect(() => {
    dispatch(
      setTagList(
        tags.map((t: object) => {
          return { ...t, isSelect: false };
        }),
      ),
    );
  }, []);

  const verifyMoreFilters = (moreFilters: []) => {
    let check = moreFilters.map((a: any) => {
      if (
        a.filterNames?.length > 0 ||
        a.triNames?.length > 0 ||
        a.promoSelectedItem?.length > 0
      ) {
        return true;
      }
    });
    if (check.includes(true)) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <View style={{}}>
        <FlatList
          contentContainerStyle={{
            justifyContent: 'space-around',
            alignItems: 'center',
            paddingVertical: 15,
            borderWidth: 1,

            flex: 1,
          }}
          data={verifyMoreFilters(AllMightyFilters) ? [] : tagList.slice(0, 4)}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <ServiceTag
              tag={item}
              onPressTag={() => {
                dispatch(changeTagSelect(item));
              }}
            />
          )}
          ListFooterComponent={() => (
            <TouchableOpacity
              style={{
                // marginLeft: 15,
                alignItems: 'center',
                height: 55,
                borderWidth: 1,
                width: 55,
                borderRadius: 15,
              }}
              onPress={() => {
                // verifyMoreFilters(AllMightyFilters) ? setShowModal(true) : setShowModal(false)

                if (verifyMoreFilters(AllMightyFilters)) {
                  dispatch(getMultiFilters([]));
                  setShowModal(false);
                } else {
                  setShowModal(true);
                }
              }}>
              <Text>MORE</Text>
            </TouchableOpacity>
          )}
          horizontal={true}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          setShowModal(!showModal);
        }}
        // useNativeDriver={true}
      >
        {/*
          <Pressable
            style={{
              alignItems: 'center',
            }}
            onPress={() => setShowModal(!showModal)}>
            <Text style={{ fontSize: 25 }}>-----</Text>
          </Pressable> */}
        <TouchableOpacity
          style={{
            height: 100,
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'center',
            // width: '100%',
            width: theme.dimensions.width,
            backgroundColor: 'rgba(0,0,0,0.4)',
            //  overflow: 'hidden',
            //  elevation: 3,
          }}
          onPressOut={() => {
            setShowModal(false);
          }}>
          <StatusBar
            translucent
            backgroundColor={'rgba(0,0,0,0.4)'}
            barStyle="light-content"
          />
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            //borderWidth: 1,
            //elevation: 5,
            backgroundColor: 'rgba(0,0,0,0.4)',
          }}>
          <MultiFiltersScreen
            dismissFlag={showModal}
            shutModal={closeModal}
            tags={tags}
          />
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    backgroundColor: '#fff',
    marginTop: 10,
    height: 110,
    width: '100%',
  },
  SfilterContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,

    margin: 10,
    height: 110,
    width: '87%',
  },
  restauCatgoryName: {
    textAlign: 'center',
    fontFamily: 'Nova-Condensed',
    color: 'black',
    fontSize: 19,
  },
  tmpBox: {
    // margin: 20,
    height: 60,
    width: 60,
    // paddingTop: 15,
    // paddingVertical: ,
    borderRadius: 15,
    backgroundColor: '#1583D8',
    borderWidth: 1,
  },
});

export interface IFiltersContainerProps {
  tags: any;
}

export default FiltersContainer;
