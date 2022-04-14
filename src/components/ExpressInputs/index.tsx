import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import theme from 'theme/theme';

interface Props {}

const ExpressInputs = (props: Props) => {
  const [phone, setPhone] = React.useState('');
  const [name, setName] = React.useState('');

  return (
    <View style={styles.inputsContainerStyle}>
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Nom"
        placeholderTextColor="rgba(0,0,0,0.4)"
        value={phone}
        onChangeText={(e: any) => setPhone(e)}
        style={styles.textInputStyle}
      />
      <TextInput
        keyboardType="numeric"
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Téléphone"
        placeholderTextColor="rgba(0,0,0,0.4)"
        value={name}
        onChangeText={(e: any) => setName(e)}
        style={styles.textInputStyle}
      />
    </View>
  );
};

export default ExpressInputs;

const styles = StyleSheet.create({
  inputsContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  textInputStyle: {
    width: '40%',
    //paddingVertical: 20,
    paddingVertical: 7,
    fontSize: 14,
    color: 'teal',
    paddingLeft: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.4)',
    // borderRadius: 30,
  },
});
