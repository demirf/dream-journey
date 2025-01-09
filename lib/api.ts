import axios from 'axios';
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

// Get the local IP address for development
const localhost = Constants.expoConfig?.hostUri?.split(':')[0] || 'localhost';

const api = axios.create({
  baseURL: `http://${localhost}:3000/api`,
});

// Request interceptor - token ekle
api.interceptors.request.use(
  async (config: any) => {
    const token = await AsyncStorage.getItem('token');
    console.log('API Request:', {
      url: config.url,
      method: config.method,
      token: token ? 'exists' : 'none'
    });
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor - hata yönetimi
api.interceptors.response.use(
  (response: any) => {
    console.log('API Response:', {
      url: response.config.url,
      status: response.status,
      data: response.data
    });
    return response;
  },
  async (error: AxiosError) => {
    console.error('API Response Error:', {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data
    });
    
    if (error.response?.status === 401) {
      await AsyncStorage.multiRemove(['token', 'user']);
    }
    return Promise.reject(error);
  }
);

export default api;