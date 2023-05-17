/**
 */

declare module 'express-session' {
  interface SessionData {
    user: string;
  }
}

import express from 'express';

const someRoute = express.Router();

someRoute.post('/login/session', (req, res) => {
  req.session.user = 'myuser';
  res.end();
});

someRoute.get('/login/user', (req, res) => {
  res.send({ merhaba: 'yalandunya', user: req.session.user ?? null });
});

export { someRoute as didcomm };
