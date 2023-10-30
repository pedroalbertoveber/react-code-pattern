// Cache
// import { get, set } from "../../services/cache";

// Mappers
import { EntityMapper } from "./EntityMapper";

// Helpers
import {
  // interceptor,
  // makeUrl,
  // mergeConfigurations,
  // verifyIfIsCustomRequest,
} from "./helpers";

// Types
import type {
  // GetCacheType,
  // SetCacheProps,
  // GetHttpRequestParams,
  // PostHttpRequestParams,
  // PutHttpRequestParams,
  // GetHttpAndSetCacheProps,
  // DefaultAxiosResponse,
  EntityConstructorProps,
  FetchProps,
} from "./@types";
import { api } from "@/lib/api";

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

  public async getHttp<ReturnType = any, DefaultEndPoints = any>(
    props?: FetchProps<DefaultEndPoints>
  ): Promise<ReturnType> {
    const defaultParams: FetchProps<DefaultEndPoints> = {
      config: undefined,
      endpoint: null,
      overrideBaseUrl: this._baseUrl,
    };

    const { config, endpoint, overrideBaseUrl } = props || defaultParams;

    const fetchUrl = endpoint
      ? `${overrideBaseUrl}/${EntityMapper.toString(endpoint)}`
      : overrideBaseUrl;

    const response = await api.get<ReturnType>(fetchUrl, config);

    return response.data;
  }

  // async getCache<Props>({
  //   cachePath = this.cachePath,
  // }: GetCacheType): Promise<Props | null> {
  //   const cachedData = get<Props>({ key: cachePath || this.cachePath });
  //   return cachedData;

  //   // TODO: implementar localforage
  //   // if (Object.keys(cached).length === 0) {
  //   //     return getLocalStorage(key || this.cachePath).then((res) => {
  //   //         return res;
  //   //     });
  //   // }
  // }

  // async setCache<Props>({ shouldUpdate, key, value }: SetCacheProps<Props>) {
  //   const cache = await this.getCache<Props>({
  //     cachePath: key || this.cachePath,
  //   });

  //   const shouldUpdateCacheData = shouldUpdate || !cache;

  //   if (shouldUpdateCacheData) {
  //     set<Props>({ key: key || this.cachePath, value });
  //   }
  // }

  // async getHttp<Props, AllowedMethods = "">({
  //   config = null,
  //   method = "",
  //   url = this.baseUrl,
  // }: GetHttpRequestParams<AllowedMethods>) {
  //   const params: any = [];

  //   if (config && config.params) {
  //     Object.keys(config.params).forEach((key) => {
  //       if (config.params && !!config.params[key]) {
  //         params.push(`${key}=${config.params[key]}`);
  //       }
  //     });
  //   }

  //   const fetchUrl =
  //     makeUrl({ method: EntityMapper.toString(method), url }) +
  //     (params.length > 0 ? `?${params.join("&")}` : "");

  //   const configuration: RequestInit = await interceptor();

  //   const requestConfig = mergeConfigurations({
  //     configuration,
  //     config,
  //   });

  //   try {
  //     const response = await fetch(fetchUrl, {
  //       ...requestConfig,
  //       method: "GET",
  //     });

  //     const data = (await response.json()) as Props;
  //     return data;
  //   } catch (error: any) {
  //     console.log("err - ", error);
  //     throw new Error(error);
  //   }
  // }

  // async postHttp<Props, AllowedMethods>({
  //   url,
  //   body,
  //   method,
  //   config = {},
  // }: PostHttpRequestParams<AllowedMethods>) {
  //   const configuration: RequestInit = await interceptor();

  //   const requestConfig = mergeConfigurations({
  //     configuration,
  //     config,
  //   });

  //   try {
  //     const response = await fetch(
  //       makeUrl({
  //         method: method ? EntityMapper.toString(method) : this.baseUrl,
  //         url,
  //       }),
  //       {
  //         ...requestConfig,
  //         body: JSON.stringify(body),
  //         method: "POST",
  //       }
  //     );

  //     const data = (await response.json()) as Props;
  //     return data;
  //   } catch (error: any) {
  //     console.log("err - ", error);
  //     throw new Error(error);
  //   }
  // }

  // async putHttp<Props, AllowedMethods>({
  //   url,
  //   body,
  //   method,
  //   config = {},
  // }: PutHttpRequestParams<AllowedMethods>) {
  //   const configuration: RequestInit = await interceptor();

  //   const requestConfig = mergeConfigurations({
  //     configuration,
  //     config,
  //   });

  //   try {
  //     const response = await fetch(
  //       makeUrl({
  //         method: method ? EntityMapper.toString(method) : this.baseUrl,
  //         url,
  //       }),
  //       {
  //         ...requestConfig,
  //         body: JSON.stringify(body),
  //         method: "PUT",
  //       }
  //     );
  //     const data = (await response.json()) as Props;
  //     return data;
  //   } catch (error: any) {
  //     console.log("err - ", error);
  //     throw new Error(error);
  //   }
  // }

  // /**
  //  *
  //  * This method should be called if you want to fetch data and set it on local storage
  //  * If you're not using axios, you can pass your own return key instead of "data" as paramater "customReturn"
  //  * @param method
  //  * @param url
  //  * @param shouldUpdate @default true - If you want to not use cache, pass false
  //  * @param customReturn @default null - If you're not using axios, you can pass your own return key instead of "data"
  //  * @param cachePath - If you want to use a different cache path, you can pass it here
  //  */
  // async getHttpAndSetCache<
  //   Props,
  //   AllowedMethods,
  //   HttpResponse extends DefaultAxiosResponse
  // >({
  //   method = null,
  //   url = this.baseUrl,
  //   shouldUpdate = true,
  //   customReturn = null,
  //   cachePath = this.cachePath,
  // }: GetHttpAndSetCacheProps<HttpResponse>): Promise<Props> {
  //   const cache = await this.getCache<Props>({
  //     cachePath: cachePath || this.cachePath,
  //   });

  //   const request = verifyIfIsCustomRequest({
  //     cachePath: cachePath || this.cachePath,
  //     baseUrl: url || this.baseUrl,
  //     custom: method,
  //   });

  //   const shouldUpdateEntity = shouldUpdate || !cache;

  //   if (shouldUpdateEntity) {
  //     const response = await this.getHttp<HttpResponse, AllowedMethods>({
  //       method: EntityMapper.toString(method),
  //       url: request.url,
  //       config: {},
  //     });

  //     const toReturn = customReturn ? response[customReturn] : response.data;
  //     await this.setCache<Props>({
  //       shouldUpdate: shouldUpdateEntity,
  //       value: toReturn,
  //       key: request.cachePath,
  //     });
  //     return toReturn as Props;
  //   } else {
  //     return cache;
  //   }
  // }
}
