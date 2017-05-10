const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const events = require('./controllers/event.js');

const url = 'mongodb://localhost:27017/events';
const mongoose = require('mongoose');
mongoose.connect(url);
db = mongoose.connection;

const model = require('./models/event.js');
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!

  app.use('/events', events);

});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

module.exports = app;
