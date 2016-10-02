const cookieParser = require('cookie-parser');
// cookieParser probably not needed
const session = require('express-session');
var sequelize = require('./db/db.js').sequelize;
const SequelizeStore = require('connect-session-sequelize')(session.Store);

module.exports = (app, express) => {
  app.use(cookieParser('Our Secret'));
  app.use(session({
    secret: 'Our Secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
    store: new SequelizeStore({
      db: sequelize
    }),
    proxy: true
  }));
};