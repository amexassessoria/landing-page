import axios from 'axios';
import { UrlServerAPI } from '@src/Configs/app';
import { request } from 'https';

const api = axios.create({
   baseURL: 'http://186.237.14.252:5000/',
  // method: 'POST',
   //headers: {"Content-Type":"application/json"},

});

api.interceptors.response.use(
  response => {
    if (response.status === 401) {
      localStorage.clear();
      window.location.href = '/';
    }
    return response;
  },
  error => {
    if (error.response) {
      if (error.response.status === 401) {
        localStorage.clear();
        window.location.href = '/';
      }
      return Promise.reject(error.response);
    }

    return Promise.reject(error);
  },
);

// api.interceptors.response.use(error => {
//   if (error?.status === 401) {
//     localStorage.clear();
//     window.location.href = '/';
//   }
//   return error;
// });

export default api;
