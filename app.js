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

app.get('/event', function (req, res) {
  res.send(event);
})

app.get('/events', function (req, res) {
	res.send(array);
})

app.get('/events/:number', function (req, res) {
  let number = parseInt(req.params.number);

  res.send(array[number+1]);
})

app.post('/events', function (req, res) {
  array.push(event);
  res.send(array);
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
