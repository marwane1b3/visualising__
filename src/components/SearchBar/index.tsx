import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import Material from 'react-native-vector-icons/MaterialIcons';
import theme from 'theme/theme';
import Search from '../../../tools/logo/Tracé 78.svg';
interface Props { }

const index = ( props: Props ) =>
{
  const [ term, setTerm ] = React.useState( '' );

  return (
    <View style={ styles.container }>
      {/**
      <Material name="search" color="#0064FE" size={25} />
      */}

      <Search />
      <TextInput
        autoCapitalize="none"
        autoCorrect={ false }
        placeholder="Recherche"
        placeholderTextColor={ theme.palette.default.dark }
        value={ term }
        onChangeText={ ( e: any ) => setTerm( e ) }
        style={ styles.TextInput }
      />
    </View>
  );
};

export default index;

const styles = StyleSheet.create( {
  container: {
    // flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
    // marginTop: 15,
    marginRight: 15,
    //  marginTop: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 35,
    borderWidth: 1,
    borderColor: '#CDD4D9',
  },
  TextInput: {
    width: '80%',
    //paddingVertical: 20,
    paddingVertical: 7,
    fontSize: 17,
    color: 'teal',
    paddingLeft: 15,
    //borderWidth: 1,
    borderRadius: 30,
  },
} );
