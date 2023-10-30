import { createContext, ReactNode, useContext } from "react";
import { Item } from "../entities/item";
import { GetAllItemsUseCase } from "../entities/item/use-cases/get-all-items";
import { GetItemByIdUseCase } from "@/entities/item/use-cases/get-item-by-id";

type ItemsContextType = {
  ItemEntity: Item;
  getAllItems: GetAllItemsUseCase;
  getItemById: GetItemByIdUseCase;
};

export const ItemsContext = createContext<ItemsContextType>(
  {} as ItemsContextType
);

export const ItemsContextProvider = ({ children }: { children: ReactNode }) => {
  const ItemEntity = new Item()

  const getAllItems = new GetAllItemsUseCase(ItemEntity);
  const getItemById = new GetItemByIdUseCase(ItemEntity);

  return (
    <ItemsContext.Provider value={{ ItemEntity, getAllItems, getItemById }}>
      {children}
    </ItemsContext.Provider>
  );
};

export const useItemsContext = () => {
  const context = useContext(ItemsContext);

  return context;
};
