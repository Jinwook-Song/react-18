import { Video } from '../types';
import { IYoutubeClient } from './youtubeClient';

export interface YoutubeApi {
  search(keyword?: string): Promise<Video[]>;
}

export default class Youtube implements YoutubeApi {
  constructor(private readonly apiClient: IYoutubeClient) {}

  async search(keyword?: string) {
    return keyword ? this.searchBykeyword(keyword) : this.mostPopular();
  }

  private async searchBykeyword(keyword: string): Promise<Video[]> {
    return this.apiClient
      .search({
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
    return this.apiClient
      .videos({
        params: {
          part: 'snippet',
          type: 'video',
          maxResults: 25,
          chart: 'mostPopular',
        },
      })
      .then((res) => res.data.items);
  }
}
