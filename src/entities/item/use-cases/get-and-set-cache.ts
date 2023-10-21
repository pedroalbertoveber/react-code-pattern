import { Item } from "..";
import { ItemProps, GetItemsApiResponseType } from "../@types";

// type GetAllItemsUseCaseRequest = {}
type GetAndSetCacheUseCaseResponse = {
  items: ItemProps[];
};

export class GetAndSetCacheUseCase {
  constructor(private readonly itemEntity: Item) {}

  async execute(): Promise<GetAndSetCacheUseCaseResponse> {
    const items = await this.itemEntity.getHttpAndSetCache<
      ItemProps[],
      typeof this.itemEntity.getMethods,
      GetItemsApiResponseType
    >({
      shouldUpdate: false,
    });

    return {
      items,  
    };
  }
}
