import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';

export const useNotification = () => {
  const [toastOpen, setToastOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');

  const NotificationComponent = () => {
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        autoHideDuration={2000}
        open={toastOpen}
        message={toastMessage}
        onClose={() => setToastOpen(false)}
      />
    );
  };

  return [
    NotificationComponent,
    {
      setToastOpen,
      setToastMessage,
    },
  ] as const;
};
