const mongoose = require('mongoose');
const eventSchema = require('./eventSchema');

const EventModel = mongoose.model('Events', eventSchema);

module.exports = EventModel;
