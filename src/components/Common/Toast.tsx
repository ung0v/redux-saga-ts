import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

interface ToastProps {
  isOpen: boolean;
  message: string;
  handleClose: () => void;
  handleUndo?: () => void;
}

export default function Toast({ isOpen, handleClose, handleUndo, message }: ToastProps) {
  const action = (
    <React.Fragment>
      {handleUndo && (
        <Button color="secondary" size="small" onClick={handleUndo}>
          UNDO
        </Button>
      )}
      <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={6000}
      onClose={handleClose}
      message={message}
      action={action}
    />
  );
}
