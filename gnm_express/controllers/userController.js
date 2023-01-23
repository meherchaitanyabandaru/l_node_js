/* eslint-disable max-len */
const UserModel = require('../models/userModel');
const bcrypt = require('bcryptjs');


const createNewUser = ('/users', async (req, res) => {
  const salt=await bcrypt.genSaltSync(10);
  const hashedPassword= await bcrypt.hashSync(req.body.password, salt);
  req.body.password=hashedPassword;
  req.body.usertype=10073;
  const user = new UserModel(req.body);

  try {
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});


const getAllUsers= ('/users', async (req, res) => {
  try {
    const users = await UserModel.find();
    res.send(users);
  } catch (e) {
    res.status(500).send();
  }
});


const getUser = ('/users/:id', async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await UserModel.findById(_id);

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
