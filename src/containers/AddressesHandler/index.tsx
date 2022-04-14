/**
 *
 * AddressesHandler
 *
 */

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import makeSelectAddressesHandler, { makeSelectCities } from './selectors';
import reducer from './reducer';
import saga, { getCities } from './saga';
import { getAddressesListAction, getCitiesAction, getCustomerGPSAction } from './actions';
import { makeSelectUserDetailsData } from 'containers/UserDetails/selectors';

const stateSelector = createStructuredSelector({
  addressesHandler: makeSelectAddressesHandler(),
  userDetails: makeSelectUserDetailsData,
  cities: makeSelectCities,
});

const key = 'addressesHandler';

export const AddressesHandler: React.FC<IAddressesHandlerProps> = ({}) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  /* eslint-disable no-unused-vars */
  const { addressesHandler, userDetails, cities } = useSelector(stateSelector);
  const dispatch = useDispatch();
  /* eslint-enable no-unused-vars */

  useEffect(() => {
    getCities();
  }, []);

  useEffect(() => {
    if(cities){
      dispatch(getCustomerGPSAction());
    }
  }, [cities]);

  useEffect(() => {
    userDetails?.entityId && getAddressesList();
  }, [userDetails]);

  const getAddressesList = () => {
    dispatch(getAddressesListAction({ customerId: userDetails?.entityId }));
  };

  const getCities = () => {
    dispatch(getCitiesAction());
  };

  return <></>;
};

export interface IAddressesHandlerProps {}

export default AddressesHandler;
