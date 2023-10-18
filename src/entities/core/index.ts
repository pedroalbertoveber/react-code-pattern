import { get, set } from "../../services/cache";

import type {
  GetCacheType,
  SetCacheProps,
  GetHttpRequestParams,
  PostHttpRequestParams,
  PutHttpRequestParams,
  SetEntity,
  MakeUrlParams,
  DefaultAxiosResponse,
  EntityConstructorProps,
  CustomRequestRespose,
  MergeConfigurationsParams,
} from "./@types";

/**
 * This is a parent class which can only be extended and will provide the basic methods for all entities:
 *
 * @param baseUrl this parameter will be the route to access the entity on api
 * @example url: http://localhost:3000/users; the baseUrl is 'users'
 *
 * @param cachePath: this parameter represents the key of the entity storage on local storage
 */
export abstract class Entity {
  private baseUrl: string;
  private cachePath: string;

  constructor({ baseUrl, cachePath }: EntityConstructorProps) {
    this.baseUrl = baseUrl;
    this.cachePath = cachePath;
  }

  async getCache<Props>({
    cachePath = this.cachePath,
  }: GetCacheType): Promise<Props | null> {
    const cachedData = get<Props>({ key: cachePath || this.cachePath });
    return cachedData;

    // TODO: implementar localforage
    // if (Object.keys(cached).length === 0) {
    //     return getLocalStorage(key || this.cachePath).then((res) => {
    //         return res;
    //     });
    // }
  }

  async setCache<Props>({ shouldUpdate, key, value }: SetCacheProps<Props>) {
    const cache = await this.getCache<Props>({
      cachePath: key || this.cachePath,
    });

    const shouldUpdateCacheData = shouldUpdate || !cache;

    if (shouldUpdateCacheData) {
      set<Props>({ key: key || this.cachePath, value });
    }
  }

  async getHttp<Props, AllowedMethods = "">({
    config = null,
    method = "",
    url = this.baseUrl,
  }: GetHttpRequestParams<AllowedMethods>) {
    const params: any = [];

    if (config && config.params) {
      Object.keys(config.params).forEach((key) => {
        if (config.params && !!config.params[key]) {
          params.push(`${key}=${config.params[key]}`);
        }
      });
    }

    const fetchUrl =
      this.makeUrl({ method: this.toString(method), url }) +
      (params.length > 0 ? `?${params.join("&")}` : "");

    const configuration: RequestInit = await this.interceptor();

    const requestConfig = await this.mergeConfigurations({
      configuration,
      config,
    });

    try {
      const response = await fetch(fetchUrl, {
        ...requestConfig,
        method: "GET",
      });

      const data = (await response.json()) as Props;
      return data;
    } catch (error: any) {
      console.log("err - ", error);
      throw new Error(error);
    }
  }

  async postHttp<Props, AllowedMethods>({
    url,
    body,
    method,
    config = {},
  }: PostHttpRequestParams<AllowedMethods>) {
    const configuration: RequestInit = await this.interceptor();

    const requestConfig = await this.mergeConfigurations({
      configuration,
      config,
    });

    try {
      const response = await fetch(
        this.makeUrl({
          method: method ? this.toString(method) : this.baseUrl,
          url,
        }),
        {
          ...requestConfig,
          body: JSON.stringify(body),
          method: "POST",
        }
      );

      const data = (await response.json()) as Props;
      return data;
    } catch (error: any) {
      console.log("err - ", error);
      throw new Error(error);
    }
  }

  async putHttp<Props, AllowedMethods>({
    url,
    body,
    method,
    config = {},
  }: PutHttpRequestParams<AllowedMethods>) {
    const configuration: RequestInit = await this.interceptor();

    const requestConfig = await this.mergeConfigurations({
      configuration,
      config,
    });

    try {
      const response = await fetch(
        this.makeUrl({
          method: method ? this.toString(method) : this.baseUrl,
          url,
        }),
        {
          ...requestConfig,
          body: JSON.stringify(body),
          method: "PUT",
        }
      );
      const data = (await response.json()) as Props;
      return data;
    } catch (error: any) {
      console.log("err - ", error);
      throw new Error(error);
    }
  }

  /**
   *
   * This method should be called if you want to fetch data and set it on local storage
   * If you're not using axios, you can pass your own return key instead of "data" as     paramater "customReturn"
   * @param method
   * @param url
   * @param shouldUpdate
   * @param customReturn
   * @param cachePath
   */
  async setEntity<
    Props,
    AllowedMethods,
    HttpResponse extends DefaultAxiosResponse
  >({
    method = null,
    url = this.baseUrl,
    shouldUpdate = true,
    customReturn = null,
    cachePath = this.cachePath,
  }: SetEntity<HttpResponse>): Promise<Props> {
    const cache = await this.getCache<Props>({
      cachePath: cachePath || this.cachePath,
    });
    const request = this.isCustomRequest({ url, cachePath });

    const shouldUpdateEntity = shouldUpdate || !cache;

    if (shouldUpdateEntity) {
      const response = await this.getHttp<HttpResponse, AllowedMethods>({
        method: this.toString(method),
        url: request.url,
        config: {},
      });

      const toReturn = customReturn ? response[customReturn] : response.data;
      await this.setCache<Props>({
        shouldUpdate: shouldUpdateEntity,
        value: toReturn,
        key: request.cachePath,
      });
      return toReturn as Props;
    } else {
      return cache;
    }
  }

  // TODO passar para o .env
  private makeUrl({ method = null, url = null }: MakeUrlParams) {
    const apiUrl = "http://localhost:3333/";
    const baseUrl = apiUrl + (url || this.baseUrl);
    const _url = method ? baseUrl + "/" + method : baseUrl;
    return _url;
  }

  private isCustomRequest(custom: any): CustomRequestRespose {
    if (custom) {
      return {
        url: custom.url || this.baseUrl,
        cachePath: custom.cachePath || this.cachePath,
      };
    }
    return {
      url: this.baseUrl,
      cachePath: this.cachePath,
    };
  }

  private async interceptor() {
    // const token = await Auth.currentSession().then((result: any) => {
    //   return result.getIdToken().getJwtToken();
    // });

    const token = "token";
    const config: RequestInit = {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    };

    return config;
  }

  private async mergeConfigurations({
    configuration,
    config = null,
  }: MergeConfigurationsParams) {
    const merged = {
      ...configuration,
      ...config,
      headers: {
        ...configuration.headers,
        ...config?.headers,
      },
    };
    return merged;
  }

  private toString(value: any) {
    return value ? value.toString() : "";
  }
}
