const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const events = require('./controllers/event.js');
const users = require('./controllers/user.js');
const passport = require('passport');
const session = require('express-session');
app.use(session({ secret: 'keyboard cat' , resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

//const url = 'mongodb://localhost:27017/events';
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI || 'mongodb://localhost:27017/events');
db = mongoose.connection;

//const model = require('./models/event.js');
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!

  app.use('/events', events);
  app.use('/', users);
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!')
})

module.exports = app;
