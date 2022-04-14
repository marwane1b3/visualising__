/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useInjectSaga } from 'redux-injectors';
import { initialState } from './reducer';
import saga from './saga';

import { changeLocaleAction } from './actions';

import usePersistor from 'hooks/userPersistor';

export type ILanguageProviderProps = {};

const key = 'language';

const LanguageProvider: React.FC<ILanguageProviderProps> = (props) => {
  useInjectSaga({ key, saga });
  const { loadPersistedStore } = usePersistor({ key, initialState });

  const dispatch = useDispatch();

  const effect = async () => {
    try {
      const data = await loadPersistedStore();
      dispatch(changeLocaleAction(data?.locale));
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    effect();
  }, []);

  return <>{React.Children.only(props.children)}</>;
};

export { LanguageProvider };
