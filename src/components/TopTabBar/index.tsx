/**
 *
 * TopTabBar
 *
 */

import React, { memo } from 'react';
import { View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import MemberComponent from 'components/MemberComponent';
import GoldComponent from 'components/GoldComponent';
import SilverComponent from 'components/SilverComponent';
const Tab = createMaterialTopTabNavigator();


export const TopTabBar: React.NamedExoticComponent<ITopTabBarProps> = memo(({}) => {
  return  (
  <Tab.Navigator
        initialRouteName="Membre"
        tabBarOptions={{
          labelStyle: {
            fontSize: 14,
            textTransform: 'none',
          },
          swipeEnabled: true,
          activeTintColor: '#28B873',
          inactiveTintColor:'#CDD4D9',
          indicatorStyle: {
            backgroundColor: '#28B873',
        },
        
        }}>
        <Tab.Screen name="Membre" component={MemberComponent} />
        <Tab.Screen name="Silver" component={SilverComponent} />
        <Tab.Screen name="Gold" component={GoldComponent} />
      </Tab.Navigator>)
});

export interface ITopTabBarProps {}
export default TopTabBar;
