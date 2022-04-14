/**
 *
 * ForgotPasswordScreen
 *
 */

import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import makeSelectForgotPasswordScreen from './selectors';
import reducer from './reducer';
import saga from './saga';
import { FormattedMessage } from 'components/FormattedMessage';
import messages from './messages';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/core';
import { SCREENS } from 'navigators/constants';

const stateSelector = createStructuredSelector({
  forgotPasswordScreen: makeSelectForgotPasswordScreen(),
});

const key = 'forgotPasswordScreen';

export const ForgotPasswordScreen: React.FC<IForgotPasswordScreenProps> = ({}) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  /* eslint-disable no-unused-vars */
  const { forgotPasswordScreen } = useSelector(stateSelector);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  /* eslint-enable no-unused-vars */

  const navigateToCodeVerification = () =>
    navigation.navigate(SCREENS.PASSWORD_CODE_VERIFICATION);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={navigateToCodeVerification}>
        {/* <FormattedMessage {...messages.header} /> */}
        <Text>navigateToCodeVerification</Text>
      </TouchableOpacity>
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

export interface IForgotPasswordScreenProps {}

export default ForgotPasswordScreen;
