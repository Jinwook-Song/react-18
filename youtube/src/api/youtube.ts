import axios, { AxiosInstance } from 'axios';

export default class Youtube {
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

  private async searchBykeyword(keyword: string) {
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

  private async mostPopular() {
    return this.httpClient('videos', {
      params: {
        part: 'snippet',
        maxResults: 25,
        chart: 'mostPopular',
      },
    }).then((res) => res.data.items);
  }
}
