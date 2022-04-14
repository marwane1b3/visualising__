/**
 *
 * TextInput
 *
 */

import React from 'react';
import {
  View,
  TextInput as RNTextInput,
  TextInputProps,
  StyleSheet,
  Text,
} from 'react-native';

export const TextInput: React.FC<ITextInputProps> = (props) => {
  const { label } = props;
  return (
    <View style={styles.container}>
      <Text>{label}</Text>
      <RNTextInput style={styles.rNTextInput} {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 8, width: '100%' },
  rNTextInput: {
    padding: 8,
    marginVertical: 8,
    borderWidth: 1,
  },
});

export interface ITextInputProps extends TextInputProps {
  label: string;
}
export default TextInput;
