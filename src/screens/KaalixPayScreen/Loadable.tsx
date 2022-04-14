/**
 *
 * Asynchronously loads the component for KaalixPayScreen
 *
 */
 
import React from 'react';
import { ActivityIndicator } from 'react-native';
import loadable from 'utils/loadable';

export default loadable(() => import('./index'), {
  fallback: <ActivityIndicator />,
});


