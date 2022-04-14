import React from 'react';
import { ActivityIndicator } from 'react-native';

export type ILoaderProps = {
  isLoading?: boolean;
};

const Loader: React.FC<ILoaderProps> = ({ isLoading = false, children }) => {
  return isLoading ? <ActivityIndicator /> : <>{children}</>;
};

export { Loader };
