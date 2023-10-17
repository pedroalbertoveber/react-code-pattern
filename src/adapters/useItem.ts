import { ItemRepositoryImpl } from '../repositories/itemRepositoryImpl';
import { ItemUseCase } from '../useCases/item/itemUseCase';
import { useQueryAdapter } from './useQueryAdapter';

const itemRepository = new ItemRepositoryImpl();
const itemUseCase = new ItemUseCase(itemRepository);

export const useGetItems = () => {
  return useQueryAdapter({
    queryKey: ['products'],
    queryFn: () => itemUseCase.getItems()
  });
};
