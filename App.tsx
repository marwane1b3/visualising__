import React from 'react';
import { AppProviders } from 'providers/AppProviders';
import { App } from 'containers/App';

import { UserDetails } from 'containers/UserDetails';
import { AppSettings } from 'containers/AppSettings';
import { ShoppingCard } from 'containers/ShoppingCard';
import AddressesHandler from 'containers/AddressesHandler';

export const app: React.FC<IAppProps> = () => {
  // const navigationRef = React.useRef();

  return (
    <AppProviders>
      <App />
      <UserDetails />
      <AppSettings />
      <ShoppingCard />
      <AddressesHandler />
    </AppProviders>
  );
};

export type IAppProps = {};
export default app;
