/*
 *
 * OrderHistoryListContainer constants
 *
 */

export const REQUEST_ORDERS_ACTION =
  'app/OrderHistoryListContainer/REQUEST_ORDERS_ACTION';
export const GET_ORDERS_LIST_ACTION =
  'containers/OrderHistoryListContainer/GET_ORDERS_LIST_ACTION';
export const GET_ORDERS_LIST_FAIL_ACTION =
  'containers/OrderHistoryListContainer/GET_ORDERS_LIST_FAIL_ACTION';
export const SET_ORDERS_BUTTON_ACTIONS_DATA =
  'containers/OrderHistoryListContainer/SET_ORDERS_BUTTON_ACTIONS_DATA';
export const POPULATE_ORDERS_BUTTON_ACTIONS =
  'containers/OrderHistoryListContainer/POPULATE_ORDERS_BUTTON_ACTIONS';
export const SET_SELECTED_BUTTON_ACTION_DATA =
  'containers/OrderHistoryListContainer/SET_SELECTED_BUTTON_ACTION_DATA';
export const DeliveredOrdersActions = [
  {
    data: [
      { id: 0, name: 'Pourboire livreur', isSelect: false },
      { id: 1, name: 'Recommander', isSelect: false },
      { id: 2, name: 'Réclamation', isSelect: false },
    ],
  },
];

export const SET_ORDERS_HISTORY_DATA =
  'containers/OrderHistoryListContainer/SET_ORDERS_HISTORY_DATA';
export const mappingEncourStatus = {
  WAITING_FOR_ACCEPT: "En attente d'acceptation",
  ACCEPTED: 'Commande acceptée',
  START_PREPARATION: 'En preparation',
  STARTED_DELIVERY: 'En route vers le client',
  ARRIVED_TO_DESTINATION: ' livreur a destination',
};

export const mappingHistoryStatus = {
  DELIVERED: 'DELIVERED',
  CANCELED: 'CANCELED',
};
