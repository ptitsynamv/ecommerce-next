import { APIFetcherOptions, APIFetcherResults } from '@common/types/api';
import { API_URL, STOREFRONT_TOKEN } from '@framework/const';

const fetchApi = async <T>({
  query,
  variables,
}: APIFetcherOptions): Promise<APIFetcherResults<T>> => {
  const response = await fetch(API_URL!, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopity-Storefront-Access-Token': STOREFRONT_TOKEN!,
    },
    body: JSON.stringify({ query, variables }),
  });
  const { data, errors } = await response.json();

  if (errors) {
    throw new Error(errors[0].message ?? errors.message);
  }
  return { data };
};

export default fetchApi;
