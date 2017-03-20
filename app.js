let express = require('express');
let app = express();

let event = {"id": 1, "title": "Marathon_Boston", "description": "This was a run",
      "date": "12.06.2017"};

let array = [{"id": 1, "title": "Marathon_Boston", "description": "This was a run",
      "date": "12.06.2017"},
	  {"id": 2, "title": "Music_Festival", "description": "This was fun",
      "date": "01.04.2017"},
	  {"id": 3, "title": "Film_Festival", "description": "This was educational",
      "date": "30.08.2017"}];

app.get('/event', (req, res) => {
  res.send(event);
})

app.get('/events', (req, res) => {
	res.send(array);
})

app.get('/events/:id', (req, res) => {
  //get the id from the route
  let id = parseInt(req.params.id);

  //find the event with the right id
  for(let i = 1; i < array.length; i++) {
    if(array[i].id === id){
      res.send(array[i]);
    }
  }
})

app.post('/events', (req, res) => {
  array.push(event);
  res.send(array);
})


app.put('/events/:id', (req, res) => {
  let id = parseInt(req.params.id);

  array[id+1].title = "this has changed";
  res.send(array);
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
