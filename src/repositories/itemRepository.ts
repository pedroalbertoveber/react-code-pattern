import { Item } from "../entities/item";

export interface ItemRepository {
  getItems(): Promise<Item[]>;
}
