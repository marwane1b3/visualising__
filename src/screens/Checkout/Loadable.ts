/**
 *
 * Asynchronously loads the component for Checkout
 *
 */
 
import loadable from 'utils/loadable';

export default loadable(() => import('./index'));


