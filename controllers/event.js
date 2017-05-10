const express = require('express');
const router = express.Router();

const model = require('../models/event.js');

router.post('/', model.insertEvent);
router.delete('/:id', model.removeEvent);
router.put('/:id', model.updateEvent);
router.get('/Title/:title', model.findEventByTitle);
router.get('/:id', model.findEventById);
router.get('/', model.findAllEvents);

module.exports = router
