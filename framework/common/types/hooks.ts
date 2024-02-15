import { APIFetcherOptions, ApiFetcher } from './api';

export interface ApiHooks {
  cart: {
    useAddItem: MutationHook;
    useCart: any;
  };
}

export type MutationHookContext = {
  fetch: (input: any) => any;
};

export type FetcherHookContext = {
  input?: any;
  fetch: ApiFetcher;
  options: APIFetcherOptions;
};

export type MutationHook = {
  fetcherOptions: APIFetcherOptions;
  fetcher: (context: FetcherHookContext) => any;
  useHook(context: MutationHookContext): (input: any) => any;
};
