import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import { createElement } from '@airwallex/components-sdk';
import type { ElementTypes } from '@airwallex/components-sdk';
import { useNotification } from '../../utils/useNotification';

type Handler = (event?: any) => void;

const Onboarding: React.FC = () => {
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(true);

  const [NotificationComponent, { setToastMessage, setToastOpen }] = useNotification();

  const handleCancel: Handler = () => {
    window.alert('Cancel');
  };

  const handleSuccess: Handler = () => {
    history.push('/success');
  };

  const handleError: Handler = (event) => {
    setToastMessage(`Oops, something is wrong: ${event?.message}`);
    setToastOpen(true);
  };

  const handleReady: Handler = () => {
    setToastMessage('Your RFI process has started!');
    setToastOpen(true);
    setLoading(false);
  };

  useEffect(() => {
    let element: ElementTypes['kycRfi'] | null;

    const mountKycRfiElement = async () => {
      // create onboarding element
      element = await createElement('kycRfi', {
        hideHeader: true,
        hideNav: true,
      });

      // append to DOM
      await element?.mount('kyc-rfi');

      // subscribe element events
      element?.on('ready', (event: any) => {
        handleReady(event);
      });
      element?.on('cancel', (event: any) => {
        handleCancel(event);
      });
      element?.on('success', () => {
        handleSuccess();
      });
      element?.on('error', (event: any) => {
        handleError(event);
      });
    };

    mountKycRfiElement();

    return () => element?.destroy();
  }, []);

  return (
    <>
      <div style={{ height: '100vh', display: loading ? 'none' : 'block' }} id="kyc-rfi" />
      {loading && (
        <Stack spacing={2}>
          <Typography variant="h4" sx={{ textAlign: 'center' }}>
            KYC RFI is loading...
          </Typography>
          <LinearProgress color="primary" />
        </Stack>
      )}
      <NotificationComponent />
    </>
  );
};

export default Onboarding;
