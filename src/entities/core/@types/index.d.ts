export type MethodsBase = Record<string, string> | null;

export type DefaultAxiosResponse = { data: any };

import type { AxiosRequestConfig } from 'axios'

type FetchProps = {
  overrideBaseUrl: string;
  config?: AxiosRequestConfig;
} & (
  | {
      useCache: true;
      storage: "localstorage" | "sessionstorage";
      cacheKey: string;
      revalidate: number;
    }
  | {
      useCache: false;
    }
);

type SetLocalStorageProps = {
  key?: string;
  data: unknown;
  revalidate: number;
};

type LocalStorageItemType<DataType> = {
  expiresIn: Date;
  data: DataType;
};


type EntityConstructorProps = {
  baseUrl: string;
  cachePath: string;
};

export type GetCacheType = {
  cachePath?: string | null
}

export type SetCacheProps<Attributes> = {
  shouldUpdate: boolean;
  key?: string | null;
  value: Attributes;
}

export type GetHttpAndSetCacheProps<HttpResponse> = {
  customReturn?: keyof HttpResponse | null;
  url?: string | null;
  cachePath?: string | null;
  shouldUpdate: boolean;
  method?: string | null;
}

export type GetHttpRequestParams<AllowedMethods> = {
  method?: keyof AllowedMethods | '';
  url?: string | null;
  config?: RequestInit & {
    params?: Record<string, any>
  } | null;
}

export type PostHttpRequestParams<AllowedMethods> = {
  method?: keyof AllowedMethods | '';
  body?: Record<string, any> | null;
  url?: string;
  config?: Partial<RequestInit>;
}

export type PutHttpRequestParams<AllowedMethods> = {
  method?: keyof AllowedMethods | '';
  body?: Record<string, any> | null;
  url?: string;
  config?: Partial<RequestInit>;
}


export type CustomRequestRespose = {
  url: string;
  cachePath: string
}

export type MakeUrlParams = {
  method?: string | null;
  url?: string | null;
}

export type MergeConfigurationsParams = {
  configuration: RequestInit;
  config?: Partial<RequestInit> | null; 
}

export type FetchProps<DefaultEndPoints> = {
  overrideBaseUrl: string;
  endpoint?: keyof DefaultEndPoints | string | null;
  config?: AxiosRequestConfig;
}