import { SHOPIFY_CHECKOUT_ID_COOKIE } from '@framework/const';
import Cookies from 'js-cookie';

const getCheckoutId = () => {
  return Cookies.get(SHOPIFY_CHECKOUT_ID_COOKIE);
};

export default getCheckoutId;
