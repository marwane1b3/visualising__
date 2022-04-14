/**
 *
 * RoundCheckbox
 *
 */

import React, {useState} from 'react';
import {
  Animated,
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  onValueChange?: () => void;
  icon?: string;
  size?: number;
  backgroundColor?: string;
  iconColor?: string;
  borderColor?: string;
  checked?: boolean;
  style?: StyleProp<ViewStyle>;
}
const hitSlop = { top: 8, bottom: 8, left: 8, right: 8 };

export const RoundCheckbox2 = (props: Props) => {
  const { size, backgroundColor, borderColor, icon, iconColor, style, onValueChange } = props;
  const [checked , setChecked ] = useState(false);
  const scaleAndOpacityOfCheckbox = new Animated.Value(props.checked ? 1 : 0);
  //setChecked(!!props.checked);
  const iconSize = parseInt(String((size || 0) * 1.3), 10);

  const bothStyles = {
    width: size,
    height: size,
    borderRadius: (size || 0) / 2,
  };

  const checkedStyles = {
    backgroundColor: backgroundColor || '#ffffff',
    borderColor: backgroundColor || '#ffffff',
    opacity: scaleAndOpacityOfCheckbox || 1,
    transform: [{ scale: scaleAndOpacityOfCheckbox || 1 }],
    // position: 'absolute',
    top: 0,
    left: 0,
  };
  return (
    <TouchableWithoutFeedback
      hitSlop={hitSlop}
      onPress={onValueChange}
      style={style}>
      <View style={styles.parentWrapper} shouldRasterizeIOS={true}>
        <Animated.View
          style={[
            {
              borderColor,
              backgroundColor: 'transparent',
              opacity: scaleAndOpacityOfCheckbox.interpolate({
                inputRange: [0, 0.9],
                outputRange: [1, 0],
              }),
            },
            bothStyles,
            styles.commonWrapperStyles,
          ]}
        />
        <Animated.View
          style={[bothStyles, checkedStyles, styles.commonWrapperStyles , {position:'absolute'}]}>
          <Icon
            name={icon + ''}
            color={iconColor || 'white'}
            style={{
              height: 20,
              fontSize: 20,
              backgroundColor: 'transparent',
            }}
          />
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  parentWrapper: {
    position: 'relative',
  },
  commonWrapperStyles: {
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RoundCheckbox2;
