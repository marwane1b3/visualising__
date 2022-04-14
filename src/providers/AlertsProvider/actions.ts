/**
 * AlertsProvider actions
 */

import { IAlertMessageProps } from 'components/AlertMessage';
import { SHOW_ALERT, CLOSE_ALERT } from './constants';

interface IActions {
  label: string;
  onPress: Function;
}

interface IPayload extends IAlertMessageProps {}

const defaultPayload: IPayload = {
  title: 'Toast Message!',
  duration: 3000,
  gravity: 'top',
};

export function showAlertAction(payload: IPayload) {
  return {
    type: SHOW_ALERT,
    payload: { ...defaultPayload, ...payload },
  };
}

interface IcloseAlert {
  alertId?: string;
  gravity?: 'top' | 'bottom' | 'center';
}

export function closeAlertAction(payload?: IcloseAlert) {
  return {
    type: CLOSE_ALERT,
    payload,
  };
}
