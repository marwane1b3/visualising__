import { CommonActions, useNavigation } from '@react-navigation/core';
import { NAVIGATORS } from 'navigators/constants';
import { makeSelectToken } from 'providers/AuthProvider/selectors';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';

const stateSelector = createStructuredSelector({
  token: makeSelectToken,
});

const useAuthProtection = () => {
  /* eslint-disable no-unused-vars */
  const { token } = useSelector(stateSelector);
  const navigation = useNavigation();
  /* eslint-enable no-unused-vars */

  useEffect(() => {
    if (!token) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: NAVIGATORS.AUTH }],
        }),
      );
    }
  }, [token]);
};

export type IuseAuthProtectionProps = {};
export { useAuthProtection };
