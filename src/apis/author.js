// author.js
/* eslint-disable no-undef */
import axios from 'axios';

// Utility functions for managing tokens in local storage
const getAccessToken = () => localStorage.getItem('user_id');
const getRefreshToken = () => localStorage.getItem('token');
const setAccessToken = (token) => localStorage.setItem('user_id', token);
const clearTokens = () => {
  localStorage.removeItem('user_id');
  localStorage.removeItem('token');
};

// Create a new Axios instance for authenticated requests
const author = axios.create({
  baseURL: 'https://jykim1428.pythonanywhere.com',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add the access token to the header
author.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh on 401 errors
author.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = getRefreshToken();

      if (refreshToken) {
        try {
          const { data } = await axios.post('https://jykim1428.pythonanywhere.com/token/refresh/', { 
            refresh: refreshToken 
          });

          // Save the new access token and retry the original request
          setAccessToken(data.access);
          originalRequest.headers['Authorization'] = `Bearer ${data.access}`;
          return axios(originalRequest);
        } catch (refreshError) {
          console.error('Token refresh error:', refreshError);
          clearTokens();
          window.location.href = '/signin/';
          return Promise.reject(refreshError);
        }
      } else {
        window.location.href = '/signin/';
      }
    }

    return Promise.reject(error);
  }
);

export default author;