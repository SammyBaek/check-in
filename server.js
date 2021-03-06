const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');

require('./backend/models');
require('./backend/services');
const keys = require('./backend/keys');
const api = require('./backend/routes');

const PORT = process.env.PORT || 8080;
const app = express();

//mongo
mongoose.connect(keys.mongoUri);

app.use(
  bodyParser.urlencoded({
    extended: true // parse things from qs
  })
);

app.use(
  cookieSession({
    maxAge: 60 * 60 * 1000, // 1 hour
    keys: [keys.cookieKey]
  })
);

//authentication
app.use(passport.initialize()); //lets you use passport
app.use(passport.session()); // lets you do req.user

//backend routing
app.use('/api', api);

//frontend routing
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', (request, response) => {
  response.sendFile(__dirname + '/public/index.html');
});

app.listen(PORT, error => {
  error
    ? console.error(error)
    : console.info(`==> 🌎 Backend on port ${PORT}.`);
});
