import { createStackNavigator } from '@react-navigation/stack';
import { iOSStyleStackNavigatorOptions } from 'navigators/configs';
import { SCREENS } from 'navigators/constants';
import React from 'react';
import WinPointsScreen from 'screens/WinPointsScreen';

const Stack = createStackNavigator();

const WinPointsNavigator: React.FC<IWinPointsNavigatorProps> = ( { } ) =>
{
    return (
        <Stack.Navigator
            screenOptions={ { ...iOSStyleStackNavigatorOptions } }
        >
            <Stack.Screen
                name={ SCREENS.WINPOINTS }
                component={ WinPointsScreen }
                options={ { headerShown: false } }
            />
        </Stack.Navigator>
    );
};

export type IWinPointsNavigatorProps = {};
export { WinPointsNavigator };