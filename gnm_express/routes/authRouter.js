/* eslint-disable max-len */
const express = require('express');
const UserModel = require('../models/UserModel/userModel');
const router = new express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


router.post('/login', async (req, res) => {
  const user = await UserModel.find({email: req.body.email});
  let isValidPassword = null;
  if (user[0]?.password) {
    isValidPassword = bcrypt.compareSync(req?.body?.password, user[0]?.password);
  }
  try {
    if (!user[0]?.email || !isValidPassword) {
      res.status(404).send({'Error-Message': 'invalid credentials'});
    } else {
      const token = jwt.sign({email: user[0]?.email, password: user[0]?.password}, 'shhhhh', {expiresIn: '15s'});
      const authenticationResponse = {
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
  try {
    const verifiedToken = jwt.verify(token, 'shhhhh');
    if (verifiedToken?.email) {
      const tokenVerificationStatus = {
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
