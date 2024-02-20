import { useCart, useRemoveItem } from '@common/cart';
import { Cart } from '@common/types/cart';
import { MutationHook } from '@common/types/hooks';
import { CheckoutLineItemsRemovePayload } from '@framework/schema';
import { checkoutToCart, getCheckoutId } from '@framework/utils';
import { checkoutLineItemRemoveMutation } from '@framework/utils/mutations';

export default useRemoveItem;

export type RemoveItemDescriptor = {
  fetcherInput: {
    id: string;
  };
  fetcherOutput: {
    checkoutLineItemsRemove: CheckoutLineItemsRemovePayload;
  };
  data: Cart;
};

export const handler: MutationHook<RemoveItemDescriptor> = {
  fetcherOptions: {
    query: checkoutLineItemRemoveMutation,
  },
  async fetcher({ input: { id }, options, fetch }) {
    const { data } = await fetch({
      ...options,
      variables: { checkoutId: getCheckoutId(), lineItemIds: [id] },
    });

    const cart = checkoutToCart(data.checkoutLineItemsRemove.checkout);
    return cart;
  },
  useHook:
    ({ fetch }) =>
    () => {
      const { mutate: updateCart } = useCart();

      return async (input) => {
        const data = await fetch(input);
        await updateCart(data);
        return data;
      };
    },
};
