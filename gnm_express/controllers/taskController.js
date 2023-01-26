/* eslint-disable max-len */
const TaskModel = require('../models/taskModel');
const {paginatedResults, paginateQuery} = require('../utils/pagination');


const createNewTask = ('/tasks', async (req, res) => {
  const task = new TaskModel(req.body);

  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});


const getAllTasks = ('/tasks', async (req, res) => {
  try {
    const tasks= await paginatedResults(TaskModel, req);
    res.json(tasks);
  } catch (e) {
    res.status(500).send();
  }
});


const getTask = ('/tasks/:id', async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await TaskModel.findById(_id);

    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});

const updateTask = ('/tasks/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['description', 'completed'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({error: 'Invalid updates!'});
  }

  try {
    const task = await TaskModel.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});

    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});


const deleteTask = ('/tasks/:id', async (req, res) => {
  try {
    const task = await TaskModel.findByIdAndDelete(req.params.id);

    if (!task) {
      res.status(404).send();
    }

    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = {
  createNewTask,
  getAllTasks,
  getTask,
  updateTask,
  deleteTask,
};
