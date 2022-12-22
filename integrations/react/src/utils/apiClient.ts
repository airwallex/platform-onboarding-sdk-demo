import axios from 'axios';
import { generateAccountData } from './utils';

type ClientConfig = {
  environment: 'demo' | 'prod';
  clientId: string;
  apiKey: string;
};

export let clientConfig: ClientConfig = {
  clientId: '',
  apiKey: '',
  environment: 'demo',
};

const CLIENT_API_HOST: Record<'demo' | 'prod', string> = {
  demo: 'https://api-demo.airwallex.com/api/v1',
  prod: 'https://api.airwallex.com/api/v1',
};

const clientApi = axios.create({
  baseURL: '/',
  headers: {
    'Content-Type': 'application/json',
  },
});

let clientApiKey: string;

export type ResponseData = { data: any };

export const configureClientApi = (options: ClientConfig): void => {
  const { environment } = options;
  clientApi.defaults.baseURL = (environment && CLIENT_API_HOST[environment]) || '';
  clientConfig = options;
};

export const login = async (): Promise<void> => {
  const resp = await clientApi.post(
    '/authentication/login',
    {},
    {
      headers: {
        'x-client-id': clientConfig.clientId,
        'x-api-key': clientConfig.apiKey,
        'Content-Type': 'application/json',
      },
    },
  );
  clientApiKey = resp.data.token;
};

export const authorizeConnectedAccount = (accountId: string) =>
  clientApi.post(`/accounts/${accountId}/authorize`, {
    scope: 'w:awx_action:hosted_onboarding',
    code_challenge: 'aNggeDw6KT4422DzzGe1RUZC2DJ-cpLi3hM8b7YRFeE',
  });

export const createBusinessAccount = async (): Promise<ResponseData> =>
  await clientApi.post('/accounts/create', generateAccountData());

export const authorize = async (): Promise<ResponseData> =>
  clientApi.post('/account/authorize', {
    scope: 'w:awx_action:hosted_onboarding',
    code_challenge: 'aNggeDw6KT4422DzzGe1RUZC2DJ-cpLi3hM8b7YRFeE',
  });

export const getAuthCode = async (): Promise<string> => {
  await login();
  const { data: accountResponse } = await createBusinessAccount();
  const { data: authResponse } = await authorizeConnectedAccount(accountResponse.id);
  return authResponse.authorization_code as string;
};

clientApi.interceptors.request.use((request) => {
  if (!request.url?.includes('authentication')) {
    if (request.headers) {
      request.headers['Authorization'] = `Bearer ${clientApiKey}`;
    }
  }

  return request;
});
