const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	username: String,
	password: String,
	email: String,
	fullname: String
});

module.exports = userSchema;
