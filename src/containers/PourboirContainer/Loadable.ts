/**
 *
 * Asynchronously loads the component for PourboirContainer
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
