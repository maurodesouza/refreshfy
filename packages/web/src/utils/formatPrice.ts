const formatPrice = (value: number) =>
  Intl.NumberFormat('pt-BR', {
    currency: 'BRL',
    style: 'currency',
  }).format(value);

export { formatPrice };
