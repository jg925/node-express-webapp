const express = require('express');
const debug = require('debug')('app:adminRouter');
const { MongoClient } = require('mongodb');
const sessions = require('../data/sessions.json');

const adminRouter = express.Router();

adminRouter.route('/').get((req, res) => {
  // 0ie5yQ89UYCcymHp
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
      const response = await db.collection('sessions').insertMany(sessions);
      debug(`${response.insertedCount} documents were inserted`);
      res.json(response);
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

module.exports = adminRouter;
