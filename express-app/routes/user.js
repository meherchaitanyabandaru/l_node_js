const express = require('express');
const User = require('../models/user');
const router = new express.Router();


// Routes

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user.
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                     name:
 *                       type: string
 *                       description: user name.
 *                       example: sowmya123
 *                     email:
 *                       type: string
 *                       description: user email.
 *                       example: sowmya.chappidi02@gmail.com
 *                     password:
 *                       type: string
 *                       description: user password.
 *                       example: sowmya1234
 *                     age:
 *                       type: number
 *                       description: user age.
 *                       example: 26
 *                     city:
 *                       type: string
 *                       description: city.
 *                       example: rjy
*/

router.post('/users', async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});


// Routes
/**
 *  @swagger
 *  /users:
 *  get:
 *     description: "it will fetch all the users information"
 *     responses:
 *        '200':
 *          description: "success"
*/
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    res.status(500).send();
  }
});


/**
 * @swagger
 * /users/{id}:
 *   get:
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

router.get('/users/:id', async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (e) {
    res.status(500).send();
  }
});

router.patch('/users/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'password', 'age', 'city'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({error: 'Invalid updates!'});
  }

  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});

    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});


/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: delete user record in db.
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
 *         description: record deleted.
 */

router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
