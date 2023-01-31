# Airwallex Platform Onboarding SDK Demo

This project is to demonstrate how [Airwallex platform onboarding SDK](https://www.npmjs.com/package/@airwallex/platform-onboarding-sdk?activeTab=readme) can be integrated with different web frameworks. 

- [React](/integrations/client/react)

Also, check out [the demo site for `@airwallex/platform-onboarding-sdk`](https://static-demo.airwallex.com/widgets/sdk-live/onboarding/demo).

## 1. Update `.env`
```env
API_ENV=staging | demo | prod
CLIENT_ID=your_client_id
CLIENT_API_KEY=your_api_key
```


## 2. Start Service
In `integrations/service/node`, run

```bash
yarn
yarn start
```

The server will be running on http://localhost:3000

## 3. Start Client
Go to one of the samples in `integrations/client`, and follow the doc in the specific client integration to continue.
