import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import theme from 'theme/theme';

interface Props {
  data: any;
  pressFunction: Function;
}

const TypePromoComponent = (props: Props) => {
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
        <Image
          source={props.data.uri}
          style={{
            resizeMode: 'contain',
            width: 20,
            height: 20,
            marginRight: 10,
          }}
        />
        <Text
          style={{
            fontSize: 15,
            color: props.data.isSelect ? theme.palette.default.light : 'black',
          }}>
          {props.data.promoText}
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default TypePromoComponent;

const styles = StyleSheet.create({});
