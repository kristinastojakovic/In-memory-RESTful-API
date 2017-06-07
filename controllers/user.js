const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const userSchema = require('../models/user.js');
const User = mongoose.model('User', userSchema);
mongoose.Promise = require('bluebird');

const MongoClient = require('mongodb').MongoClient,
	assert = require('assert'),
	ObjectId = require('mongodb').ObjectID;

const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;

/*
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
} */

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

router.get('/',
  passport.authenticate('basic', { session: true }), function(req, res) {
    res.json(req.user);
});

passport.use(new BasicStrategy(
  function(userid, password, done) {
    User.findOne({ username: userid }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!verifyPassword(user, password)) { return done(null, false); }
      return done(null, user);
    });
  }
));

verifyPassword = function(user, password){
	if (user.password == password)
		return true;
	else
		return false;
}

module.exports = router;
