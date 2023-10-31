import { api } from "@/lib/api";
import { EntityConstructorProps } from "./@types";
import { createExpirationDate } from "./helpers/create-expiration-date";
import { verifyIfIsExpired } from "./helpers/verify-if-is-expired";
import { useQuery } from "./hooks/useQuery";


import type { FetchProps, LocalStorageItemType, SetLocalStorageProps } from './@types'

/**
 * This is a parent class which can only be extended and will provide the basic methods for all entities:
 *
 * @param baseUrl this parameter will be the route to access the entity on api
 * @example url: http://localhost:3000/users; the baseUrl is 'users'
 *
 * @param cachePath: this parameter represents the key of the entity storage on local storage
 */
export abstract class Entity {
  private _baseUrl: string;
  private _cachePath: string;

  constructor({ baseUrl, cachePath }: EntityConstructorProps) {
    this._baseUrl = baseUrl;
    this._cachePath = cachePath;
  }

  get baseUrl(): string {
    return this._baseUrl;
  }

  get cachePath(): string {
    return this._cachePath;
  }

  protected _hooks = {
    useQuery,
  };

  /**
   * This method will fetch data from api and store it on local storage
   * Although this method has been created to be used using local storage, it can be used without it just passing the paramter useCache as false
   *
   * @param props: this parameter is an object with the following properties:
   * @param props.endPoint: this parameter is the endpoint of the api which will be used to fetch data
   *
   * @param props.overrideBaseUrl: this parameter is the base url of the api which will be used to fetch data
   *
   * @param props.useCache: this parameter is a boolean which will define if the data will be stored on local storage or not
   *
   * @param props.cacheKey: this parameter is the key which will be used to store the data on local storage
   *
   * @param props.revalidate: this parameter is the time in milliseconds which will be used to revalidate the data on local storage
   */
  public async fetch<ReturnType = unknown>(
    props?: FetchProps | undefined
  ): Promise<ReturnType> {
    const defaultParams: FetchProps = {
      overrideBaseUrl: this.baseUrl,
      useCache: false,
    };

    const requestProps = {
      ...defaultParams,
      ...props,
    };

    if (props?.useCache) {
      const cached =
        props.storage === "localstorage"
          ? await this.getFromLocalStorage<ReturnType>(props.cacheKey)
          : await this.getFromSessionStorage<ReturnType>(props.cacheKey);

      if (cached) {
        return cached;
      }
    }

    const { config, overrideBaseUrl } = requestProps;

    const { data } = await api.get<ReturnType>(overrideBaseUrl, config);

    if (props?.useCache) {
      props.storage === "localstorage"
        ? await this.setLocalStorage({
            data,
            key: props.cacheKey,
            revalidate: props.revalidate,
          })
        : await this.setSessionStorage({
            data,
            key: props.cacheKey,
            revalidate: props.revalidate,
          });
    }

    return data;
  }

  private async getFromLocalStorage<ReturnType = unknown>(storageKey?: string) {
    const key = storageKey || this.cachePath;
    const data = localStorage.getItem(key);

    if (!data) {
      return null;
    }

    const { data: storedData, expiresIn } = JSON.parse(
      data
    ) as LocalStorageItemType<ReturnType>;
    const isExpired = verifyIfIsExpired(expiresIn);

    if (isExpired) {
      localStorage.removeItem(key);
      return null;
    }

    return storedData as ReturnType;
  }

  private async setLocalStorage({
    data,
    revalidate,
    key,
  }: SetLocalStorageProps): Promise<void> {
    const expiration = createExpirationDate(revalidate);

    localStorage.setItem(
      key || this.cachePath,
      JSON.stringify({
        expiresIn: expiration,
        data,
      })
    );
  }

  private async getFromSessionStorage<ReturnType = unknown>(
    storageKey?: string
  ) {
    const key = storageKey || this.cachePath;
    const data = localStorage.getItem(key);

    if (!data) {
      return null;
    }

    const { data: storedData, expiresIn } = JSON.parse(
      data
    ) as LocalStorageItemType<ReturnType>;
    const isExpired = verifyIfIsExpired(expiresIn);

    if (isExpired) {
      localStorage.removeItem(key);
      return null;
    }

    return storedData as ReturnType;
  }

  private async setSessionStorage({
    data,
    revalidate,
    key,
  }: SetLocalStorageProps): Promise<void> {
    const expiration = createExpirationDate(revalidate);

    sessionStorage.setItem(
      key || this.cachePath,
      JSON.stringify({
        expiresIn: expiration,
        data,
      })
    );
  }
}
