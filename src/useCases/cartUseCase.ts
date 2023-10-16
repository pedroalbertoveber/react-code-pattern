import { Item } from '../entities/item';
import { Cart } from '../entities/cart';

export class CartUseCase extends Cart {
  getItemById(id: number): Item | undefined {
    return this.getProductById(id);
  }

  async addItem(item: Item): Promise<Item | unknown> {
    // Validações de campos
    // Validação de inserções duplicadas
    if (this.getItemById(item.id)) {
      alert('Item already exists in cart');
      throw new Error('Item already exists in cart');
    }

    // entidade
    const response = await this.addProduct(item);
    this.notify();

    return response;
  }

  removeItem(itemId: number) {
    this.removeProduct(itemId);
    this.notify();
  }

  getItems(): Item[] {
    // Ordenar array
    // Regras de disponibilidade
    return this.getProducts();
  }

  private notify() {
    for (const listener of this.getListeners()) {
      listener();
    }
  }
}
