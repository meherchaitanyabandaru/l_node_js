const express = require('express');
const Task = require('../models/task');
const router = new express.Router();
const {paginatedResults} = require('../utils/pagination')

// Routes

/**
 * @swagger
 * /tasks:
 *   post:
 *     "tags": ["Tasks"]
 *     summary: Create a new task.
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                     description:
 *                       type: string
 *                       description: task description.
 *                       example: my description sowmya chappidi
 *                     completed:
 *                       type: Boolean
 *                       description: complete status.
 *                       example: true
*/

const createNewTask = ('/tasks', async (req, res) => {
  const task = new Task(req.body);

  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});


// Routes
/**
 *  @swagger
 *  /tasks:
 *  get:
 *     "tags": ["Tasks"]
 *     description: "it will fetch all the tasks information"
 *     responses:
 *        '200':
 *          description: "success"
*/


const getAllTasks = ('/tasks', paginatedResults(Task), async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
    res.json(res.paginatedResults);
  } catch (e) {
    res.status(500).send();
  }
});



/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     "tags": ["Tasks"]
 *     summary: Retrieve a single JSONPlaceholder user.
 *     description: Retrieve a single JSONPlaceholder user. Can be used to populate a user profile when prototyping or testing an API.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pet updated.
 */

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


/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     "tags": ["Tasks"]
 *     summary: it will delete the task.
 *     description: Retrieve a single JSONPlaceholder user. Can be used to populate a user profile when prototyping or testing an API.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: task deleted.
 */

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
  deleteTask
}
