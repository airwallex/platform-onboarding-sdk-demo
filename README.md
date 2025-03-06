# Airwallex Components SDK sample code

This project is to demonstrate how [Airwallex Components SDK](https://www.npmjs.com/package/@airwallex/components-sdk?activeTab=readme) can be integrated with different web frameworks. 

- [React](/integrations/client/react)

Also check out the demo sites:
[kyc](https://static-demo.airwallex.com/widgets/sdk-live/onboarding/demo), [kycRfi](https://static-demo.airwallex.com/widgets/sdk-live/kycRfi/demo), [transactionRfi](https://static-demo.airwallex.com/widgets/sdk-live/transactionRfi/demo), [paymentsKyb](https://static-demo.airwallex.com/widgets/sdk-live/kyb/demo)

## 1. Update `.env`
```env
API_ENV=staging | demo | prod
CLIENT_ID=your_client_id
CLIENT_API_KEY=your_api_key
CONNECTED_ACCOUNT_ID=your_connected_account_id
```
CONNECTED_ACCOUNT_ID is optional for kyc but required for other types of element.

## 2. Start Service
Update the scopes you need in [ClientApi.ts](/integrations/service/node/service/clientApi.ts#L59) based on the element you want to use.


In `integrations/service/node`, run

```bash
yarn
yarn start
```

The server will be running on http://localhost:3000

## 3. Start Client
Go to one of the samples in `integrations/client`, and follow the doc in the specific client integration to continue.
