/**
 *
 * Asynchronously loads the component for SignInScreen
 *
 */
 
import React from 'react';
import { ActivityIndicator } from 'react-native';
import loadable from 'utils/loadable';

export default loadable(() => import('./index'), {
  fallback: <ActivityIndicator />,
});


