import { Products } from 'types';

const products: Record<Products, string> = {
  signature: 'Assinatura',
};

const translateProductName = (name: Products) => products[name];

export { translateProductName };
