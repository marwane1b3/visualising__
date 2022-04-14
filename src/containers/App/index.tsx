import React, { useState } from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
// import { useSelector } from 'react-redux';

//import { navigationRef } from 'utils/rootNavigation';
import { InitialNavigator } from 'navigators/InitialNavigator';
import AuthProvider from 'providers/AuthProvider';
import AddressesHandler from 'containers/AddressesHandler';
import ShoppingCard from 'containers/ShoppingCard';
import AppSettings from 'containers/AppSettings';
import UserDetails from 'containers/UserDetails';
import DatePicker from 'react-native-date-picker';
import theme from 'theme/theme';

export type IAppProps = {};

const App: React.FC<IAppProps> = ({}) => {
  // const theme = useSelector((store: any) => store?.themeProvider?.theme);

  return <AuthProvider />;
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
});

export { App };
/***
import React from 'react';
import { StyleSheet } from 'react-native';

import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
// import { useSelector } from 'react-redux';

import { navigationRef } from 'utils/rootNavigation';
import { InitialNavigator } from 'navigators/InitialNavigator';
import AuthProvider from 'providers/AuthProvider';
import AddressesHandler from 'containers/AddressesHandler';
import ShoppingCard from 'containers/ShoppingCard';
import AppSettings from 'containers/AppSettings';
import UserDetails from 'containers/UserDetails';

export type IAppProps = {};

const App: React.FC<IAppProps> = ({}) => {
  // const theme = useSelector((store: any) => store?.themeProvider?.theme);

  return (
    <>
      <NavigationContainer
        ref={navigationRef}
        // theme={theme === 'dark' ? DarkTheme : DefaultTheme}
      >
        <AuthProvider>{/* <InitialNavigator /> }</AuthProvider>
        </NavigationContainer>
        </>
      );
    };

    const styles = StyleSheet.create({
      container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
      },
    });

    export { App };
























    /// modal esting .

      <View style={styles.container}>
        <TouchableOpacity
          style={{
            width: 174,
            height: 34,
            borderWidth: 1,
            backgroundColor: theme.palette.default.main,
            //  flex: 1,
            borderRadius: 18,
            justifyContent: 'center',
          }}
          onPress={() => {
            setModalVisible((prevState) => !prevState);
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: theme.palette.default.light,
              fontSize: theme.fontSizing.default[3],
            }}>
            Planifier
          </Text>
        </TouchableOpacity>
      </View>

      <Modal
        style={{ justifyContent: 'flex-end', alignItems: 'center', margin: 0 }}
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'center',
            // width: '100%',
            width: theme.dimensions.width,
            marginHorizontal: theme.spacing.default[5],
          }}
          activeOpacity={1}
          onPressOut={() => {
            setModalVisible(false);
          }}>
          <View style={{ width: '100%' }}>
            <DatePicker date={date} onDateChange={setDate} />

            <TouchableOpacity
              style={styles.panelButton}
              onPress={() => console.log('getTime')}>
              <Text style={styles.panelButtonTitle}>Valider</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>


 */
