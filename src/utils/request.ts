/**
 if (response.status === 204 || response.status === 205) {
   if (response.status >= 200 && response.status < 300) {
 * Parses the JSON returned by a network request
 */

const qs = require('qs');

import axios, { AxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import base64 from 'react-native-base64';

import { AxiosConfigs, MICROSERVICE_BASE_URL } from 'utils/constants';

const request = axios.create({
  baseURL: AxiosConfigs.BASE_URL,
  headers: { 'Access-Control-Allow-Origin': '*' },
});

request.interceptors.request.use(
  async (config) => {
    const tmpConfigs = { ...config };

    const token = await AsyncStorage.getItem('accessToken');
    if (token && !tmpConfigs?.headers?.Authorization) {
      tmpConfigs.headers['Authorization'] = `Bearer ${token}`;
    }

    return tmpConfigs;
  },
  (error) => Promise.reject(error),
);

request.interceptors.response.use(
  (res) => res,
  (err) => Promise.reject(err),
);

declare module 'axios' {
  export interface AxiosInstance {
    microservice: (microserviceBaseURL: string) => AxiosInstance;
  }
}

request.microservice = (microserviceBaseURL: string) => {
  request.defaults.baseURL = microserviceBaseURL;
  return request;
};

// Function that will be called to refresh authorization
// https://www.npmjs.com/package/axios-auth-refresh
const refreshAuthLogic = async (failedRequest: any) => {
  // await AsyncStorage.setItem('refreshToken');
  const refresh_token = await AsyncStorage.getItem('refreshToken');

  const data = qs.stringify({
    grant_type: 'refresh_token',
    refresh_token,
  });

  const config: AxiosRequestConfig = {
    method: 'post',
    url: `${MICROSERVICE_BASE_URL.AUTH_SERV}/oauth/token`,
    headers: {
      Authorization: `Basic ${base64.encode('clientApp@kaalix.conf:secret')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: data,
  };

  axios(config)
    .then(async (tokenRefreshResponse) => {
      await AsyncStorage.setItem(
        'token',
        tokenRefreshResponse?.data?.accessToken,
      );
      await AsyncStorage.setItem(
        'refreshToken',
        tokenRefreshResponse?.data?.refreshToken,
      );
      failedRequest.response.config.headers['Authorization'] =
        'Bearer ' + tokenRefreshResponse?.data?.accessToken;
      return Promise.resolve();
    })
    .catch((error) => Promise.reject(error));
  return Promise.reject(failedRequest);
};

createAuthRefreshInterceptor(request, refreshAuthLogic, {
  statusCodes: [401, 403],
});

export default request;
