var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

const i18n = require('i18n');
i18n.configure({
  locales: ['pl', 'en'],
  directory: path.join(__dirname, 'locales'),
  objectNotation: true,
  cookie: 'acme-hr-lang', 
});

const session = require('express-session');
var indexRouter = require('./routes/index');
const autoRouter = require('./routes/AutoRoute');
const klientRouter = require('./routes/KlientRoute');
const wypozyczenieRouter = require('./routes/WypozyczenieRoute');
const logowanieRouter = require('./routes/LogowanieRoute');
const sequelizeInit = require('./config/sequelize/init');
const authApiRouter = require('./routes/api/AuthApiRoute');

sequelizeInit()
.catch(err => {
  console.log(err);
});
const fmt = require('./utils/dateFormatting');
const autoApiRouter = require('./routes/api/AutoApiRoute');
const klientApiRouter = require('./routes/api/KlientApiRoute');
const wypozyczenieApiRouter = require('./routes/api/WypozyczenieApiRoute');
const wypozyczalniaApiRouter = require('./routes/api/WypozyczalniaApiRoute');
const portfeleApiRouter = require('./routes/api/PortfelApiRoute');
const authUtils = require('./utils/authUtils')


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cookieParser('secret'));

app.use(i18n.init);

app.use(cors());

app.use(session({
  secret: 'my_secret_password',
  resave: false
}));

app.use((req, res, next) => {
  if(!res.locals.lang) {
      const currentLang = req.cookies['acme-hr-lang'];
      res.locals.lang = currentLang;
  }
  next();
});


app.use((req, res, next) => {
  const loggedUser = req.session.loggedUser;
  res.locals.loggedUser = loggedUser;
  if (!res.locals.loginError) {
    res.locals.loginError = undefined;
  }
  next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.locals.fmt = fmt;
  next();
});
app.use('/', indexRouter);
app.use('/Logowanie', logowanieRouter);
app.use('/Auto', authUtils.permitAuthenticatedUser, autoRouter);
app.use('/Klient', authUtils.permitAuthenticatedUser, klientRouter);
app.use('/Wypozyczenie', authUtils.permitAuthenticatedUser, wypozyczenieRouter);
app.use('/api/auta', autoApiRouter);
app.use('/api/klient', klientApiRouter);
app.use('/api/wypozyczenie', wypozyczenieApiRouter);
app.use('/api/wypozyczalnia', wypozyczalniaApiRouter);
app.use('/api/portfel', portfeleApiRouter);
app.use('/api/auth', authApiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
