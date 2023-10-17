import { Item } from '../entities/item';
import { Core } from '../utils/core';
import { ItemRepository } from './itemRepository';

export class ItemRepositoryImpl extends Core implements ItemRepository {
  protected endpoint: string = '/products';
  async getItems(): Promise<Item[]> {
    const response: Item[] = await this.get();
    return response.map(product => new Item(product.id, product.name, product.price));
  }
}
