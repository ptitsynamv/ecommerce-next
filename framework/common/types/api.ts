export type APIFetcherOptions = {
  url: string;
  query: string;
  variables?: Variables;
};

export type Variables = { [key: string]: string | undefined };

export type APIFetcherResults<T> = { data: T };

export interface APIConfig {
  apiUrl: string;
  fetch: ApiFetcher;
}

export interface ApiHooks {
  cart: {
    useAddItem: any;
  };
}

export type ApiFetcher<T = any> = (
  options: APIFetcherOptions
) => Promise<APIFetcherResults<T>>;

export interface ApiProviderContext {
  hooks: ApiHooks;
  fetcher: ApiFetcher;
}
