import { Cart } from '../../entities/cart';
import { Item } from '../../entities/item';

export class MockCartUseCase extends Cart {
  getItemById(id: number): Item | undefined {
    return this.getProductById(id);
  }

  async addItem(item: Item) {
    if (this.getItemById(item.id)) {
      throw new Error('Item already exists in cart');
    }

    const response = await this.addProduct(item);
    this.notify();

    return response;
  }

  removeItem(itemId: number) {
    this.removeProduct(itemId);
    this.notify();
  }

  getItems(): Item[] {
    return this.getProducts();
  }

  private notify() {
    for (const listener of this.getListeners()) {
      listener();
    }
  }
}
