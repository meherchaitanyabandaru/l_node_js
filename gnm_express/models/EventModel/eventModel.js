const mongoose = require('mongoose');
const eventSchema = require('./eventSchema');

const EventModel = mongoose.model('Event', eventSchema);

module.exports = EventModel;
