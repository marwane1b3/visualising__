/*
 *
 * AdBannierContainer constants
 *
 */

export const DEFAULT_ACTION = 'app/AdBannierContainer/DEFAULT_ACTION';
export const GET_PUB_GROUPS_ACTION =
  'containers/AdbannierContainer/GET_PUB_GROUPS_ACTION';
export const GET_PUB_GROUPS_ACTION_SUCCESS =
  'containers/AdbannierContainer/GET_PUB_GROUPS_ACTION_SUCCESS';
export const GET_PUB_GROUPS_FAIL =
  'containers/AdbannierContainer/GET_PUB_GROUPS_ACTION_FAIL';
export const GET_PUB_GROUPS_ACTION_SUCCESS_TABS =
  'containers/AdbannierContainer/GET_PUB_GROUPS_ACTION_SUCCESS_TABS';
export const GET_PUB_GROUPS_ACTION_SUCCESS_BANNER =
  'containers/AdbannierContainer/GET_PUB_GROUPS_ACTION_SUCCESS_BANNER';
export const pubBannier = {
  name: 'Casablanca Banner',
  description: 'string',
  ExternalLink: '',
  assignedTo: 'service',
  cityId: 'cjskdcjnsdcnsjdcnkj',
  serviceId: 'cjsnjcnsncsnjnl',
  format: 'Banner',

  publicitySubGroups: [
    {
      // Empty in case format == "Banner"
      name: 'default',
      Position: 1,
      Pubs: [
        {
          name: 'Image1 vers Restau 1',
          description: '',
          imageUrl: 'https://source.unsplash.com/1024x768/?nature',
          type: 'ExternalLink',
          storeId: null,
          externalLink: 'google.com',
        },
        {
          name: 'Image2 vers Restau 2',
          description: '',
          imageUrl: 'https://source.unsplash.com/1024x768/?water',
          type: 'Store',
          storeId: 'ckjsncndjkcnsj',
          externalLink: '',
        },
      ],
    },
  ],
};
