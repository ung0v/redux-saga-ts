import { createContext } from 'react';

export interface ToastContext {
  isOpen: boolean;
  show: (message?: string) => void;
  hide: () => void;
}

export const ToastContext = createContext<ToastContext>({
  isOpen: false,
  show: () => {},
  hide: () => {},
});
