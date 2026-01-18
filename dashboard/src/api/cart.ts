// cart api (stub - not actively used)
import useSWR from 'swr';
import { useMemo } from 'react';

export const endpoints = {
  key: 'api/cart'
};

export function useGetCart() {
  const { data, isLoading } = useSWR(endpoints.key, () => ({ checkout: { products: [] }, products: [] }), {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  const memoizedValue = useMemo(
    () => ({
      cart: data,
      cartLoading: isLoading
    }),
    [data, isLoading]
  );

  return memoizedValue;
}

export function addToCart(product: any, quantity: any) {
  // Stub implementation
  console.log('Add to cart:', product, quantity);
}
