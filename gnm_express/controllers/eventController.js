/* eslint-disable max-len */
const EventModel = require('../models/EventModel/eventModel');
const UserModel = require('../models/UserModel/userModel');
const {NYC_2023} = require('../config/config');
const {paginatedResults} = require('../middlewares/pagination');
const {notFoundError, createdDataStatus, internalServerError} = require('../utils/customHttpMessages');
const {generatePaymentReceiptID} = require('../utils/utils');

const createNewEvent = ('/event', async (req, res) => {
  // Get User info from the Users Collection
  let userInfo = await UserModel.find({email: req.body.registredUserEmail});
  userInfo = userInfo[0]; approvalInfo = approvalInfo[0];
  if (!userInfo.email == req.body.registredUserEmail) {
    return res.status(404).send(notFoundError('You have not registred'));
  }
  // Get Approval Info
  let approvalInfo = await UserModel.find({email: req.email});

  // Get Check if User Already Paid
  let eventInfo = await EventModel.find({registredUserID: userInfo.UID});
  eventInfo = eventInfo[0];
  if (eventInfo.registrationStatus) {
    return res.status(500).send(internalServerError('You payment is already completed'));
  }
  // Set Event Details
  req.body.eventName = NYC_2023.eventName;
  req.body.eventStartDate = NYC_2023.eventStartDate;
  req.body.eventEndDate = NYC_2023.eventEndDate;

  // Set User or Participant Details
  req.body.registredUserID = userInfo.UID;
  req.body.registredUserName = userInfo.fullName.firstName;

  // Set Approval Details
  req.body.approvalUserID = approvalInfo.UID;
  req.body.approvalUserName = approvalInfo.fullName.firstName;
  req.body.paymentReceiptID = generatePaymentReceiptID();

  // Finalise Event Record Info
  const event = new EventModel(req.body);

  // Insert New Record into the Events Collections
  try {
    await event.save();
    res.status(201).send(createdDataStatus(event));
  } catch (e) {
    res.status(400).send(e);
  }
});


const getAllEvents = ('/event', async (req, res) => {
  try {
    const event = await paginatedResults(EventModel, req);
    res.json(event);
  } catch (e) {
    res.status(500).send();
  }
});


const getEventRegistrationStatus = ('/event/:id', async (req, res) => {
  const registredUserID = req.params.id;

  try {
    let userInfo = await EventModel.find({registredUserID: registredUserID});
    userInfo = userInfo[0];

    if (!userInfo) {
      return res.status(404).send(notFoundError('Invalid ID'));
    }

    res.send(userInfo);
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
  getEventRegistrationStatus,
  updateEvent,
  deleteEvent,
};
