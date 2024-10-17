import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';
const LOGIN_ENDPOINT = '/auth/login';
const REFRESH_TOKEN_ENDPOINT = '/auth/refresh-token';

export const api = axios.create({
  baseURL: API_BASE_URL,
});

// Simpan token ke localStorage
const setTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
};

// Ambil token dari localStorage
const getAccessToken = () => localStorage.getItem('accessToken');
const getRefreshToken = () => localStorage.getItem('refreshToken');

// Logout, hapus token
const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  window.location.href = '/login'; // Redirect ke login
};

// Login dengan username dan password
export const login = async (username: string, password: string) => {
  const response = await api.post(LOGIN_ENDPOINT, { username, password });
  const { accessToken, refreshToken } = response.data;
  setTokens(accessToken, refreshToken);
  return response.data;
};

// Refresh token
const refreshToken = async () => {
  try {
    const response = await api.post(REFRESH_TOKEN_ENDPOINT, { refreshToken: getRefreshToken() });
    const { accessToken } = response.data;
    localStorage.setItem('accessToken', accessToken);
    return accessToken;
  } catch (error) {
    logout(); // Jika refresh token gagal, logout
  }
};

// Axios Interceptor untuk menambahkan Authorization Header
api.interceptors.request.use(
  async (config) => {
    let token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Axios Interceptor untuk menangani refresh token ketika token akses kadaluarsa
api.interceptors.response.use(
  (response) => response, // Lanjutkan jika tidak ada error
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newAccessToken = await refreshToken(); // Refresh token
      if (newAccessToken) {
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return api(originalRequest); // Kirim ulang request dengan token baru
      }
    }
    return Promise.reject(error);
  }
);
