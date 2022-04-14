import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import theme from 'theme/theme';
import { createStructuredSelector } from 'reselect';
import {
  getTriData,
  getTriName,
  getLoader,
} from 'containers/FourchettePrixContainer/selectors';
import { useSelector } from 'react-redux';

interface Props {
  data: any;
  pressFunction: Function;
}
// const stateSelector = createStructuredSelector({
//   dataNames: getTriData(),
//   selectedNames: getTriName(),
//   loading: getLoader(),
// });
const TriComponent = (props: Props) => {
  // const { dataNames, loading, selectedNames } = useSelector(stateSelector);

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          props.pressFunction(props.data);
        }}
        style={{
          margin: 5,
          elevation: 1,
          paddingVertical: 11,
          paddingHorizontal: 15,
          // borderWidth: 1,
          // borderColor: theme.palette.default.light,
          borderRadius: 45 / 2,
          backgroundColor: props.data.isSelect
            ? theme.palette.default.main
            : '#edeff2', //'#edeff2',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{ marginRight: 10 }}>
          <Image
            source={props.data.uri}
            style={{ resizeMode: 'contain', width: 16, height: 16 }}
          />
        </View>

        <Text
          style={{
            fontSize: 15,
            color: props.data.isSelect ? theme.palette.default.light : 'black',
          }}>
          {props.data.triText}
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default TriComponent;

const styles = StyleSheet.create({});
