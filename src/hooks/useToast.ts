import { useState } from 'react';

export const useToast = () => {
  const [isOpen, setIsOpen] = useState<boolean>();

  function show() {
    setIsOpen(true);
  }
  function hide() {
    setIsOpen(false);
  }

  return { isOpen, show, hide };
};
