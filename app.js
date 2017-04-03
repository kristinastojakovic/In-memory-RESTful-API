const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


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

app.post('/events', (req, res) => {
  if (!req.body.title || !req.body.description || !req.body.date) {
    res.statusCode = 404;
    return res.send('You have to insert title, description and date');
  }

  //makes new id for the new event
  const newId = array[array.length-1].id + 1;
  const newEvent = {"id": newId,
              "title": req.body.title,
              "description": req.body.description,
              "date": req.body.date};

  array.push(newEvent);
  res.send(array);
})

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
