/**
 *
 * ShoppingCard
 *
 */

import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import makeSelectShoppingCard from './selectors';
import reducer, { initialState } from './reducer';
import saga from './saga';
import usePersistor from 'hooks/userPersistor';
import { rehydrateStoreAction } from './actions';

const stateSelector = createStructuredSelector({
  shoppingCard: makeSelectShoppingCard(),
});

const key = 'shoppingCard';

export const ShoppingCard: React.FC<IShoppingCardProps> = ({}) => {
  // const { loadPersistedStore } = usePersistor({ key, reducer, initialState });
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const { shoppingCard } = useSelector(stateSelector);
  const dispatch = useDispatch();

  // const syncStore = async () => {
  //   try {
  //     const persistedStore = await loadPersistedStore();
  //     dispatch(rehydrateStoreAction(persistedStore));
  //     console.log('show Persisted items : ', persistedStore);
  //   } catch (error) {
  //     console.log('show Persisted items error :', error);
  //   }
  // };

  //TODO: if we want to keep  the cart details in asyncStorage 
  // useEffect(() => {
  //   syncStore();
  // }, []);

  /* eslint-disable no-unused-vars */

  /* eslint-enable no-unused-vars */

  return <></>;
};

const styles = StyleSheet.create({});

export interface IShoppingCardProps {}

export default ShoppingCard;
