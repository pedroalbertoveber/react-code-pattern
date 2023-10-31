import { Item } from "..";
import { ItemProps } from "../@types";

type GetItemByIdUseCaseParams = {
  id: string;
}

export class GetItemByIdUseCase {
  constructor(private readonly itemEntity: Item) {}

  execute({ id }: GetItemByIdUseCaseParams) {
    const { useQuery } = this.itemEntity.hooks

    const response = useQuery<ItemProps>({
      queryKey: `@B2B-ITEM:ITEM-ID-${id}`,
      fetcher: async () => {
        const data = await this.itemEntity.fetch<ItemProps>({
          useCache: true,
          overrideBaseUrl: `${this.itemEntity.baseUrl}/${id}`,
          storage: 'localstorage',
          cacheKey: `@B2B-ITEM:ITEM-ID-${id}`,
          revalidate: 1000 * 15, // 15 seconds 
        })

        return data;
      }
    })

    return response
  }
}
