const mongoose = require('mongoose');

/*const MongoClient = require('mongodb').MongoClient,
	assert = require('assert'),
	ObjectId = require('mongodb').ObjectID; */

const eventSchema = mongoose.Schema({
	title: String,
	description: String,
	date: String
});

module.exports = eventSchema;
