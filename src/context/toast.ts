import { createContext } from "react";

export interface ToastContext {
  isOpen: boolean;
  show: () => void;
}


export const ToastContext = createContext<ToastContext>({
  isOpen: false,
  show: () => {},
})