import React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const OnboardingSuccess = () => {
  return (
    <>
      <Alert severity="success">
        <AlertTitle>Submitted!</AlertTitle>
        This is a sample success page!
      </Alert>
    </>
  );
};

export default OnboardingSuccess;
