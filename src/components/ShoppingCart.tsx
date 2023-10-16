import { useCartAdapter } from '../adapters/useCart';

export function ShoppingCart() {
  const { items, removeItem } = useCartAdapter();

  return (
    <div>
      <h2>Carrinho</h2>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name} - ${item.price}
            <button onClick={() => removeItem(item.id)}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
