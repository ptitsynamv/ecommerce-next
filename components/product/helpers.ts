import { Product } from '@common/types/product';

type AvailableChoices = 'color' | 'size' | string;

export type Choices = {
  [P in AvailableChoices]: string;
};

export const getVariant = (product: Product, choices: Choices) => {
  return product.variants.find((variant) => {
    return variant.options.every((variantOption) => {
      const optionName = variantOption.displayName.toLowerCase();
      if (optionName in choices) {
        return choices[optionName] === variantOption.values[0].label;
      }
      return false;
    });
  });
};
