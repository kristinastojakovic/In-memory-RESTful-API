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
			console.log('Could not add event')
			res.send('Could not find a event by this id');
		}
		else {
			res.statusCode = 202;
			res.send('Succesfully deleted the event!');
		}
	});
}

/*
// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {

  assert.equal(null, err);
  console.log("Connected successfully to server");

  app.post('/events', (req, res) => {
	  if (!req.body.title || !req.body.description || !req.body.date) {
		res.statusCode = 404;
		return res.send('You have to insert title, description and date');
	  }

	  insertDocuments(db, req, function() {
		db.close();
	  });

	res.send("Success!");

  })

  app.put('/events/:id', (req, res) => {
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

   updateDocument(db, id, req, function() {
     db.close();
   });


  res.send('Succesfully updated event');
  })

  //TODO
  app.delete('/events/:id', (req, res) => {
  const id = req.params.id;

  //checking if event is empty
  if (id === undefined) {
	res.statusCode = 404;
	return res.send('Could not find a event by this id');
  }

   removeDocument(db, id, function() {
     db.close();
   });

   res.send('Succesfully deleted the event!');
  })

});


let array = [{"id": 1, "title": "Marathon_Boston", "description": "This was a run",
      "date": "12.06.2017"},
	  {"id": 2, "title": "Music_Festival", "description": "This was fun",
      "date": "01.04.2017"},
	  {"id": 3, "title": "Film_Festival", "description": "This was educational",
      "date": "30.08.2017"}];

app.get('/events', (req, res) => {
	res.send(array);
});

function findEventById(id) {
  for(let i = 0; i < array.length; i++) {
    if(array[i].id === id){
      return array[i];
    }
  }
}

app.get('/events/:id', (req, res) => {
  //get the id from the route
  const id = parseInt(req.params.id);

  //find the event by id
  let event = findEventById(id);

  //checking if event is empty
  if(!event) {
    res.statusCode = 404;
    return res.send('Could not find a event by this id');
  }
  res.send(event);
})




const insertDocuments = function(db, req, callback) {
  // Get the documents collection
  const collection = db.collection('documents');
  // Insert some documents
  collection.insertOne({"title": req.body.title, "description": req.body.description, "date": req.body.date}, function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    assert.equal(1, result.ops.length);
    console.log("Inserted 1 event into the collection");
    callback(result);
  });
}


const updateDocument = function(db, id, req, callback) {
  // Get the documents collection
  const collection = db.collection('documents');
  // Update document where a is 2, set b equal to 1
  collection.updateOne({ "_id" : ObjectId(id) }
    , { $set: { "title": req.body.title, "description": req.body.description, "date": req.body.date } }, function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    console.log("Updated the document with the field a equal to 2");
    callback(result);
  });
}

const removeDocument = function(db, id, res, callback) {
  // Get the documents collection
  const collection = db.collection('documents');
  // Delete document where a is 3
  collection.deleteOne({ "_id" : ObjectId(id)}, function(err, result) {
	assert.equal(err, null);
    assert.equal(1, result.result.n);
    console.log("Removed the event");
    callback(result);
  });
}

*/

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

module.exports = app;
