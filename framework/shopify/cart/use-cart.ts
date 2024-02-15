import { useCart } from '@common/cart';

export default useCart;

export const handler = {
  fetchOptions: {
    query: '',
  },
  fetcher: () => {
    return {
      data: 'cart is ready',
    };
  },
  useHook: ({ fetch }: any) => {
    const data = fetch();
    return data;
  },
};
