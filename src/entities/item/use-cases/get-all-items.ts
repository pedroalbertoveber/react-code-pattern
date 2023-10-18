import { Item } from "..";
import { ItemProps } from "../@types";

// type GetAllItemsUseCaseRequest = {}
type GetAllItemsUseCaseResponse = {
  items: ItemProps[];
};

export class GetAllItemsUseCase {
  constructor(private readonly itemEntity: Item) {}

  async execute(): Promise<GetAllItemsUseCaseResponse> {
    const items = await this.itemEntity.getHttp<
      ItemProps[],
      typeof this.itemEntity.getMethods
    >({});

    return {
      items,
    };
  }
}
