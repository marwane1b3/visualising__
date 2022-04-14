import React from 'react';
import { Provider } from 'react-redux';
import { LanguageProvider } from 'providers/LanguageProvider';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, StatusBar, Platform } from 'react-native';
import ThemeProvider from 'providers/ThemeProvider';
import AlertsProvider from 'providers/AlertsProvider';

import configureStore from 'configureStore';
import { AuthProvider } from 'providers/AuthProvider';
import theme from 'theme/theme';
import { NavigationContainer } from '@react-navigation/native';

// import { useColorScheme } from 'react-native';

const initialState = {};
const store = configureStore(initialState);

export type IAppProvidersProps = {};

const AppProviders: React.FC<IAppProvidersProps> = ({ children }) => {
  // const scheme = useColorScheme();

  return (
    <>
      <View
        style={{
          backgroundColor: Platform.OS === 'ios' ? '#28B873' : '#FFFFFF',
          height: Platform.OS === 'ios' ? 20 : 0,
        }}>
        <StatusBar
          translucent
          backgroundColor={theme.palette.default.main}
          barStyle="light-content"
        />
      </View>
      <Provider store={store}>
        <LanguageProvider>
          <SafeAreaProvider>
            <AlertsProvider>
              <ThemeProvider>
                <>{children}</>
              </ThemeProvider>
            </AlertsProvider>
          </SafeAreaProvider>
        </LanguageProvider>
      </Provider>
    </>
  );
};

export { AppProviders };
