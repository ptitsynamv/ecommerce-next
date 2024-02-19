import { Checkout, Maybe } from '@framework/schema';
import { normalizeCart } from '.';

const checkoutToCart = (checkout?: Maybe<Checkout>) => {
  if (!checkout) {
    throw new Error('Missing checkout');
  }

  return normalizeCart(checkout);
};

export default checkoutToCart;
