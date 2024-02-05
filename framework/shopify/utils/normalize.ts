import { Product, ProductImage } from '@common/types/product';
import { ImageEdge, Product as ShopifyProduct } from '../schema';

function normalizeProductImage({
  edges,
}: {
  edges: ImageEdge[];
}): ProductImage[] {
  return edges.map(({ node: { originalSrc: url, ...rest } }) => {
    return { url: `/images/${url}`, ...rest };
  });
}

export function normalizeProduct(productNode: ShopifyProduct): Product {
  const {
    id,
    title: name,
    handle,
    vendor,
    description,
    images: imageCollection,
    ...rest
  } = productNode;

  const product = {
    id,
    name,
    vendor,
    description,
    path: `/${handle}`,
    slug: handle.replace(/^\/+|\/+$/g, ''),
    images: normalizeProductImage(imageCollection),
    ...rest,
  };

  return product;
}
