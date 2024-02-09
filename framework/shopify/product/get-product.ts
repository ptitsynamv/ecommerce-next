import { APIConfig, Variables } from '@common/types/api';
import { getProductQuery, normalizeProduct } from '@framework/utils';
import { Product as ShopifyProduct } from '@framework/schema';
import { Product } from '@common/types/product';

type FetchType = {
  productByHandle: ShopifyProduct;
};

type ReturnType = { product: Product | null };

const getProduct = async (options: {
  config: APIConfig;
  variables: Variables;
}): Promise<ReturnType> => {
  const {
    data: { productByHandle },
  } = await options.config.fetch<FetchType>({
    query: getProductQuery,
    url: options.config.apiUrl,
    variables: options.variables,
  });

  return {
    product: productByHandle ? normalizeProduct(productByHandle) : null,
  };
};

export default getProduct;
