/* eslint-disable max-len */
const express = require('express');
const User = require('../models/user');
const router = new express.Router();


// Routes

/**
 * @swagger
 * /login:
 *   post:
 *     "tags": ["Login"]
 *     summary: Create a new user.
 *     responses:
 *       200:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                     email:
 *                       type: string
 *                       description: user email.
 *                       example: sowmya.chappidi02@gmail.com
 *                     password:
 *                       type: string
 *                       description: user password.
 *                       example: sowmya1234
*/

router.post('/login', async (req, res) => {
  const user = await User.find(req.body);
  try {
    if (!user[0]?.email) {
      res.status(404).send({'Error-Message': 'invalid credentials'});
    } else {
      res.status(200).send(user);
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
