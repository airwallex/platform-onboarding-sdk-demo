import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { configureClientApi } from './utils/apiClient';

/**
 * PLEASE NOTE:
 * All the requests related to authorization should be implemented on server side.
 * The authorization apis used in this project are only for demonstration.
 */
configureClientApi({
  environment: 'demo',
  clientId: 'your-client-id',
  apiKey: 'your-api-key',
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
