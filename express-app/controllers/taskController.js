/* eslint-disable max-len */
const Task = require('../models/task');
const {paginatedResults} = require('../utils/pagination')


const createNewTask = ('/tasks', async (req, res) => {
  const task = new Task(req.body);

  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});



const getAllTasks = ('/tasks', paginatedResults(Task), async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
    res.json(res.paginatedResults);
  } catch (e) {
    res.status(500).send();
  }
});


const getTask = ('/tasks/:id', async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findById(_id);

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
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});

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
    const task = await Task.findByIdAndDelete(req.params.id);

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
