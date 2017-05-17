const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const userSchema = require('../models/user.js');
const User = mongoose.model('User', userSchema);
mongoose.Promise = require('bluebird');

const MongoClient = require('mongodb').MongoClient,
	assert = require('assert'),
	ObjectId = require('mongodb').ObjectID;

const insertUser = function(req, res, callback) {

	if (!req.body.username || !req.body.password || !req.body.email || !req.body.fullname) {
	res.statusCode = 404;
	return res.send('You have to insert username, password, email and fullname');
    }

	var newUser = new User({username: req.body.username, password: req.body.password, email: req.body.email, fullname: req.body.fullname});

	newUser.save(function (err, newUser) {
		if (err === null) {
			res.statusCode = 201;
			res.send(newUser);
			return console.log(err);
		}
		else {
			res.statusCode = 404;
			res.send('Could not add user.');
		}
	});
}

router.post('/', insertUser);

module.exports = router;
