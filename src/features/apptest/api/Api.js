import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const BASE_URL = 'https://api.phdvasia.com';
const TOKEN_DATA_STORAGE = 'LOGIN_DATA';
export const COUNTRY_SELECTED_UUID_DATA_STORAGE = 'COUNTRY_SELECTED_UUID_DATA';

const getHeaders = async () => {
  const token = await AsyncStorage.getItem(TOKEN_DATA_STORAGE);

  console.log(`Fetch Header: ${token}`);
  const clientUuid = await AsyncStorage.getItem(
    COUNTRY_SELECTED_UUID_DATA_STORAGE,
  );
  console.log(`clientUuid: ${clientUuid}`);

  const headers = {
    'Content-Type': 'application/json',
    lang: 'en',
    client: clientUuid || '2f28344b-2d60-4754-8985-5c23864a3737',
  };

  if (token) {
    headers['x-token'] = token;
  }
  return headers;
};

export const callApi = async (_path, data = null, param, method = 'GET') => {
  const headers = await getHeaders();
  const options = {
    method,
    headers,
  };
  if (data) {
    options.data = data;
  }
  if (param) {
    options.params = param;
  }

  console.log('Login Request: ', options);
  return axios(`${BASE_URL}${_path}`, options);
};

export const loginApi = (userName, password) => {
  const data = {email: userName, password};
  const method = 'POST';
  return callApi('/v1/product-tenant/check-authentication', data, null, method);
};

export const loadListCountry = () => {
  return callApi('/v1/product-tenant/me/clients');
};

export const fetchReport = () => {
  const param = {
    start: '2022-11-16 17:00:00',
    end: '2022-11-17 16:59:59',
  };
  return callApi('/v1/product-report/orders/new-sale-report', null, param);
};
