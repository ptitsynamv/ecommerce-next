import { ApiHooks } from './hooks';

export type APIFetcherOptions = {
  query: string;
  variables?: Variables;
};

export type Variables = { [key: string]: string | any | undefined };

export type APIFetcherResults<T> = { data: T };

export interface APIConfig {
  fetch<T>(options: APIFetcherOptions): Promise<APIFetcherResults<T>>;
  checkoutCookie: string;
}

export type ApiFetcher<T = any> = (
  options: APIFetcherOptions
) => Promise<APIFetcherResults<T>>;

export interface ApiProviderContext {
  hooks: ApiHooks;
  fetcher: ApiFetcher;
  checkoutCookie: string;
}
