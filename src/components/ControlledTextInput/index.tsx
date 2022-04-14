/**
 *
 * ControlledTextInput
 *
 */

import React, { useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TextInputProps,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {
  Control,
  Controller,
  FieldValues,
  SetFieldValue,
} from 'react-hook-form';
import theme from 'theme/theme';

const ControlledTextInput: React.FC<IControlledTextInputProps> = (props) => {
  const {
    control,
    errorMessage,
    name,
    label,
    defaultValue,
    staticHolder,
    inputStyle,
    showLabel,
    placeHolder = '',
    alwaysFocused = false,
    ...inputProps
  } = props;

  const textIn = useRef(null); //declare ref
  useEffect(() => { 
    if(alwaysFocused) {
       (textIn.current || { setNativeProps: (selection: any) => {} }).setNativeProps({
         selection: { start: 0, end: 0 },
       });
    }
  }); 

  return (
    <>
      {showLabel && <Text style={styles.title}>{label}</Text>}
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            ref={textIn}
            {...inputProps}
            // placeholder={placeHolder}
            // placeholderTextColor={'grey'}
            style={[styles.input, inputStyle || {}]}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            // placeholderTextColor={theme.palette.default.light}
            placeholder={staticHolder}
          />
        )}
      />

      {!!errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: theme.palette.default.light,
    color: theme.palette.default.light,
    fontSize: theme.fontSizing.default[2],
    letterSpacing: 0.3,
    borderWidth: 1,
  },
  title: {
    alignSelf: 'flex-start',
    paddingVertical: 8,
    fontSize: 16,
    fontWeight: '500',
    color: theme.palette.default.light,
  },
  error: { alignSelf: 'flex-start', marginVertical: 4, color: 'red' },
});

export interface IControlledTextInputProps extends TextInputProps {
  control: Control<FieldValues> | undefined;
  errorMessage: string;
  name: string;
  label: string;
  staticHolder: string;
  showLabel?: boolean;
  inputStyle?: StyleProp<TextStyle>;
  placeHolder?: string;
  alwaysFocused?: boolean;
}
export default ControlledTextInput;
