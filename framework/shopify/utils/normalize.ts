import { Product, ProductImage, ProductPrice } from '@common/types/product';
import {
  ImageEdge,
  MoneyV2,
  ProductOption,
  ProductVariantConnection,
  SelectedOption,
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

function normalizeProductVariants({ edges }: ProductVariantConnection) {
  return edges.map(({ node }) => {
    const { id, selectedOptions, sku, title, priceV2, compareAtPriceV2 } = node;
    return {
      id,
      name: title,
      sku: sku || id,
      price: +priceV2.amount,
      listPrice: +compareAtPriceV2?.amount,
      requiresShipping: true,
      options: selectedOptions.map(({ name, value }: SelectedOption) => {
        const option = normalizeProductOption({ id, name, values: [value] });
        return option;
      }),
    };
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
    priceRange,
    options,
    variants,
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
    variants: variants ? normalizeProductVariants(variants) : [],
    ...rest,
  };

  return product;
}
