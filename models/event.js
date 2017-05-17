const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
	title: String,
	description: String,
	date: String
});

module.exports = eventSchema;
