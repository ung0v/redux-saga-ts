import React, { ReactNode, useState } from "react"
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';



function Toast = ({ message, ...toastProps}: ToastProps): ReactNode => {
  return <div></div>
}


export const useToast = () => {
  const [isOpen, setIsOpen] = useState<boolean>();

  return  1;

}