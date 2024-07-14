import axios, { AxiosInstance } from 'axios';
import { Video } from '../types';

export interface YoutubeApi {
  search(keyword?: string): Promise<Video[]>;
}

export default class Youtube implements YoutubeApi {
  private httpClient: AxiosInstance;
  constructor() {
    this.httpClient = axios.create({
      baseURL: 'https://youtube.googleapis.com/youtube/v3',
      params: { key: import.meta.env.VITE_YOUTUBE_API_KEY },
    });
  }
  async search(keyword?: string) {
    return keyword ? this.searchBykeyword(keyword) : this.mostPopular();
  }

  private async searchBykeyword(keyword: string): Promise<Video[]> {
    return this.httpClient('search', {
      params: {
        part: 'snippet',
        type: 'video',
        maxResults: 25,
        q: keyword,
      },
    })
      .then((res) => res.data.items)
      .then((items) =>
        items.map((item: any) => ({ ...item, id: item.id.videoId })),
      );
  }

  private async mostPopular(): Promise<Video[]> {
    return this.httpClient('videos', {
      params: {
        part: 'snippet',
        type: 'video',
        maxResults: 25,
        chart: 'mostPopular',
      },
    }).then((res) => res.data.items);
  }
}
