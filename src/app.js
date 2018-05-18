const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
require('env2')('./config.env');
const favicon = require('serve-favicon');
const cookieSession = require('cookie-session');
const helpers = require('./views/helpers/index');

const secret = process.env.SECRET;
const controllers = require('./controllers/');

const app = express();

app.use(cookieSession({
  name: 'session',
  keys: [secret],
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine(
  'hbs',
  exphbs({
    extname: 'hbs',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials'),
    defaultLayout: 'main',
    helpers,
  }),
);

app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.static(path.join(__dirname, '..', '..', 'public')));

app.use(favicon(path.join(__dirname, '..', 'public', 'favicon.ico')));
app.use(controllers);

module.exports = app;
