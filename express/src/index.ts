/**
 * Type'li express
 */

import express, { Express } from 'express';
import { myErrorHandler, myLogger } from './middlewares/middlewares';
import { myPromisePgHandler } from './handlers/promise-pg';

const app: Express = express();
const PORT = 3000;

app.use(myLogger);

/**
 * app.get(path, callback [, callback ...])
 * A middleware function.
 * A series of middleware functions (separated by commas).
 * An array of middleware functions.
 * A combination of all of the above.
 */

//? route'leri baska bir module de tanimlasam nasil tanimlarim?
app.get('/promise', myPromisePgHandler);

// You define error-handling middleware last, after other app.use() and routes calls; for example:
app.use(myErrorHandler);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
