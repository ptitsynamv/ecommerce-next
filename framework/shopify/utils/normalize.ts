import { Product, ProductImage, ProductPrice } from '@common/types/product';
import { ImageEdge, MoneyV2, Product as ShopifyProduct } from '../schema';

function normalizeProductImage({
  edges,
}: {
  edges: ImageEdge[];
}): ProductImage[] {
  return edges.map(({ node: { originalSrc: url, ...rest } }) => {
    return { url: `/images/${url}`, ...rest };
  });
}

function normalizeProductPrice({
  currencyCode,
  amount,
}: MoneyV2): ProductPrice {
  return { value: +amount, currencyCode };
}

export function normalizeProduct(productNode: ShopifyProduct): Product {
  const {
    id,
    title: name,
    handle,
    vendor,
    description,
    images: imageCollection,
    priceRange,
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
    price: normalizeProductPrice(priceRange.minVariantPrice),
    ...rest,
  };

  return product;
}
