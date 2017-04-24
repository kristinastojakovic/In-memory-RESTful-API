const express = require('express');
const app = express.Router();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const model = require('../models/event.js');

app.post('/', model.insertEvent);
app.delete('/:id', model.removeEvent);
app.put('/:id', model.updateEvent);
app.get('/:id', model.findEvent);
app.get('/', model.findAllEvents);

module.exports = app
