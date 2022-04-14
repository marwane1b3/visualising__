/*
 * Cardlist Messages
 *
 * This contains all the text for the Cardlist component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.Cardlist';

export default defineMessages({
  header: {
    scope: `${scope}.header`,
    options: {
      defaultValue: 'This is the Cardlist component!',
    },
  },
});
