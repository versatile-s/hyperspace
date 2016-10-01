const cookieParser = require('cookie-parser');
const session = require('express-session');
var sequelize = require('./db/db.js').sequelize;

const SequelizeStore = require('connect-session-sequelize')(session.Store);

module.exports = (app, express) => {
  // app.use(bodyParser.json());
  // app.use(bodyParser.urlencoded({extended: true}));
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