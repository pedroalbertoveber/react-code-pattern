import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000'
});

const axiosAdapter = {
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await instance.get(url, config);
    return response.data;
  },
};

export default axiosAdapter;
