import 'dotenv/config';

import path, { dirname } from 'path';

import { connectToDb } from './db/helpers.js';
import cors from 'cors';
import errorHandler from './lib/errorHandler.js';
import express from 'express';
import { fileURLToPath } from 'url';
import logger from './lib/logger.js';
import { port } from './config/environment.js';
import router from './config/router.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/', logger);
app.use('/', router);
app.use(errorHandler);

// CONNECTING FRONT & BACK (for later :) )
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// app.use(express.static(path.join(__dirname, 'client', 'build')))
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
// })

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

async function startSever() {
  try {
    await connectToDb();
    console.log('🍞 Database connected');
    app.listen(port, () => console.log(`🥖 Listening on Port: ${port}`));
  } catch (err) {
    console.log('🥯 Oh no something went wrong');
    console.log(err);
  }
}

startSever();
