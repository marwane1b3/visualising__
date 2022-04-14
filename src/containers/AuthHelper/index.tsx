/**
 *
 * AuthHelper
 *
 */

import React from 'react';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import reducer from './reducer';
import saga from './saga';

const key = 'authHelper';

export const AuthHelper: React.FC<IAuthHelperProps> = ({}) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  /* eslint-disable no-unused-vars */
  /* eslint-enable no-unused-vars */
  return <></>;
};

export interface IAuthHelperProps {}

export default AuthHelper;
