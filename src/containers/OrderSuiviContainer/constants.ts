/*
 *
 * OrderSuiviContainer constants
 *
 */

export const DEFAULT_ACTION = 'app/OrderSuiviContainer/DEFAULT_ACTION';
export const customerStatusData = [
  {
    id: 0,
    keyValue: { WAITING_FOR_ACCEPT: "En attente d'acceptation" },

    isSelect: false,
  },
  {
    id: 1,
    keyValue: { ACCEPTED: 'Commande acceptée' },

    isSelect: false,
  },
  {
    id: 2,
    keyValue: { START_PREPARATION: 'En preparation' },

    isSelect: false,
  },
  {
    id: 3,
    keyValue: { STARTED_DELIVERY: 'En route vers le client' },

    isSelect: false,
  },
  {
    id: 4,
    keyValue: { ARRIVED_TO_DESTINATION: ' livreur a destination' },

    isSelect: false,
  },
];
