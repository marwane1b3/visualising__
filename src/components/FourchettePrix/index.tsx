import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  handleSelect: Function;
  item: any;
}

const FourchettePrix = (props: Props) => {
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          props.handleSelect(props.item);
        }}
        style={{
          margin: 5,
          elevation: 2,
          paddingVertical: 15,
          paddingHorizontal: 15,
          borderWidth: 1,
          borderRadius: 45 / 2,
          backgroundColor: props.item.isSelect ? 'yellow' : '#edeff2', //'#edeff2',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        {props.item.icon === 'bike-fast' ? (
          <View style={{ marginRight: 15 }}>
            <MaterialCommunityIcons name={props.item.icon} size={14} />
          </View>
        ) : (
          <View style={{ marginRight: 15 }}>
            <AntDesign name={props.item.icon} size={14} />
          </View>
        )}
        <Text style={{ fontSize: 15 }}>{props.item.triText}</Text>
      </TouchableOpacity>
    </>
  );
};

export default FourchettePrix;

const styles = StyleSheet.create({});
