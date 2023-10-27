import express from 'express';
import { login, createBusinessAccount, authorizeConnectedAccount } from './service/clientApi';

const router = express.Router();

router.post('/getAuthCode', async (req, res, next) => {
  try {
    const { codeChallenge } = req.body;
    const token = await login(
      {},
      {
        headers: {
          'x-client-id': process.env.CLIENT_ID,
          'x-api-key': process.env.CLIENT_API_KEY,
          'Content-Type': 'application/json',
        },
      },
    );
    const configs = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    const accountId = await createBusinessAccount(configs);
    const { data: authResponse } = await authorizeConnectedAccount(accountId, codeChallenge, configs);
    res.send(authResponse.authorization_code);
  } catch (e) {
    next(e);
  }
});

export default router;
