/**
 *
 * ReferralScreen
 *
 */

import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import makeSelectReferralScreen from './selectors';
import reducer from './reducer';
import saga from './saga';
import { FormattedMessage } from 'components/FormattedMessage';
import messages from './messages';
import { useRoute } from '@react-navigation/core';

const stateSelector = createStructuredSelector({
  referralScreen: makeSelectReferralScreen(),
});

const key = 'referralScreen';

export const ReferralScreen: React.FC<IReferralScreenProps> = ({}) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  /* eslint-disable no-unused-vars */
  const { referralScreen } = useSelector(stateSelector);
  const dispatch = useDispatch();
  const route = useRoute();
  const { user } = route?.params;
  /* eslint-enable no-unused-vars */

  return (
    <View style={styles.container}>
      <FormattedMessage {...messages.header} />
      <Text>{user}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export interface IReferralScreenProps {}

export default ReferralScreen;
