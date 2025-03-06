import axios from "axios";
import { generateAccountData } from "../utils";

import * as path from "path";
import * as dotenv from "dotenv";

dotenv.config({ path: path.resolve("../../../.env") });

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_ENV: "staging" | "demo" | "prod";
    }
  }
}

const CLIENT_API_HOST = {
  staging: "https://api-staging.airwallex.com/api/v1",
  demo: "https://api-demo.airwallex.com/api/v1",
  prod: "https://api.airwallex.com/api/v1",
};

const clientApi: any = axios.create({
  baseURL: CLIENT_API_HOST[process.env.API_ENV],
  headers: {
    "Content-Type": "application/json",
  },
});

export const login = async (
  requestBody: Record<string, any>,
  configs: Record<string, any>
) => {
  const {
    data: { token },
  } = await clientApi.post("/authentication/login", requestBody, configs);
  return token;
};

/**
 * Please refer to the api document for more details when creating new account: https://www.airwallex.com/docs/api#/Scale/Accounts/_api_v1_accounts_create/post
 */
export const createBusinessAccount = async (configs: Record<string, any>) => {
  const {
    data: { id },
  } = await clientApi.post("/accounts/create", generateAccountData(), configs);
  return id;
};

export const authorizeConnectedAccount = async (
  accountId: string,
  codeChallenge: Record<string, any>,
  configs: Record<string, any>
) => {
  return clientApi.post(
    "/authentication/authorize",
    {
      scope: [
        "w:awx_action:onboarding", // kyc
        "r:awx_action:rfi_view", // rfi
        "w:awx_action:rfi_edit", // rfi
        "w:awx_action:kyb", // paymentsKyb
      ],
      code_challenge: codeChallenge,
    },
    {
      ...configs,
      headers: {
        ...configs.headers,
        "x-on-behalf-of": accountId,
      },
    }
  );
};
