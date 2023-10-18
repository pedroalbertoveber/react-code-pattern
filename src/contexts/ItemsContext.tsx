import { createContext, ReactNode, useContext } from "react";
import { Item } from "../entities/item";
import { GetAllItemsUseCase } from "../entities/item/use-cases/get-all-items";

type ItemsContextType = {
  ItemEntity: Item;
  getAllItems: GetAllItemsUseCase
}

export const ItemsContext = createContext<ItemsContextType>({} as ItemsContextType)

export const ItemsContextProvider = ({ children }: { children: ReactNode }) => {
  const ItemEntity = new Item()
  const getAllItems = new GetAllItemsUseCase(ItemEntity)

  return (
    <ItemsContext.Provider value={{ ItemEntity, getAllItems }}>
      {children}
    </ItemsContext.Provider>
  )
} 

export const useItemsContext = () => {
  const context = useContext(ItemsContext)

  return context
}


