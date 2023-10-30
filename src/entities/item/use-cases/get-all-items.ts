import { Item } from "..";
import { ItemProps } from "../@types";

export class GetAllItemsUseCase {
  constructor(private readonly itemEntity: Item) {}

  execute() {
    const { useQuery } = this.itemEntity.hooks

    const response = useQuery<ItemProps[]>({
      queryKey: this.itemEntity.cachePath,
      fetcher: async () => {
        const response = await this.itemEntity.fetch<ItemProps[]>({
          useCache: true,
          revalidate: 1000 * 10, // 10 seconds
        });

        return response
      },
    })

    return response;
  }
}
