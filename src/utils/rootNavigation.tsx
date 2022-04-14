import { NavigationContainerRef } from '@react-navigation/core';
import React from 'react';

export const navigationRef: React.RefObject<NavigationContainerRef> = React.createRef();

export function navigate(name: string, params?: Object) {
  navigationRef.current?.navigate(name, params);
}
