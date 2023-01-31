import React from 'react';
import { Link } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const OnboardingSuccess = () => {
  return (
    <>
      <Alert severity="success">
        <AlertTitle>Submitted!</AlertTitle>
        Your account verification has been submitted. <Link to="/">Click Here to go back to Shipment Options</Link>
      </Alert>
    </>
  );
};

export default OnboardingSuccess;
