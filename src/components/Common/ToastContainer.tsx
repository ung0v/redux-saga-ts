import { ToastContext } from 'context/toast';
import * as React from 'react';
import Toast from './Toast';

export interface ToastContainerProps {
  children: React.ReactNode;
}

export default function ToastContainer({ children }: ToastContainerProps) {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>('');

  const hide = () => {
    setIsOpen(false);
    message && setMessage('');
  };

  const show = (message?: string) => {
    setIsOpen(true);
    message && setMessage(message);
  };

  return (
    <ToastContext.Provider
      value={{
        isOpen,
        show,
        hide,
      }}
    >
      {children}
      <Toast isOpen={isOpen} handleClose={hide} message={message} />
    </ToastContext.Provider>
  );
}
