/**
 *
 * TutorialScreen
 *
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import makeSelectTutorialScreen from './selectors';
import reducer from './reducer';
import saga from './saga';
import { FormattedMessage } from 'components/FormattedMessage';
import messages from './messages';

const stateSelector = createStructuredSelector({
  tutorialScreen: makeSelectTutorialScreen(),
});

const key = 'tutorialScreen';

export const TutorialScreen: React.FC<ITutorialScreenProps> = ({ }) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  /* eslint-disable no-unused-vars */
  const { tutorialScreen } = useSelector(stateSelector);
  const dispatch = useDispatch();
  /* eslint-enable no-unused-vars */

  return (
    <View style={styles.container}>
      <FormattedMessage {...messages.header} />
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


export interface ITutorialScreenProps {}



export default TutorialScreen;
