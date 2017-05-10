const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const eventSchema = require('../models/event.js');
const Event = mongoose.model('Event', eventSchema);
mongoose.Promise = require('bluebird');

const MongoClient = require('mongodb').MongoClient,
	assert = require('assert'),
	ObjectId = require('mongodb').ObjectID;

const insertEvent = function(req, res, callback) {

	if (!req.body.title || !req.body.description || !req.body.date) {
	res.statusCode = 404;
	return res.send('You have to insert title, description and date');
  }

	var newEvent = new Event({title: req.body.title, description: req.body.description, date: req.body.date});

	newEvent.save(function (err, newEvent) {
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

module.exports.removeAllEvents = function(callback) {

	Event.remove({}, function (err) {
		if(err) {
			console.log('Could not remove event.');
		}
		else {
			console.log('Deleted events from database');
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

const findEventById = function(req, res, callback) {
	const id = req.params.id;

	Event.findOne({ _id : ObjectId(id)} ,function (err, event) {
		if(err || event === null) {
			res.statusCode = 404;
			res.send('Could not find a event by this id');
		}
		else {
			res.statusCode = 201;
			res.send(event);
		}
	});
}

const findEventByTitle = function(req, res, callback) {
	const title = req.params.title;

	Event.findOne({ title: title } ,function (err, event) {
		if(err || event === null) {
			res.statusCode = 404;
			res.send('Could not find a event by this title');
		}
		else {
			res.statusCode = 201;
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
			res.statusCode = 200;
			res.send(events);
		}
	});
}

router.post('/', insertEvent);
router.delete('/:id', removeEvent);
router.put('/:id', updateEvent);
router.get('/Title/:title', findEventByTitle);
router.get('/:id', findEventById);
router.get('/', findAllEvents);

module.exports = router;
