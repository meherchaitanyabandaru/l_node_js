const express = require('express');
const Task = require('../models/task');
const router = new express.Router();


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

router.post('/tasks', async (req, res) => {
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

//server side pagination for get all tasks-------BEGIN
router.get('/tasks', paginatedResults(Task),(req, res) => {
	res.json(res.paginatedResults)
})

function paginatedResults(model){
	return async (req, res, next) => {
	const page = parseInt(req.query.page)
	const limit = parseInt(req.query.limit)
	
	const startIndex = (page - 1)* limit
	const endIndex = page * limit
	
	const results = {}
	
	if (endIndex < model.length){
		results.next = {
		page: page + 1,
		limit: limit
		}
	}
	
	
	if (startIndex > 0){
		results.previous = {
		page: page - 1,
		limit: limit
		}
	}
	
	try {
	results.results = await model.find().limit(limit).skip(startIndex).exec()
	res.paginatedResults = results
	next()
	} catch (e) {
	  res.status(500).send();
	}
	
	
	}
}

//Server side pagination----END


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

router.get('/tasks/:id', async (req, res) => {
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

router.patch('/tasks/:id', async (req, res) => {
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

router.delete('/tasks/:id', async (req, res) => {
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

module.exports = router;
