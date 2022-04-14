/**
 * @format
 */

import 'react-native-gesture-handler';

if (__DEV__) {
  import('./src/ReactotronConfig').then(() =>
    console.log('Reactotron Configured'),
  );
}

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

// import { setI18nConfig } from 'i18n';
// setI18nConfig();

AppRegistry.registerComponent(appName, () => App);
