/* eslint-disable max-len */
const EventModel = require('../models/EventModel/eventModel');
const {paginatedResults} = require('../middlewares/pagination');


const createNewEvent = ('/event', async (req, res) => {
  const event = new EventModel(req.body);

  try {
    await event.save();
    res.status(201).send(event);
  } catch (e) {
    res.status(400).send(e);
  }
});


const getAllEvents = ('/event', async (req, res) => {
  try {
    const event= await paginatedResults(EventModel, req);
    res.json(event);
  } catch (e) {
    res.status(500).send();
  }
});


const getEvent = ('/event/:id', async (req, res) => {
  const _id = req.params.id;

  try {
    const event = await EventModel.findById(_id);

    if (!event) {
      return res.status(404).send();
    }

    res.send(event);
  } catch (e) {
    res.status(500).send();
  }
});

const updateEvent = ('/event/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['description', 'completed'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({error: 'Invalid updates!'});
  }

  try {
    const event = await EventModel.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});

    if (!event) {
      return res.status(404).send();
    }

    res.send(event);
  } catch (e) {
    res.status(400).send(e);
  }
});


const deleteEvent = ('/event/:id', async (req, res) => {
  try {
    const event = await EventModel.findByIdAndDelete(req.params.id);

    if (!event) {
      res.status(404).send();
    }

    res.send(event);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = {
  createNewEvent,
  getAllEvents,
  getEvent,
  updateEvent,
  deleteEvent,
};
