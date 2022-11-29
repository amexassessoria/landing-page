import axios from 'axios';

const api = axios.create({
  baseURL: `${window.location.protocol}//trismeg.azurewebsites.net/api/Identity/`,
  // baseURL: 'http://shared:8081/api/',
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
