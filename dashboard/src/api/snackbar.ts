// snackbar api
import useSWR, { mutate } from 'swr';
import { useMemo } from 'react';

export const endpoints = {
  key: 'api/snackbar'
};

export interface SnackbarProps {
  action: boolean;
  open: boolean;
  message: string;
  anchorOrigin: {
    vertical: 'top' | 'bottom';
    horizontal: 'left' | 'center' | 'right';
  };
  variant: 'default' | 'alert' | 'error' | 'success' | 'warning' | 'info';
  alert: {
    color: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
    variant: 'filled' | 'outlined';
    sx?: any;
  };
  transition: 'Fade' | 'Grow' | 'SlideLeft' | 'SlideUp' | 'SlideRight' | 'SlideDown';
  close: boolean;
  actionButton: boolean;
  maxStack?: number;
  dense?: boolean;
  iconVariant?: 'useemojis' | 'hide' | 'default';
}

const initialState: SnackbarProps = {
  action: false,
  open: false,
  message: 'Note archived',
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'right'
  },
  variant: 'default',
  alert: {
    color: 'primary',
    variant: 'filled'
  },
  transition: 'Fade',
  close: true,
  actionButton: false,
  maxStack: 3,
  dense: false,
  iconVariant: 'default'
};

export function useGetSnackbar() {
  const { data, isLoading } = useSWR(endpoints.key, () => initialState, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  const memoizedValue = useMemo(
    () => ({
      snackbar: data,
      snackbarLoading: isLoading
    }),
    [data, isLoading]
  );

  return memoizedValue;
}

export function openSnackbar(options: any) {
  mutate(
    endpoints.key,
    (currentSnackbar: any) => {
      return { ...currentSnackbar, open: true, ...options };
    },
    false
  );
}

export function closeSnackbar() {
  mutate(
    endpoints.key,
    (currentSnackbar: any) => {
      return { ...currentSnackbar, open: false };
    },
    false
  );
}
