const express = require('express');
const router = new express.Router();
const eventController = require('../controllers/eventController');
const {verifyToken, isAdmin} =
require('../middlewares/authJwt');

router.route('/')
    .post(verifyToken, isAdmin, eventController.createNewEvent)
    .get(eventController.getAllEvents)
    .patch(eventController.updateEvent)
    .delete(eventController.deleteEvent);

router.route('/:id')
    .get(eventController.getEventRegistrationStatus);

module.exports = router;

