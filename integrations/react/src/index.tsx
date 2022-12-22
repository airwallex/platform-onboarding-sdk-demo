import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { configureClientApi } from './utils/apiClient';

configureClientApi({
  environment: 'demo',
  clientId: 'yKR2QJtTSUKixkGCkhcfaw',
  apiKey: '8ac2253a1e3dd71788345fe77d206a62d992a18cf1903553aa4531651e5880e75c4d1725ad6e3bda4c042b8497f2c9f2',
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
