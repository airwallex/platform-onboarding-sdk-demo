# AIRWALLEX Platform Onboarding SDK

This is a demo web application to showcase the Airwallex Platform Onboarding SDK with React.

## Development

To run this project locally,

1. Install dependencies
```bash
  yarn
```

2. Replace the client details in `/src/index.tsx`
```js
configureClientApi({
  environment: 'demo',
  clientId: 'your-client-id',
  apiKey: 'your-api-key',
});
```

3. Run the project in development mode with yarn start. Project running at [localhost:3333](localhost:3333)
```bash
  yarn start
```
