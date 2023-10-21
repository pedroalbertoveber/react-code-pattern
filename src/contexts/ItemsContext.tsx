import { createContext, ReactNode, useContext } from "react";
import { Item } from "../entities/item";
import { GetAllItemsUseCase } from "../entities/item/use-cases/get-all-items";
import { GetAndSetCacheUseCase } from "../entities/item/use-cases/get-and-set-cache";

type ItemsContextType = {
  ItemEntity: Item;
  getAllItems: GetAllItemsUseCase;
  getAndSetCache: GetAndSetCacheUseCase;
};

export const ItemsContext = createContext<ItemsContextType>(
  {} as ItemsContextType
);

export const ItemsContextProvider = ({ children }: { children: ReactNode }) => {
  const ItemEntity = new Item()

  const getAllItems = new GetAllItemsUseCase(ItemEntity);
  const getAndSetCache = new GetAndSetCacheUseCase(ItemEntity);

  return (
    <ItemsContext.Provider value={{ ItemEntity, getAllItems, getAndSetCache }}>
      {children}
    </ItemsContext.Provider>
  );
};

export const useItemsContext = () => {
  const context = useContext(ItemsContext);

  return context;
};
