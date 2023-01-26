const express = require('express');
const router = new express.Router();
const eventController = require('../controllers/eventController');

router.route('/')
    .post(eventController.createNewEvent)
    .get(eventController.getAllEvents)
    .patch(eventController.updateEvent)
    .delete(eventController.deleteEvent);

router.route('/:id')
    .get(eventController.getEvent);

module.exports = router;

