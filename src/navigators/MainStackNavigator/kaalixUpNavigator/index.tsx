import { createStackNavigator } from '@react-navigation/stack';
import CustomHeaderComponent from 'components/CustomHeaderComponent';
import { iOSStyleStackNavigatorOptions } from 'navigators/configs';
import { DRAWER_ROUTE_NAME, SCREENS } from 'navigators/constants';
import React from 'react';
import { View } from 'react-native';
import KaalixUp from 'screens/KaalixUp';
import theme from 'theme/theme'
import HamburgerMenu from 'components/HamburgerMenu';
import WinPointsScreen from 'screens/WinPointsScreen';
import HistoriesScreen from 'screens/HistoriesScreen';
import KaalixWinPointsScreen from 'screens/KaalixWinPointsScreen';

const Stack = createStackNavigator();

const KaalixUpNavigator: React.FC<IKaalixUpNavigatorProps> = ( { } ) =>
{
    return (
        <Stack.Navigator
            initialRouteName={ SCREENS.KAALIXUP }
            screenOptions={ { ...iOSStyleStackNavigatorOptions } }
        >
            <Stack.Screen
                name={ SCREENS.KAALIXUP }
                component={ KaalixUp }
                options={ ( props: any ) => ( {
                    headerStyle: {
                        backgroundColor: theme.palette.default.main,
                        elevation: 0,
                    },
                    headerForceInset: { top: 'never', bottom: 'never' },
                    headerTitle: () => <CustomHeaderComponent title={DRAWER_ROUTE_NAME.KaalixUpNavigator} />,
                    headerLeft: () => (
                        <View style={ { marginLeft: 15 } }>
                            <HamburgerMenu navigation={ props.navigation } />
                        </View>
                    ),

                } ) }
            />
            <Stack.Screen
                name={ SCREENS.WINPOINTS }
                component={ WinPointsScreen }
                options={ { headerShown: false } }
            />
            <Stack.Screen
                name={ SCREENS.HISORY }
                component={ HistoriesScreen }
                options={ { headerShown: false } }
            />
            <Stack.Screen
                name={ SCREENS.KAALIX_WIN_POINTS }
                component={ KaalixWinPointsScreen }
                options={ { headerShown: false } }
            />

        </Stack.Navigator>
    );
};

export type IKaalixUpNavigatorProps = {};
export { KaalixUpNavigator };