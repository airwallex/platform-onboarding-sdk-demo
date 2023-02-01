import * as path from 'path';
import * as dotenv from 'dotenv';

import express from 'express';
import router from './router';

dotenv.config({ path: path.resolve('../../../.env') });

const app = express();
const port = 3000;

app.use(express.json());

app.use('/demo', router);

app.get('/', (req, res) => {
  res.send('healthy!');
});

app.listen(port, () => {
  console.log(`Service listening on port ${port}`);
});
