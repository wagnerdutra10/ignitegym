import { AppError } from '@/utils/AppError';
import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://192.168.2.115:3333'
});

api.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(new AppError(error.response.data.message));
    }
    return Promise.reject('Erro no servidor. Tente novamente mais tarde.');
  }
);
