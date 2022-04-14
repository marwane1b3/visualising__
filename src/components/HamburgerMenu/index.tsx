import React from 'react';
import Menu from 'react-native-vector-icons/Entypo';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

interface Props {
  navigation: any;
}

const index = (props: Props) => {
  return (
    <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}>
      <Menu name="menu" size={42} color="white" />
    </TouchableOpacity>
  );
};

export default index;

const styles = StyleSheet.create({});
