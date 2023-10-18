import type { DefaultAxiosResponse } from '../core/@types'

export type ItemProps = {
  id: number;
  name: string;
  price: number;
};

export type GetItemsApiResponseType = DefaultAxiosResponse & {
  data: ItemProps[]
}