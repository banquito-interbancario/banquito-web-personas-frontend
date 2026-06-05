import axios from 'axios';

const accountApi = axios.create({
  baseURL: import.meta.env.VITE_ACCOUNT_API_BASE_URL || 'http://localhost:8081/api/v2',
  timeout: Number(import.meta.env.VITE_API_TIMEOUT || 10000),
});

export const getAccountsByCustomerId = (customerId) => {
  return accountApi.get(`/accounts/customer/${customerId}`);
};

export const transferP2P = (payload) => {
  return accountApi.post('/accounts/transfer/p2p', payload);
};

export default accountApi;