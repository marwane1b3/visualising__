import React from 'react';

import { ScrollView, StyleSheet, Text, View } from 'react-native';
import theme from 'theme/theme';

import ChoubikContainer from 'containers/ChoubikContainer';
import ChoubikContainerDetail from 'containers/ChoubikContainerDetail';
import { useSelector, useDispatch } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { createStructuredSelector } from 'reselect';
import reducer from './reducer';
import saga from './saga';
import {
  audioSelector,
  imageSelector,
  mapShowSelector,
  textSelector,
} from './selectors';
import { setAudioAction, setPhotoAction, setTextAction } from './actions';

interface Props {}
const stateSelector = createStructuredSelector({
  audioPath: audioSelector(),
  imagePath: imageSelector(),
  showHideMap: mapShowSelector(),
  term: textSelector(),
});

const key = 'ChoubikScreen';
const ChoubikScreen = (props: Props) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const dispatch = useDispatch();

  const { audioPath, imagePath, showHideMap, term } = useSelector(
    stateSelector,
  );

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      <ChoubikContainer
        height={188}
        audioPath={audioPath}
        setAudioAction={setAudioAction}
        images={imagePath}
        setPhotoAction={setPhotoAction}
        term={term}
        seTextAction={setTextAction}
        displayMap={true}
      />

      <ChoubikContainerDetail />
    </ScrollView>
  );
};

export default ChoubikScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: 'column',
    // paddingHorizontal: 15,

    // marginTop: 15,
    //    margin: 16,
    width: '100%',
    backgroundColor: theme.palette.default.light,
  },
});
