import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { MockCartUseCase } from './mockCartUseCase';
import { Item } from '../../entities/item';

let repo: MockCartUseCase;
let sampleItem: Item;

beforeEach(() => {
  repo = new MockCartUseCase();
  sampleItem = new Item(1, 'Sample Product', 10.99);
});

it('should notify all listeners when an item is added', () => {
  const listener1 = vitest.fn();
  const listener2 = vitest.fn();

  repo.subscribe(listener1);
  repo.subscribe(listener2);

  repo.addItem(sampleItem);

  expect(listener1.call.length).toBe(1);
  expect(listener2.call.length).toBe(1);
});

it('should stop notifying unsubscribed listeners', () => {
  const listener = vitest.fn();

  const unsubscribe = repo.subscribe(listener);
  repo.addItem(sampleItem);

  expect(listener.call.length).toBe(1);

  unsubscribe();

  repo.removeItem(sampleItem.id);
  expect(listener.call.length).toBe(1);
});

describe('CartRepository', () => {
  it('should add an item to the cart', async () => {
    const item = sampleItem;

    const response = await repo.addItem(item);

    expect(response).toEqual(item);
  });

  it('should throw an error if item already exists in cart', async () => {
    const item = sampleItem;

    try {
      await repo.addItem(item);
      await repo.addItem(item);
    } catch (error) {
      expect((error as Error).message).toBe('Item already exists in cart');
    }
  });

  it('should remove an item from the cart', () => {
    const item = sampleItem;
    repo.addItem(item);

    repo.removeItem(item.id);

    const itemsInCart = repo.getItems();
    expect(itemsInCart.length).toBe(0);
  });
});
