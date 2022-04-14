import ReclamationContainer from 'containers/ReclamationContainer';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {}

const ReclamationScreen = (props: any) => {
  const { CommandeDetails } = props.route.params;
  console.log(CommandeDetails);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <ReclamationContainer CommandeDetails={CommandeDetails} />
    </View>
  );
};

export default ReclamationScreen;

const styles = StyleSheet.create({});
