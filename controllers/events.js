const express = require('express');
const app = express.Router();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const model = require('../models/event.js');
  
app.post('/events', model.insertEvent);
app.delete('/events/:id', model.removeEvent);
app.put('/events/:id', model.updateEvent);
app.get('/events/:id', model.findEvent);
app.get('/events', model.findAllEvents);

module.exports = app