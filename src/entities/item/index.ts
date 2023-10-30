// Core
import { Entity } from "../core/entity";
import type { ItemProps } from "./@types";

// Hooks
import { useItem } from "./hooks/useItem";

// Http Methods
import { HttpMethods } from "./methods";

export class Item extends Entity {
  public getMethods = HttpMethods.GET;
  public putMethods = HttpMethods.PUT;
  public postMethods = HttpMethods.POST;
  public deleteMethods = HttpMethods.DELETE;

  constructor() {
    super({
      baseUrl: "items",
      cachePath: "@B2B:Localstorage:items",
    });
  }

  public hooks = {
    // useQuery,
    ...this._hooks,
    useItem: useItem<ItemProps[]>([]),
  };

}
