/**
 *
 * Button
 *
 */

import React from 'react';
import {
  StyleSheet,
  Text,
  TextProps,
  TouchableOpacityProps,
  TouchableOpacity,
} from 'react-native';
import theme from 'theme/theme';

//import { ContainedTouchableProperties } from 'react-native-gesture-handler';

export const Button: React.FC<IButtonProps> = (props) => {
  const { label } = props;

  return (
    <TouchableOpacity style={styles.buttonContainer} {...props}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    paddingHorizontal: theme.spacing.default[8],
    paddingVertical: theme.spacing.default[1],

    backgroundColor: theme.palette.default.light,
    marginVertical: theme.spacing.default[5],
    borderRadius: theme.fontSizing.default[7],
  },
  label: {
    color: theme.palette.default.main,
    fontSize: theme.fontSizing.default[4],
    letterSpacing: 0.9,
  },
});

export interface IButtonProps extends TouchableOpacityProps {
  label?: string;
}

export default Button;
