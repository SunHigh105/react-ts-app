import axios from 'axios';
import camelcaseKeys from 'camelcase-keys';

export interface ApiConfig {
  baseURL: string;
  timeout: number;
}

const DEFAULT_API_CONFIG: ApiConfig = {
  // baseURL: 'https://api.github.com',
  baseURL: 'http://localhost', //process.env.APP_URL,
  timeout: 7000,
};

export const createAxiosInstance = (optionConfig?: ApiConfig) => {
  const config = {
    ...DEFAULT_API_CONFIG,
    ...optionConfig,
  };
  const instance = axios.create(config);
  instance.interceptors.response.use(res => ({
    ...res,
    data: camelcaseKeys(res.data, { deep: true }),
  }));

  return instance;
};
