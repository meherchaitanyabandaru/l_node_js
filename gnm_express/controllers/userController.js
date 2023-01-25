/* eslint-disable max-len */
const UserModel = require('../models/UserModel/userModel');
const bcrypt = require('bcryptjs');
const {generateNewUserID, validatePassword} = require('./../utils/utils');
const {forbiddenError, internalServerError} = require('./../utils/customHttpMessages');

// Creating New User
const createNewUser = ('/users', async (req, res) => {
  const users = await UserModel.find().sort({UID: -1}).limit(1);

  const registriedEmail = await UserModel.find().count({email: req.body.email});
  if (registriedEmail>0) {
    return res.status(403).send(forbiddenError('This Email-ID is already registred'));
  }
  const registredPhoneNumber = await UserModel.find().count({phoneNumber: req.body.phoneNumber});
  if (registredPhoneNumber>0) {
    return res.status(403).send(forbiddenError('This Phone Number is already registred'));
  }
  if (!validatePassword(req.body.password)) {
    return res.status(403).send(internalServerError('password should contain atleast one number and one special character'));
  }

  const UID = users[0]?.UID || '2023000001';

  const salt = await bcrypt.genSaltSync(10);
  const hashedPassword = await bcrypt.hashSync(req.body.password, salt);
  req.body.password = hashedPassword;
  req.body.usertype = ['default'];
  req.body.UID = generateNewUserID(UID);
  const user = new UserModel(req.body);

  try {
    await user.save();
    const result = {user: user.email, phoneNumber: user.phoneNumber, userID: user.UID};
    res.status(201).send(result);
  } catch (e) {
    res.status(400).send(e);
  }
});


const getAllUsers = ('/users', async (req, res) => {
  try {
    const users = await UserModel.find();
    const registriedEmail = await UserModel.find().count({email: 'tejaswimudragada@gmail.com'});
    if (registriedEmail>0) {
      res.status(500).send({'email': 'email-already-exist'});
    }
    res.send({data2});
  } catch (e) {
    res.status(500).send();
  }
});


const getUser = ('/users/:email/:phoneNumber', async (req, res) => {
  const email = req.params.email;
  const phoneNumber = req.params.phoneNumber;

  try {
    const user = await UserModel.find({$or: [{email: email}, {phoneNumber: phoneNumber}]});

    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (e) {
    res.status(500).send();
  }
});

const updateUser = ('/users/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'password', 'age', 'city'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({error: 'Invalid updates!'});
  }

  try {
    const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});

    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

const deleteUser = ('/users/:id', async (req, res) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (e) {
    res.status(500).send();
  }
});


module.exports = {
  createNewUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
};
