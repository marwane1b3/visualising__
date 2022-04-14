import React from 'react';
import {
  ColorValue,
  StyleSheet,
  Text,
  TouchableOpacityProps,
  View,
} from 'react-native';
import {
  TouchableOpacity,
} from 'react-native-gesture-handler';

export interface IActionButtonProps extends TouchableOpacityProps {
  textColor?: ColorValue;
  title?: string;
}

const ActionButton: React.FC<IActionButtonProps> = ({
  onPress,
  textColor,
  title,
  ...touchableProps
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: 20,
      }}>
      <View
        style={{
          flex: 1,
        }}>
        <TouchableOpacity
          {...touchableProps}
          onPress={onPress}
          style={{
            alignItems: 'center',
            padding: 10,
            backgroundColor: '#28B873',
            borderRadius: 50,
          }}>
          <Text style={{ color: textColor }}>{title}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { borderRadius: 4, overflow: 'hidden' },
  textStyle: {
    alignSelf: 'center',
    paddingHorizontal: 12,
    paddingVertical: 4,
    fontWeight: 'bold',
  },
});

export { ActionButton };
