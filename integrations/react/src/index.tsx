import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { configureClientApi } from './utils/apiClient';

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
