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

      if(!originalRequest._retry) {
        originalRequest._retry = true;
        originalRequest.retryCount = 0;
      }

      if(originalRequest.retryCount >=3 ) {
        console.error('Too many retry attempts. Logging out.');
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        window.location.href = '/login'; // 리트라이 실패 시 로그아웃 처리
        return Promise.reject(error);
      }

      if (error.response.status === 401 || !originalRequest._retry) {
          originalRequest._retry = true;
          const refreshToken = localStorage.getItem('refresh');

          if (refreshToken) {
              try {
                  const { data } = await instance.post('/users/api/token/refresh/', { refresh: refreshToken });
                  console.log('new access token', data);
                  
                  localStorage.setItem('access', data.access);
                  axios.defaults.headers.common['Authorization'] = `Bearer ${data.access}`;
                  originalRequest.headers['Authorization'] = `Bearer ${data.access}`;

                  return axios(originalRequest);
              } catch (refreshError) {
                  console.error('Token refresh failed:', refreshError);

                  localStorage.removeItem('access');
                  localStorage.removeItem('refresh');
                  window.location.href = '/login';
              }
          } else {
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            window.location.href = '/login';  // 로그인 페이지로 리디렉션
          }
      }
      return Promise.reject(error);
  }
);;

export default instance;