/**
 * Kaalix API Documentation: http://k8s-default-ingresss-f5f101d3ef-1829552100.us-east-2.elb.amazonaws.com/api/v1/docs/k#/srv-auth/post_api_v1_users_auth_login
 */

const dev = false;

export const AxiosConfigs = {
  BASE_URL: dev
    ? 'http://localhost'
    : 'http://k8s-default-ingresss-f5f101d3ef-1331662391.us-east-2.elb.amazonaws.com',
  TIMEOUT: '',
};

export const MICROSERVICE_BASE_URL = dev
  ? {
      AUTH_SERV: `${AxiosConfigs.BASE_URL}:4000/api/v1/users`,
      CUSTOMER: `${AxiosConfigs.BASE_URL}:4005/api/v1/customer`,
      CONTENT: `${AxiosConfigs.BASE_URL}:4001/api/v1/content`,
      PAYMENT_SERV: `${AxiosConfigs.BASE_URL}:4006/api/v1/srv-payment`,
      CUSTOMER_PAYMENT: `${AxiosConfigs.BASE_URL}:4006/api/v1/customer-payment`,
      ORDERS: `${AxiosConfigs.BASE_URL}:4008/api/v1/orders`,
      DISPATCHING: `${AxiosConfigs.BASE_URL}:4008/api/v1/dispatching`,

      HISTORY: `${AxiosConfigs.BASE_URL}:4013/api/v1/history/order/filter`,
    }
  : {
      AUTH_SERV: `${AxiosConfigs.BASE_URL}/api/v1/users`,
      CUSTOMER: `${AxiosConfigs.BASE_URL}/api/v1/customer`,
      CONTENT: `${AxiosConfigs.BASE_URL}/api/v1/content`,
      PAYMENT_SERV: `${AxiosConfigs.BASE_URL}/api/v1/srv-payment`,
      CUSTOMER_PAYMENT: `${AxiosConfigs.BASE_URL}/api/v1/customer-payment`,
      ORDERS: `${AxiosConfigs.BASE_URL}/api/v1/orders`,
      DISPATCHING: `${AxiosConfigs.BASE_URL}/api/v1/dispatching`,

      HISTORY: `${AxiosConfigs.BASE_URL}/api/v1/history/order/filter`,
    };
