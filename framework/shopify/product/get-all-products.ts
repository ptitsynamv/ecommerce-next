import { Product } from '@/framework/common/types/product';
import {
  fetchApi,
  normalizeProduct,
  getAllProductsQuery,
} from '@framework/utils';
import { ProductConnection } from '@framework/schema';

const getAllProducts = async (): Promise<Product[]> => {
  const { data } = await fetchApi<{ products: ProductConnection }>({
    query: getAllProductsQuery,
  });

  return data.products.edges.map((edge) => normalizeProduct(edge.node)) ?? [];
};

export default getAllProducts;
