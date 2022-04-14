import { createStackNavigator } from '@react-navigation/stack';
import CustomHeaderComponent from 'components/CustomHeaderComponent';
import { iOSStyleStackNavigatorOptions } from 'navigators/configs';
import { DRAWER_ROUTE_NAME, SCREENS } from 'navigators/constants';
import React from 'react';
import { View } from 'react-native';
import theme from 'theme/theme'
import HamburgerMenu from 'components/HamburgerMenu';
import KaalixSmilesScreen from 'screens/KaalixSmilesScreen';
import KaalixSmileHistoriesScreen from 'screens/KaalixSmileHistoriesScreen';
import WinSmilesScreen from 'screens/WinSmilesScreen';

const Stack = createStackNavigator();

const KaalixSmilesNavigator: React.FC<IKaalixSmilesNavigatorProps> = ( { } ) =>
{
    return (
        <Stack.Navigator
            initialRouteName={ SCREENS.KAALIXUP }
            screenOptions={ { ...iOSStyleStackNavigatorOptions } }
        >
            <Stack.Screen
                name={ SCREENS.KAALIX_SMILES }
                component={ KaalixSmilesScreen }
                options={ ( props: any ) => ( {
                    headerStyle: {
                        backgroundColor: theme.palette.default.main,
                        elevation: 0,
                    },
                    headerForceInset: { top: 'never', bottom: 'never' },
                    headerTitle: () => <CustomHeaderComponent title={ DRAWER_ROUTE_NAME.KAALIX_SMILES } />,
                    headerLeft: () => (
                        <View style={ { marginLeft: 15 } }>
                            <HamburgerMenu navigation={ props.navigation } />
                        </View>
                    ),

                } ) }
            />
            <Stack.Screen
                name={ SCREENS.KAALIX_SMILE_HISTORIES }
                component={ KaalixSmileHistoriesScreen }
                options={ { headerShown: false } }
            />
            <Stack.Screen
                name={ SCREENS.KAALIX_WIN_SMILES }
                component={ WinSmilesScreen }
                options={ { headerShown: false } }
            />

        </Stack.Navigator>
    );
};

export type IKaalixSmilesNavigatorProps = {};
export { KaalixSmilesNavigator };