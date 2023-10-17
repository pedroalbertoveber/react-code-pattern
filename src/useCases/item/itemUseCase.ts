import { Item } from '../../entities/item';
import { ItemRepository } from '../../repositories/itemRepository';

export class ItemUseCase {
  constructor(private repository: ItemRepository) {}

  async getItems(): Promise<Item[]> {
    return this.repository.getItems();
  }
}
