/**
 *
 * UserDetails
 *
 */

import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import {} from './selectors';
import { getUserDetailsAction } from './actions';
import reducer from './reducer';
import saga from './saga';
import AsyncStorage from '@react-native-community/async-storage';

const stateSelector = createStructuredSelector({});

const key = 'userDetails';

export const UserDetails: React.FC<IUserDetailsProps> = ({}) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  /* eslint-disable no-unused-vars */
  const {} = useSelector(stateSelector);
  const dispatch = useDispatch();
  /* eslint-enable no-unused-vars */

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    const token = await AsyncStorage.getItem('refreshToken');
    // console.log({ token });
    if (token) {
      dispatch(getUserDetailsAction(token));
    }
  };

  return <></>;
};

const styles = StyleSheet.create({});

export interface IUserDetailsProps {}

export default UserDetails;
