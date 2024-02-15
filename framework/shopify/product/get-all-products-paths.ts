import { APIConfig } from '@common/types/api';
import { Product } from '@common/types/product';
import { ProductConnection } from '@framework/schema';
import { getAllProductsPathsQuery } from '@framework/utils/queries';

type ReturnType = {
  products: Pick<Product, 'slug'>[];
};

const getAllProductsPaths = async (config: APIConfig): Promise<ReturnType> => {
  const { data } = await config.fetch<{ products: ProductConnection }>({
    query: getAllProductsPathsQuery,
  });

  const products = data.products.edges.map(({ node: { handle } }) => ({
    slug: handle,
  }));
  return { products };
};

export default getAllProductsPaths;
