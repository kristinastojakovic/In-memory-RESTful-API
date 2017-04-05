const 	express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var MongoClient = require('mongodb').MongoClient,
	assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/events';

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
  
});

let array = [{"id": 1, "title": "Marathon_Boston", "description": "This was a run",
      "date": "12.06.2017"},
	  {"id": 2, "title": "Music_Festival", "description": "This was fun",
      "date": "01.04.2017"},
	  {"id": 3, "title": "Film_Festival", "description": "This was educational",
      "date": "30.08.2017"}];

app.get('/event', (req, res) => {
  res.send(array[0]);
});

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

var insertDocuments = function(db, req, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Insert some documents
  collection.insertOne({"title": req.body.title, "description": req.body.description, "date": req.body.date}, function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    assert.equal(1, result.ops.length);
    console.log("Inserted 1 event into the collection");
    callback(result);
  });
}

app.put('/events/:id', (req, res) => {
 const id = parseInt(req.params.id);

 //find the event by id
 let event = findEventById(id);

 //checking if event is empty
 if (!event) {
    res.statusCode = 404;
    return res.send('Could not find a event by this id');
 }

 if (!req.body.title) {
   res.statusCode = 404;
   return res.send('You have to insert a name');
 }
 event.title = req.body.title;

 if (!req.body.description) {
   res.statusCode = 404;
   return res.send('You have to insert a description');
 }
 event.description = req.body.description;

 if (!req.body.date) {
   res.statusCode = 404;
   return res.send('You have to insert a date');
 }
 event.date = req.body.date;

 res.send(event);
})

app.delete('/events/:id', (req, res) => {
  const id = parseInt(req.params.id);

  //find the event by id
  let event = findEventById(id);

  //checking if event is empty
  if (!event) {
	res.statusCode = 404;
	return res.send('Could not find a event by this id');
  }

  let index = array.indexOf(event);
  array.splice(index, 1);
  
  res.send(event);
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

module.exports = app;
