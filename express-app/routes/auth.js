/* eslint-disable max-len */
const express = require('express');
const User = require('../models/user');
const router = new express.Router();
const jwt = require('jsonwebtoken');

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
 *                       example: sowmya.chappidi02@gmail.coms
 *                     password:
 *                       type: string
 *                       description: user password.
 *                       example: sowmya123
*/

router.post('/login', async (req, res) => {
  const user = await User.find(req.body);
  try {
    if (!user[0]?.email) {
      res.status(404).send({'Error-Message': 'invalid credentials'});
    } else {
      const token = jwt.sign({email: user[0]?.email, password: user[0]?.password}, 'shhhhh', {expiresIn: '15s'});
      const authenticationResponse={
        'authenticationStatus': true,
        'Access-Token': token,
      };
      res.status(200).send(authenticationResponse);
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post('/verifyToken', async (req, res) => {
  const token = req.body.token;
  console.log(token);
  try {
    const verifiedToken = jwt.verify(token, 'shhhhh');
    if (verifiedToken?.email) {
      const tokenVerificationStatus={
        'isTokenValid': true,
        'Access-Token': token,
      };
      res.status(200).send(tokenVerificationStatus);
    }
  } catch (e) {
    res.status(400).send(e);
  }
});


module.exports = router;
