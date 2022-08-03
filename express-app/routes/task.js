const express = require('express');
const Task = require('../models/task');
const router = new express.Router();
const taskController = require('../controllers/taskController')

router.route('/')
  .post(taskController.createNewTask)
  .get(taskController.getAllTasks)
  .patch(taskController.updateTask)
  .delete(taskController.deleteTask)

router.route('/:id')
  .get(taskController.getTask);

module.exports = router;

