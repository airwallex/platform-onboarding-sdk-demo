import express from 'express';
import router from './router';
import * as dotenv from 'dotenv';

dotenv.config({ path: '../../../.env' });

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
