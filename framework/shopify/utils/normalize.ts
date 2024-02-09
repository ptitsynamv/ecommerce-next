import { Product, ProductImage, ProductPrice } from '@common/types/product';
import {
  ImageEdge,
  MoneyV2,
  ProductOption,
  Product as ShopifyProduct,
} from '../schema';

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

function normalizeProductOption({
  id,
  values,
  name: displayName,
}: ProductOption) {
  const normalized = {
    id,
    displayName,
    values: values.map((value) => {
      let output: any = {
        label: value,
      };
      if (displayName.match(/colou?r/gi)) {
        output = { ...output, hexColor: value };
      }

      return output;
    }),
  };
  return normalized;
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
    options,
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
    options: options
      ? options
          .filter((option) => option.name !== 'Title')
          .map((option) => normalizeProductOption(option))
      : [],
    ...rest,
  };

  return product;
}
