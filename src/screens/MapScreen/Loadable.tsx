/**
 *
 * Asynchronously loads the component for MapScreen
 *
 */
 
import React from 'react';
import { ActivityIndicator } from 'react-native';
import loadable from 'utils/loadable';

export default loadable(() => import('./index'), {
  fallback: <ActivityIndicator />,
});


