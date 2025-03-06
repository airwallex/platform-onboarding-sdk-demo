import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import { createElement } from '@airwallex/components-sdk';
import type { ElementTypes } from '@airwallex/components-sdk';
import { useNotification } from '../../utils/useNotification';

type Handler = (event?: any) => void;

const PaymentsKyb: React.FC = () => {
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(true);

  const [NotificationComponent, { setToastMessage, setToastOpen }] = useNotification();

  const handleCancel: Handler = () => {
    window.alert('Cancel');
  };

  const handleSuccess: Handler = () => {
    setToastMessage('Your account information to start accepting online payments has been submitted.');
    setToastOpen(true);
    history.push('/success');
  };

  const handleError: Handler = () => {
    setLoading(false);
    setToastMessage('Oops, something is wrong');
    setToastOpen(true);
  };

  const handleReserveOptionsOffered: Handler = () => {
    setToastMessage('Approved! Just one more step - select a reserve plan.');
    setToastOpen(true);
  };

  const handleSelectReserve: Handler = () => {
    setToastMessage('Thanks for choosing a reserve option. Payment methods are being activated.');
    setToastOpen(true);
  };

  const handleReady: Handler = (event) => {
    if (event.type === 'consent') {
      setLoading(false);
    } else {
      if (event.kycStatus !== 'INIT') {
        history.push('/success');
      } else {
        setToastMessage('Your Payment KYB process has started!');
        setToastOpen(true);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    let element: ElementTypes['paymentsKyb'] | null;
    const mountKycElement = async () => {
      // create onboarding element
      element = await createElement('paymentsKyb', {
        hideHeader: true,
        hideNav: true,
      });

      // append to DOM
      await element?.mount('kyb');

      // subscribe element events
      element?.on('ready', handleReady);
      element?.on('cancel', handleCancel);
      element?.on('reserveOptionsOffered' as any, handleReserveOptionsOffered);
      element?.on('selectReserve' as any, handleSelectReserve);
      element?.on('success', handleSuccess);
      element?.on('error', handleError);
    };
    mountKycElement();

    return () => element?.destroy();
  }, []);

  return (
    <>
      <div style={{ height: '100vh', display: loading ? 'none' : 'block' }} id="kyb" />
      {loading && (
        <Stack spacing={2}>
          <Typography variant="h4" sx={{ textAlign: 'center' }}>
            Payments KYB flow is loading...
          </Typography>
          <LinearProgress color="primary" />
        </Stack>
      )}
      <NotificationComponent />
    </>
  );
};

export default PaymentsKyb;
