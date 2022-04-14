/**
 *
 * SplashScreen
 *
 */

import React, { useRef } from 'react';
import { View, StyleSheet, Platform, StatusBar, Animated } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import makeSelectSplashScreen from './selectors';
import reducer from './reducer';
import saga from './saga';
import { FormattedMessage } from 'components/FormattedMessage';
import messages from './messages';
import { CommonActions, useNavigation } from '@react-navigation/core';
import { NAVIGATORS, SCREENS } from 'navigators/constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Logo from '../../../tools/logo/Logo.svg';
import theme from 'theme/theme';

// testing fix

import { useFocusEffect } from '@react-navigation/native';

const stateSelector = createStructuredSelector({
  splashScreen: makeSelectSplashScreen(),
});

const key = 'splashScreen';

export const SplashScreen: React.FC<ISplashScreenProps> = ({}) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  /* eslint-disable no-unused-vars */
  const { splashScreen } = useSelector(stateSelector);
  const dispatch = useDispatch();
  const navigation: any = useNavigation();
  /* eslint-enable no-unused-vars */

  const navigateToTutorial = () => navigation.navigate(SCREENS.TUTORIAL);
  // const navigateToAuth = () =>
  //   navigation.dispatch(
  //     CommonActions.reset({
  //       index: 0,
  //       routes: [{ name: NAVIGATORS.AUTH }],
  //     }),
  //   );
  const navigateToAuth = () => navigation.navigate(SCREENS.EXTERIOR_AUTH);

  const navigateToExploreMode = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: NAVIGATORS.APP }],
      }),
    );
  };

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  };
  /**
   <TouchableOpacity onPress={navigateToTutorial}>
          <FormattedMessage {...messages.navigateToTutorial} />
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToAuth}>
          <FormattedMessage {...messages.navigateToAuth} />
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToExploreMode}>
          <FormattedMessage {...messages.exploreMode} />
        </TouchableOpacity>
   */
  useFocusEffect(() => {
    setTimeout(() => {
      fadIn();
      setTimeout(() => navigateToAuth(), 2300);
    }, 1300);
  });

  return (
    <>
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <Logo width={248} height={148} />
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: theme.palette.default.main,
  },
});

export interface ISplashScreenProps {}

export default SplashScreen;
