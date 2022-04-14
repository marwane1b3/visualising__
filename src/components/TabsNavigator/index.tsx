import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Favoris from 'screens/Favoris';
import Promotion from 'screens/Promotion';
import Suggestion from 'screens/Suggestions';
import theme from 'theme/theme';
import { createStructuredSelector } from 'reselect';
import { useSelector } from 'react-redux';
import {
  makeSelectErrorPubMessage,
  makeSelectpublicityGroupTabsState,
} from 'containers/AdBannierContainer/selectors';
const stateSelector = createStructuredSelector({
  msgLength: makeSelectErrorPubMessage(),
  tabs: makeSelectpublicityGroupTabsState(),
});
const Tab = createMaterialTopTabNavigator();
interface Props {}

const TabNavigator = (props: Props) => {
  const { msgLength, tabs } = useSelector(stateSelector);
  // const [mounted, setMounted] = useState(false);

  // useEffect(() => {
  //   if (msgLength.length === 0) {
  //     setMounted(true);
  //   } else {
  //     setMounted(false);
  //   }
  // }, [msgLength]);
  //console.log(tabs?.publicitySubGroups[0]?.pubs.length);
  return (
    <>
      {msgLength?.length === 0 && tabs?.publicitySubGroups?.length > 0 && (
        <Tab.Navigator
          initialRouteName={
            tabs?.publicitySubGroups[0]?.name
              ? tabs?.publicitySubGroups[0]?.name
              : ''
          }
          tabBarOptions={{
            labelStyle: {
              fontSize: 15,

              textTransform: 'none',
            },

            style: {
              elevation: 0,
              // borderWidth: 1,
              // borderColor: 'red',
              marginTop: 15,
            },

            indicatorStyle: {
              backgroundColor: theme.palette.default.main,
            },

            activeTintColor: theme.palette.default.main,
            inactiveTintColor: theme.palette.default.inactive,
          }}>
          {tabs?.publicitySubGroups[0]?.pubs?.length > 0 && (
            <Tab.Screen
              name={
                tabs?.publicitySubGroups[0]?.name
                  ? tabs.publicitySubGroups[0].name
                  : ''
              }
              component={Promotion}
            />
          )}

          {tabs?.publicitySubGroups[1].pubs.length > 0 && (
            <Tab.Screen
              name={
                tabs?.publicitySubGroups[1]?.name
                  ? tabs.publicitySubGroups[1].name
                  : ''
              }
              component={Suggestion}
            />
          )}
        </Tab.Navigator>
      )}
    </>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({});
