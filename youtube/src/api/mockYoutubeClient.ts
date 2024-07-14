import axios, { AxiosResponse } from 'axios';
import { IYoutubeClient } from './youtubeClient';

export default class MockYoutubeClient implements IYoutubeClient {
  search(_: any): Promise<AxiosResponse<any, any>> {
    return axios.get('/data/search.json');
  }
  videos(_: any): Promise<AxiosResponse<any, any>> {
    return axios.get('/data/popular.json');
  }
}
