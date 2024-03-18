// Common
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import cors from 'cors';

import main from './src/routes/index.js';
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());
main(app);

const port = process.env.PORT || 1221;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
