import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { createStructuredSelector } from 'reselect';
import reducer from './reducer';
import saga from './saga';

import { setTagList } from 'containers/MuliCatgories/actions';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { requestMoreSingleCategory, setMoreSingleCategory } from './actions';
import { getName, makeSelecttagList } from './selectors';
import MultipleSearchComponent from 'components/MultipleSearchComponent';
interface Props {
  // test: boolean;
  // callTest: Function;
}

const key = 'filterNames';
const stateSelector = createStructuredSelector({
  payload: makeSelecttagList(),
  Selectednames: getName(),
});
const MultiCatgories = (props: Props) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const dispatch = useDispatch();
  //const [categories, setCategories] = useState([]);

  const { Selectednames, payload } = useSelector(stateSelector);
  //const [mutation, setMutation] = useState(payload ? payload : []);
  useEffect(() => {
    dispatch(requestMoreSingleCategory());
  }, []);
  // useEffect(() => {
  //   dispatch(setMoreSingleCategory(categories));
  // }, [categories]);

  // useEffect(() => {
  //   if (props.test) {
  //     dispatch(setMoreSingleCategory(setCategories([])));
  //     props.callTest();
  //   }
  // }, [props]);
  // useEffect(() => {
  //   console.log('selected names :', Selectednames);
  // }, [Selectednames]);
  const handleClick = (ObjCat: any) => {
    let selectedList;
    let fulList;
    fulList = payload.map((b: any) => {
      if (b.name === ObjCat.name) {
        return {
          name: ObjCat.name,
          isSelect: !ObjCat.isSelect,
        };
      } else {
        return b;
      }
    });

    // console.log('full List:', fulList ? fulList : 'no bueno');
    dispatch(setTagList(fulList));
    if (Selectednames?.map((a: any) => a.name).includes(ObjCat.name)) {
      selectedList = Selectednames.filter((a: any) => a.name !== ObjCat.name);
    } else {
      selectedList = [
        ...Selectednames,
        {
          name: ObjCat.name,
          isSelect: !ObjCat.isSelect,
        },
      ];
    }

    dispatch(setMoreSingleCategory(selectedList));
  };

  const renderItem = (items: any) => (
    <>
      <MultipleSearchComponent data={items.item} pressFuncion={handleClick} />
    </>
  );
  return (
    <View style={styles.container}>
      {payload && (
        <View>
          <Text style={styles.title}>Types de restaurants </Text>
          <FlatList
            data={payload}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={4}
          />
        </View>
      )}
    </View>
  );
};

export default MultiCatgories;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 10,
  },
  title: {
    fontSize: 21,
    fontWeight: 'bold',
    letterSpacing: 0.1,
  },
});

/**
 *
 * import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { createStructuredSelector } from 'reselect';
import reducer from './reducer';
import saga from './saga';
import { makeSelectPayload } from 'containers/FiltersContainer/selectors';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { requestMoreSingleCategory, setMoreSingleCategory } from './actions';
import { getName } from './selectors';
import MultipleSearchComponent from 'components/MultipleSearchComponent';
interface Props {
  test: boolean;
  callTest: Function;
}

const key = 'filterNames';
const stateSelector = createStructuredSelector({
  payload: makeSelectPayload(),
  Selectednames: getName(),
});
const MultiCatgories = (props: Props) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);

  const { payload, Selectednames } = useSelector(stateSelector);
  //const [mutation, setMutation] = useState(payload ? payload : []);
  useEffect(() => {
    dispatch(requestMoreSingleCategory());
  }, []);
  useEffect(() => {
    dispatch(setMoreSingleCategory(categories));
  }, [categories]);

  useEffect(() => {
    if (props.test) {
      dispatch(setMoreSingleCategory(setCategories([])));
      props.callTest();
    }
  }, [props]);
  // useEffect(() => {
  //   console.log(Selectednames);
  // }, [Selectednames]);
  const handleClick = (ObjCat: any) => {
    setCategories((prevState) => {
      if (prevState?.map((a) => a.name).includes(ObjCat.name)) {
        return prevState.filter((a: any) => a.name !== ObjCat.name);
      } else {
        return [
          ...prevState,
          {
            name: ObjCat.name,
            isSelect: !ObjCat.isSelect,
          },
        ];
      }
    });
  };

  const renderItem = (items: any) => (
    <>
      <MultipleSearchComponent data={items.item} pressFuncion={handleClick} />
    </>
  );
  return (
    <View style={styles.container}>
      {payload && (
        <View>
          <Text style={styles.title}>Types de restaurants </Text>
          <FlatList
            data={payload.filter((a: any) => a.name != 'More')}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={4}
          />
        </View>
      )}
    </View>
  );
};

export default MultiCatgories;

const styles = StyleSheet.create({
  container: {
    margin: 25,
  },
  title: {
    fontSize: 21,
    fontWeight: 'bold',
    letterSpacing: 0.1,
  },
});

 *
 */
