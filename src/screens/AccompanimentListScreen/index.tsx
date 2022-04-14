/**
 *
 * AccompanimentListScreen
 *
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import makeSelectAccompanimentListScreen from './selectors';
import reducer from './reducer';
import saga from './saga';
import { FormattedMessage } from 'components/FormattedMessage';
import messages from './messages';

const stateSelector = createStructuredSelector({
  accompanimentListScreen: makeSelectAccompanimentListScreen(),
});

const key = 'accompanimentListScreen';

export const AccompanimentListScreen: React.FC<IAccompanimentListScreenProps> = ({ }) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  /* eslint-disable no-unused-vars */
  const { accompanimentListScreen } = useSelector(stateSelector);
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


export interface IAccompanimentListScreenProps {}



export default AccompanimentListScreen;
