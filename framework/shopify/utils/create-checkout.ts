import { ApiFetcher } from '@common/types/api';
import { checkoutCreateMutation } from './mutations';
import { Checkout, CheckoutCreatePayload, Maybe } from '@framework/schema';
import Cookies from 'js-cookie';
import {
  SHOPIFY_CHECKOUT_URL_COOKIE,
  SHOPIFY_COOKIE_EXPIRE,
  SHOPITY_CHECKOUT_ID_COOKIE,
} from '@framework/const';

const createCheckout = async (
  fetch: ApiFetcher<{ checkoutCreate: CheckoutCreatePayload }>
): Promise<Maybe<Checkout | undefined>> => {
  const { data } = await fetch({
    query: checkoutCreateMutation,
  });

  const { checkout } = data.checkoutCreate;
  const checkoutId = checkout?.id;

  if (checkoutId) {
    const options = {
      expires: SHOPIFY_COOKIE_EXPIRE,
    };

    Cookies.set(SHOPITY_CHECKOUT_ID_COOKIE, checkoutId, options);
    Cookies.set(SHOPIFY_CHECKOUT_URL_COOKIE, checkout?.webUrl, options);
  }

  return checkout;
};

export default createCheckout;
