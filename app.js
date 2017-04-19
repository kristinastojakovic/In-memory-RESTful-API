const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const MongoClient = require('mongodb').MongoClient,
	assert = require('assert'),
	ObjectId = require('mongodb').ObjectID;

// Connection URL
const url = 'mongodb://localhost:27017/events';

// mongoose
const mongoose = require('mongoose');
mongoose.connect(url);

const eventSchema = mongoose.Schema({
	title: String,
	description: String,
	date: String
}, {collection: "documents"});

var Event = mongoose.model('Event', eventSchema);

mongoose.Promise = require('bluebird');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!

  app.post('/events', insertEvent);
  app.delete('/events/:id', removeEvent);
  app.put('/events/:id', updateEvent);
	app.get('/events/:id', findEvent);
	app.get('/events', findAllEvents);

});

const insertEvent = function(req, res, callback) {
	if (!req.body.title || !req.body.description || !req.body.date) {
		res.statusCode = 404;
		return res.send('You have to insert title, description and date');
	}

  var newEvent = new Event({title: req.body.title, description: req.body.description, date: req.body.date});

  newEvent.save(function (err, newEvent) {
		if (err) {
			res.statusCode = 404;
			res.send('could not add event');
			return console.error(err);
		}
		else {
			res.statusCode = 201;
			res.send(newEvent);
		}
  });
}

const removeEvent = function(req, res, callback) {
	const id = req.params.id;

	Event.remove({ _id : ObjectId(id)}, function (err) {
		if(err) {
			res.statusCode = 404;
			console.log('Could not remove event.')
			res.send('Could not find a event by this id.');
		}
		else {
			res.statusCode = 202;
			res.send('Succesfully deleted the event!');
		}
	});
}

const updateEvent = function(req, res, callback) {
	const id = req.params.id;

    //checking if event is empty
    if (!req.body.title) {
		res.statusCode = 404;
		return res.send('You have to insert a name');
	}
	if (!req.body.description) {
		res.statusCode = 404;
		return res.send('You have to insert a description');
	}
	if (!req.body.date) {
		res.statusCode = 404;
		return res.send('You have to insert a date');
	}

	Event.update({ _id : ObjectId(id)}, {title: req.body.title, description: req.body.description, date: req.body.date}, function (err, rawResponse) {
		console.log(rawResponse);
		if(err || rawResponse.nModified === 0) {
			res.statusCode = 404;
			console.log('Could not update event.')
			res.send('Could not find a event by this id.');
		}
		else {
			res.statusCode = 202;
			res.send('Succesfully updated the event!');
		}
	});
}

const findEvent = function(req, res, callback) {
	const id = parseInt(req.params.id);

	Event.find( function (err, event) {
		console.log(event);
		if(err) {
			res.statusCode = 404;
			res.send('Could not find a event by this id');
		}
		else {
			res.send(event);
		}
	});
}


const findAllEvents = function(req, res, callback) {
	Event.find(function (err, events) {
		if(err) {
			res.statusCode = 404;
			res.send('Could not find a events');
		}
		else {
			res.send(events);
		}
	});
}


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

module.exports = app;
