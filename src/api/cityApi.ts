import { City, ListResponse } from 'models';
import axiosClient from './axiosClient';

const cityApi = {
  getAll(): Promise<ListResponse<City>> {
    const url = '/cities';
    return axiosClient.get(url, {
      params: {
        _page: 1,
        _total: 10,
      },
    });
  },
};
export default cityApi;
