import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';

const createApiClient = () => {
  const { getToken } = useAuth();
  
  const instance = axios.create({
    baseURL: '/api'
  });

  instance.interceptors.request.use(async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return instance;
};

export default createApiClient;