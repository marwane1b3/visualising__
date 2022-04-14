/**
 *
 * AppSettings
 *
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import makeSelectAppSettings from './selectors';
import reducer from './reducer';
import saga from './saga';

const stateSelector = createStructuredSelector({
  appSettings: makeSelectAppSettings(),
});

const key = 'appSettings';

export const AppSettings: React.FC<IAppSettingsProps> = ({}) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  /* eslint-disable no-unused-vars */
  const { appSettings } = useSelector(stateSelector);
  const dispatch = useDispatch();
  /* eslint-enable no-unused-vars */

  return <></>;
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export interface IAppSettingsProps {}

export default AppSettings;
