// Connection URL
const url = 'mongodb://localhost:27017/events';

// mongoose
const mongoose = require('mongoose');
mongoose.connect(url);

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const MongoClient = require('mongodb').MongoClient,
	assert = require('assert'),
	ObjectId = require('mongodb').ObjectID;

const eventSchema = mongoose.Schema({
	title: String,
	description: String,
	date: String
}, {collection: "documents"});

Event = mongoose.model('Event', eventSchema);

mongoose.Promise = require('bluebird');

module.exports.db = mongoose.connection;


module.exports.insertEvent = function(req, res, callback) {

	if (!req.body.title || !req.body.description || !req.body.date) {
	res.statusCode = 404;
	return res.send('You have to insert title, description and date');
  }

	var newEvent = new Event({title: req.body.title, description: req.body.description, date: req.body.date});

	newEvent.save(function (err, newEvent) {
		console.log("err: " + err);
		if (err === null) {
			res.statusCode = 201;
			res.send(newEvent);
			return console.log(err);
		}
		else {
			res.statusCode = 404;
			res.send('Could not add event.');
		}
	});
}

module.exports.removeEvent = function(req, res, callback) {
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

module.exports.updateEvent = function(req, res, callback) {
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

module.exports.findEventById = function(req, res, callback) {
	const id = req.params.id;

	Event.findOne({ _id : ObjectId(id)} ,function (err, event) {
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

module.exports.findEventByTitle = function(req, res, callback) {
	const title = req.params.title;

	Event.find({ title: title } ,function (err, event) {
		console.log(event);
		if(err) {
			res.statusCode = 404;
			res.send('Could not find a event by this title');
		}
		else {
			res.send(event);
		}
	});
}


module.exports.findAllEvents = function(req, res, callback) {
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
