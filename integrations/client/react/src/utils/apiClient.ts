import axios from 'axios';

const clientApi = axios.create({
  baseURL: '/demo',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getAuthCode = async (codeChallenge: string): Promise<string> => {
  const { data: authResponse } = await clientApi.post('/getAuthCode', { codeChallenge });
  return authResponse;
};
