const passport = require('passport');
const { Strategy } = require('passport-local');
const debug = require('debug')('app:localStrategy');
const { MongoClient } = require('mongodb');

module.exports = function localStrategy() {
  passport.use(
    new Strategy(
      {
        usernameField: 'username',
        passwordField: 'password',
      },
      (username, password, done) => {
        const url =
          'mongodb+srv://dbUser:u63gIYL1Ig3MEU15@globomantics.rbrms.mongodb.net?retryWrites=true&w=majority';
        // const url = 'mongodb://localhost:27017';
        const dbName = 'globomantics';
        (async function validateUser() {
          let client;
          try {
            client = await new MongoClient(url).connect();
            debug('Connected to the mongo DB');

            const db = client.db(dbName);
            const user = await db.collection('users').findOne({ username });

            if (user && user.password === password) {
              done(null, user);
            } else {
              done(null, false);
            }
          } catch (err) {
            done(err, false);
          } finally {
            client.close();
          }
        })();
      }
    )
  );
};
