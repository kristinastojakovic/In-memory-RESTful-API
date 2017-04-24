const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const events = require('./controllers/events.js');

const MongoClient = require('mongodb').MongoClient,
	assert = require('assert'),
	ObjectId = require('mongodb').ObjectID;

const model = require('./models/event.js');
model.db.on('error', console.error.bind(console, 'connection error:'));
model.db.once('open', function() {
  // we're connected!

  app.use('/events', events);

});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

module.exports = app;
