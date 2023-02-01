import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import { init, createElement, AirwallexEnv } from '@airwallex/platform-onboarding-sdk';
import type { Element, ElementType } from '@airwallex/platform-onboarding-sdk';

import { getAuthCode } from '../../utils/apiClient';
import { generateCodeVerifier, generateCodeChallengeFromVerifier } from '../../utils';

type Handler = (event: any) => void;

const ELEMENT_TYPE: ElementType = 'kyc';

const Onboarding: React.FC = () => {
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(true);
  const [toastOpen, setToastOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');

  const onToastClose = () => {
    setToastOpen(false);
  };

  const handleCancel: Handler = () => {
    window.alert('Cancel');
  };

  const handleSuccess: Handler = () => {
    history.push('/success');
  };

  const handleError: Handler = () => {
    setToastMessage('Oops, something is wrong');
    setToastOpen(true);
  };

  const handleReady: Handler = (event) => {
    if (event.type === 'consent') {
      setLoading(false);
    } else {
      if (event.kycStatus !== 'INIT') {
        history.push('/success');
      } else {
        setToastMessage('Your verification process has started!');
        setToastOpen(true);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    let element: Element | null;
    const fetchAuthCode = async () => {
      const codeVerifier = generateCodeVerifier();
      const codeChallenge = await generateCodeChallengeFromVerifier(codeVerifier);
      const authCode = await getAuthCode(codeChallenge);
      try {
        // initialize AirwallexOnboarding instance on window
        await init({
          authCode,
          codeVerifier,
          env: process.env.API_ENV as AirwallexEnv,
          clientId: process.env.CLIENT_ID as string,
        });

        // create onboarding element
        element = createElement(ELEMENT_TYPE, {
          hideHeader: true,
          hideNav: true,
        });

        // append to DOM
        await element?.mount('onboarding');

        // subscribe element events
        element?.on('ready', (event: any) => {
          if (handleReady) {
            handleReady(event);
          }
        });
        element?.on('cancel', (event: any) => {
          if (handleCancel) {
            handleCancel(event);
          }
        });
        element?.on('success', (event: any) => {
          if (handleSuccess) {
            handleSuccess(event);
          }
        });
        element?.on('error', (event: any) => {
          handleError(event);
        });
      } catch (e) {
        console.error(e);
      }
    };
    fetchAuthCode();
    return () => {
      element?.destroy();
    };
  }, []);

  return (
    <>
      <div style={{ height: '100vh', display: loading ? 'none' : 'block' }} id="onboarding" />
      {loading ? (
        <Stack spacing={2}>
          <Typography variant="h4" sx={{ textAlign: 'center' }}>
            KYC flow is loading...
          </Typography>
          <LinearProgress color="primary" />
        </Stack>
      ) : null}
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        autoHideDuration={2000}
        open={toastOpen}
        message={toastMessage}
        onClose={onToastClose}
      />
    </>
  );
};

export default Onboarding;
