import { useApiProvider } from '@common';
import { ApiFetcher } from '@common/types/api';
import { ApiHooks, MutationHook } from '@common/types/hooks';
import useSWR from 'swr';

export const useHook = (fn: (apiHooks: ApiHooks) => MutationHook) => {
  const { hooks } = useApiProvider();
  return fn(hooks);
};

export const useMutationHook = (hook: MutationHook) => {
  const { fetcher } = useApiProvider();

  return hook.useHook({
    fetch: (input: any) => {
      return hook.fetcher({
        input,
        fetch: fetcher,
        options: hook.fetcherOptions,
      });
    },
  });
};

const useData = (hook: any, fetcher: ApiFetcher) => {
  const hookFetcher = async (query: string) => {
    try {
      return await hook.fetcher({
        fetch: fetcher,
        options: { query },
        input: {},
      });
    } catch (e) {
      throw e;
    }
  };

  const response = useSWR(hook.fetchOptions.query, hookFetcher);

  return response;
};

export const useSWRHook = (hook: any) => {
  const { fetcher } = useApiProvider();

  return hook.useHook({
    useData() {
      const data = useData(hook, fetcher);
      return data;
    },
  });
};
