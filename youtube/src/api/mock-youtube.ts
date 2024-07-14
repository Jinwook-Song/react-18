import axios from 'axios';
import { YoutubeApi } from './youtube';

export default class MockYoutube implements YoutubeApi {
  constructor() {}
  async search(keyword?: string) {
    return keyword ? this.searchBykeyword() : this.mostPopular();
  }

  private async searchBykeyword() {
    return axios('/data/search.json')
      .then((res) => res.data.items)
      .then((items) =>
        items.map((item: any) => ({ ...item, id: item.id.videoId })),
      );
  }

  private async mostPopular() {
    return axios('/data/popular.json').then((res) => res.data.items);
  }
}
