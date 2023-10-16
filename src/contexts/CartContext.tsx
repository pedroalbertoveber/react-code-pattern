import React, { createContext, useContext } from 'react';
import { CartUseCase } from '../useCases/cartUseCase';

const CartContext = createContext<CartUseCase | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const useCase = new CartUseCase();
  return (
    <CartContext.Provider value={useCase}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}