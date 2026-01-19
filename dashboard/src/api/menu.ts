// menu api
import useSWR, { mutate } from 'swr';
import { useMemo } from 'react';

const initialState = {
  openItem: ['dashboard'],
  openComponent: 'buttons',
  drawerOpen: false,
  componentDrawerOpen: true,
  isDashboardDrawerOpened: false
};

export const endpoints = {
  key: 'api/menu',
  master: 'master',
  dashboard: '/dashboard' // server URL
};

export function useGetMenuMaster() {
  const { data, isLoading } = useSWR(endpoints.key + endpoints.master, () => initialState, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  const memoizedValue = useMemo(
    () => ({
      menuMaster: data,
      menuMasterLoading: isLoading
    }),
    [data, isLoading]
  );

  return memoizedValue;
}

export function handlerDrawerOpen(isDashboardDrawerOpened: boolean) {
  mutate(
    endpoints.key + endpoints.master,
    (currentMenuMaster: any) => {
      return { ...currentMenuMaster, drawerOpen: isDashboardDrawerOpened, isDashboardDrawerOpened };
    },
    false
  );
}

export function handlerActiveItem(openItem: string[]) {
  mutate(
    endpoints.key + endpoints.master,
    (currentMenuMaster: any) => {
      return { ...currentMenuMaster, openItem };
    },
    false
  );
}

export function useGetMenu() {
  const { data, isLoading } = useSWR(endpoints.key + endpoints.dashboard, () => ({}), {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  const memoizedValue = useMemo(
    () => ({
      menu: data,
      menuLoading: isLoading
    }),
    [data, isLoading]
  );

  return memoizedValue;
}
