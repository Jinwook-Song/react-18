import axios, { AxiosInstance, AxiosResponse } from 'axios';

export interface IYoutubeClient {
  search(params: any): Promise<AxiosResponse<any, any>>;
  videos(params: any): Promise<AxiosResponse<any, any>>;
}

export default class YoutubeClient implements IYoutubeClient {
  private httpClient: AxiosInstance;

  constructor() {
    this.httpClient = axios.create({
      baseURL: 'https://youtube.googleapis.com/youtube/v3',
      params: { key: import.meta.env.VITE_YOUTUBE_API_KEY },
    });
  }

  async search(params: any) {
    console.log(params);
    return this.httpClient.get('search', params);
  }
  async videos(params: any) {
    console.log(params);
    return this.httpClient.get('videos', params);
  }
}
