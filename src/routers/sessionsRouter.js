const express = require('express');
const debug = require('debug')('app:sessionRouter');
const { MongoClient, ObjectId } = require('mongodb');

const sessionsRouter = express.Router();
// const sessions = require('../data/sessions.json');

sessionsRouter.use((req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect('/auth/signIn');
  }
});

sessionsRouter.route('/').get((req, res) => {
  const url =
    'mongodb+srv://dbUser:u63gIYL1Ig3MEU15@globomantics.rbrms.mongodb.net?retryWrites=true&w=majority';
  // const url = 'mongodb://localhost:27017';
  const dbName = 'globomantics';
  (async function mongo() {
    let client;
    try {
      client = await new MongoClient(url).connect();
      debug('Connected to the mongo DB');

      const db = client.db(dbName);
      const sessions = await db.collection('sessions').find().toArray();
      res.render('sessions', { sessions });
    } catch (err) {
      debug(err.stack);
    } finally {
      // const admin = client.db(dbName).admin();
      // await client.db(dbName).dropDatabase();
      // debug(await admin.listDatabases());
      client.close();
    }
  })();
});

sessionsRouter.route('/:id').get((req, res) => {
  const { id } = req.params;
  const url =
    'mongodb+srv://dbUser:u63gIYL1Ig3MEU15@globomantics.rbrms.mongodb.net?retryWrites=true&w=majority';
  // const url = 'mongodb://localhost:27017';
  const dbName = 'globomantics';
  (async function mongo() {
    let client;
    try {
      client = await new MongoClient(url).connect();
      debug('Connected to the mongo DB');

      const db = client.db(dbName);
      const session = await db
        .collection('sessions')
        .findOne({ _id: new ObjectId(id) });
      res.render('session', {
        session,
      });
    } catch (err) {
      debug(err.stack);
    } finally {
      // const admin = client.db(dbName).admin();
      // await client.db(dbName).dropDatabase();
      // debug(await admin.listDatabases());
      client.close();
    }
  })();
});

module.exports = sessionsRouter;
