import axios from 'axios';
import { UrlServerAPI } from '@src/Configs/app';

const api = axios.create({
  // baseURL: 'http://201.42.123.39:5000/',
  baseURL: UrlServerAPI,
});

api.interceptors.response.use(
  response => {
    if (response.status === 401 || response.status === 403) {
      localStorage.clear();
      window.location.href = '/';
    }
    return response;
  },
  error => {
    if (error.response) {
      if (error.response.status === 401 || error.response.status === 403) {
        localStorage.clear();
        window.location.href = '/';
      }
      return Promise.reject(error.response);
    }

    return Promise.reject(error);
  },
);

export default api;
