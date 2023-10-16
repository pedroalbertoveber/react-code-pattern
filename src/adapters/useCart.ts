import { useState, useEffect } from 'react';
import { useCart } from '../contexts/CartContext';

export const useCartAdapter = () => {
  // contexto do useCase
  const useCaseContext = useCart();
  const [items, setItems] = useState(useCaseContext.getItems());

  useEffect(() => {
    const unsubscribe = useCaseContext.subscribe(() => {
      setItems(useCaseContext.getItems());
    });

    return unsubscribe;
  }, [useCaseContext]);

  return {
    items,
    addItem: useCaseContext.addItem.bind(useCaseContext),
    removeItem: useCaseContext.removeItem.bind(useCaseContext)
  };
};
