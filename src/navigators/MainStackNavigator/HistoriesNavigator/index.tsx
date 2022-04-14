import { createStackNavigator } from '@react-navigation/stack';
import CustomHeaderComponent from 'components/CustomHeaderComponent';
import { iOSStyleStackNavigatorOptions } from 'navigators/configs';
import { SCREENS } from 'navigators/constants';
import React from 'react';
import { View } from 'react-native';
import KaalixUp from 'screens/KaalixUp';
import theme from 'theme/theme'
import HamburgerMenu from 'components/HamburgerMenu';
import HistoriesScreen from 'screens/HistoriesScreen';

const Stack = createStackNavigator();

const HistoriesNavigator: React.FC<IHistoriesNavigatorProps> = ( { } ) =>
{
    return (
        <Stack.Navigator
            screenOptions={ { ...iOSStyleStackNavigatorOptions } }
        >
            <Stack.Screen
                name={ SCREENS.HISORY }
                component={ HistoriesScreen }
                options={ { headerShown: false } }
            />
        </Stack.Navigator>
    );
};

export type IHistoriesNavigatorProps = {};
export { HistoriesNavigator };