import axios, {  AxiosError, InternalAxiosRequestConfig } from 'axios';
//import axios, { AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
  //baseURL: 'https://590kh9xc-5000.asse.devtunnels.ms/',
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem('accessToken');
    
    if (token) {
      // Ensure headers are using AxiosHeaders
      if (!config.headers) {
        config.headers = new axios.AxiosHeaders(); // Fix: Use AxiosHeaders
      }
      (config.headers as any)['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

api.interceptors.response.use(
  response => response, async error => {
    const originalRequest = error.config;
    console.log('test refresh');
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const res = await api.post('/auth/refresh', { token: refreshToken });
        localStorage.setItem('accessToken', res.data.accessToken);
        api.defaults.headers.common['Authorization'] = `Bearer ${res.data.accessToken}`;
        return api(originalRequest); // Retry the original request with the new token
      } catch (err) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login'; // Redirect to login if refresh token fails
      }
    }

    return Promise.reject(error);
  }
);




export default api;
