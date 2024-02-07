import { Product } from '@/framework/common/types/product';
import { normalizeProduct, getAllProductsQuery } from '@framework/utils';
import { ProductConnection } from '@framework/schema';
import { APIConfig } from '@common/types/api';

const getAllProducts = async (config: APIConfig): Promise<Product[]> => {
  const { data } = await config.fetch<{ products: ProductConnection }>({
    url: config.apiUrl,
    query: getAllProductsQuery,
  });

  return data.products.edges.map((edge) => normalizeProduct(edge.node)) ?? [];
};

export default getAllProducts;
