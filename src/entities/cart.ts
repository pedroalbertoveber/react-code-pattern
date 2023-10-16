import { Item } from "./item";

export class Cart {
  private listeners: (() => void)[] = [];
  private items: Item[] = [];

  getProductById(id: number): Item | undefined {
    return this.items.find(item => item.id === id);
  }

  addProduct(item: Item) {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.items.push(item);
        resolve(item);
      }, 200);
    });
  }

  removeProduct(itemId: number) {
    this.items = this.items.filter(item => item.id !== itemId);
  }

  getProducts(): Item[] {
    return [...this.items];
  }

  subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  getListeners() {
    return this.listeners;
  }
}