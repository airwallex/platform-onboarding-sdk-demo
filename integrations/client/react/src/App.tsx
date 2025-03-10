import React, { useEffect, useState } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import Onboarding from './pages/Onboarding';
import { KycRfi, TransactionRfi, PaymentEnablementRfi } from './pages/RFI';
import PaymentsKyb from './pages/PaymentsKyb';
import OnboardingSuccess from './pages/OnboardingSuccess';
import { generateCodeVerifier, generateCodeChallengeFromVerifier } from './utils';
import { init } from '@airwallex/components-sdk';
import { getAuthCode } from './utils/apiClient';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import { useNotification } from './utils/useNotification';

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [initialized, setInitialized] = useState(false);

  const [NotificationComponent, { setToastMessage, setToastOpen }] = useNotification();

  useEffect(() => {
    const initializeSDK = async () => {
      const codeVerifier = generateCodeVerifier();
      const codeChallenge = await generateCodeChallengeFromVerifier(codeVerifier);
      const authCode = await getAuthCode(codeChallenge);
      try {
        // initialize AirwallexOnboarding instance on window
        await init({
          authCode,
          codeVerifier,
          env: process.env.API_ENV as 'prod',
          clientId: process.env.CLIENT_ID as string,
          enabledElements: ['kyc', 'kycRfi', 'transactionRfi', 'paymentEnablementRfi', 'paymentsKyb'],
        });
        setInitialized(true);
      } catch (e) {
        console.error(e);
        setToastOpen(true);
        setToastMessage('SDK failed to initialize!');
      }
      setLoading(false);
    };

    initializeSDK();
  }, []);

  if (!initialized) {
    return (
      <Stack spacing={2}>
        {loading && (
          <>
            <Typography variant="h4" sx={{ textAlign: 'center' }}>
              initializing SDK...
            </Typography>
            <LinearProgress color="primary" />
          </>
        )}
        <NotificationComponent />
      </Stack>
    );
  }

  return (
    <Switch>
      <Route path="/">
        <ul>
          <li>
            <Link to="/kyc">KYC Demo</Link>
          </li>
          <li>
            <Link to="/kycRfi">KYC RFI Demo</Link>
          </li>
          <li>
            <Link to="/transactionRfi">Transaction RFI Demo</Link>
          </li>
          <li>
            <Link to="/paymentEnablementRfi">Payment Enablement RFI Demo</Link>
          </li>
          <li>
            <Link to="/paymentsKyb">Payments KYB Demo</Link>
          </li>
        </ul>
        <Route exact={true} path="/success" component={OnboardingSuccess} />
        <Route exact={true} path="/kyc" component={Onboarding} />
        <Route exact={true} path="/kycRfi" component={KycRfi} />
        <Route exact={true} path="/transactionRfi" component={TransactionRfi} />
        <Route exact={true} path="/paymentEnablementRfi" component={PaymentEnablementRfi} />
        <Route exact={true} path="/paymentsKyb" component={PaymentsKyb} />
      </Route>
    </Switch>
  );
};

export default App;
