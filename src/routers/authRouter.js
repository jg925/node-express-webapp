const express = require('express');
const debug = require('debug')('app:authRouter');
const { MongoClient } = require('mongodb');
const passport = require('passport');

const authRouter = express.Router();

authRouter.route('/signUp').post((req, res) => {
  const { username, password } = req.body;
  const url =
    'mongodb+srv://dbUser:u63gIYL1Ig3MEU15@globomantics.rbrms.mongodb.net?retryWrites=true&w=majority';
  // const url = 'mongodb://localhost:27017';
  const dbName = 'globomantics';

  (async function addUser() {
    let client;
    try {
      client = await MongoClient.connect(url);

      const db = client.db(dbName);
      const user = { username, password };
      const results = await db.collection('users').insertOne(user);
      debug(results);
      // results doesn't return the same thing
      req.login(results, () => {
        res.redirect('/auth/profile');
      });
    } catch (err) {
      debug(err);
    } finally {
      client.close();
    }
  })();
});

authRouter
  .route('/signIn')
  .get((req, res) => {
    res.render('signin');
  })
  .post(
    passport.authenticate('local', {
      successRedirect: '/auth/profile',
      failureMessage: '/',
    })
  );

authRouter.route('/profile').get((req, res) => {
  res.json(req.user);
});

module.exports = authRouter;
