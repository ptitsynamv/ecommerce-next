import { APIFetcherOptions, APIFetcherResults } from '@common/types/api';

const fetchApi = async <T>({
  query,
  url,
  variables,
}: APIFetcherOptions): Promise<APIFetcherResults<T>> => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
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
