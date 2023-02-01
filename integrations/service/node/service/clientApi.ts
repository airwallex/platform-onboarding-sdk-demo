import axios from 'axios';
import { generateAccountData } from '../utils';

import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: path.resolve('../../../.env') });

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_ENV: 'staging' | 'demo' | 'prod'
    }
  }
}

const CLIENT_API_HOST = {
  staging: 'https://api-staging.airwallex.com/api/v1',
  demo: 'https://api-demo.airwallex.com/api/v1',
  prod: 'https://api.airwallex.com/api/v1',
};

const clientApi: any = axios.create({
  baseURL: CLIENT_API_HOST[process.env.API_ENV],
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = async (requestBody: Record<string, any>, configs: Record<string, any>) => {
  const { data: { token } } = await clientApi.post('/authentication/login', requestBody, configs);
  return token;
};

export const createBusinessAccount = async (configs: Record<string, any>) => {
  const { data: { id } } = await clientApi.post('/accounts/create', generateAccountData(), configs);
  return id;
};

export const authorizeConnectedAccount = async (accountId: string, codeChallenge: Record<string, any>, configs: Record<string, any>) => {
  return clientApi.post(
    `/accounts/${accountId}/authorize`,
    {
      scope: ['w:awx_action:onboarding'],
      code_challenge: codeChallenge,
    },
    configs,
  );
};

export const authorize = async (codeChallenge: string, configs: Record<string, any>) => {
  return clientApi.post(
    '/account/authorize',
    {
      scope: ['w:awx_action:onboarding'],
      code_challenge: codeChallenge,
    },
    configs,
  );
};
