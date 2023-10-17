import { Item } from "../entities/item";
import httpService from "../services/http";

export class Core {
  protected apiBaseURL: string = 'https://your-api-base-url.com';
  protected endpoint: string = '';

  constructor(endpoint?: string) {
    if (endpoint) {
      this.endpoint = endpoint;
    }
  }

  get(): Promise<Item[]> {
    return httpService.get(this.endpoint);
  }
}
