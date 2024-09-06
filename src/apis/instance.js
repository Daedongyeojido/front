/* eslint-disable no-undef */
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://jykim1428.pythonanywhere.com',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  }
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access');    
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    } 
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  response => response,
  async error => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          const refreshToken = localStorage.getItem('refresh');
          if (refreshToken) {
              try {
                  const { data } = await instance.post('/users/api/token/refresh/', { refresh: refreshToken });
                  localStorage.setItem('access', data.access);
                  axios.defaults.headers.common['Authorization'] = `Bearer ${data.access}`;
                  originalRequest.headers['Authorization'] = `Bearer ${data.access}`;
                  return axios(originalRequest);
              } catch (refreshError) {
                  console.error('Token refresh failed:', refreshError);
              }
          }
      }
      return Promise.reject(error);
  }
);;

export default instance;