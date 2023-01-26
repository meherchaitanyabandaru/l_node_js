/* eslint-disable max-len */
const express = require('express');
const dotenvConfig = require('dotenv').config();
const UserModel = require('../models/UserModel/userModel');
const router = new express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


router.post('/login', async (req, res) => {
  let queryFilter='NA';
  if (req.body?.email) {
    queryFilter={email: req.body.email};
  } else if (req.body?.UID) {
    queryFilter={UID: req.body.UID};
  } else if (req.body.phoneNumber) {
    queryFilter={phoneNumber: req.body.phoneNumber};
  }
  const user = await UserModel.find(queryFilter);
  let isValidPassword = null;
  if (user[0]?.password) {
    isValidPassword = bcrypt.compareSync(req?.body?.password, user[0]?.password);
  }
  try {
    if (!user[0]?.email || !isValidPassword) {
      res.status(404).send({'Error-Message': 'invalid credentials'});
    } else {
      const token = jwt.sign({email: user[0]?.email, password: user[0]?.password}, dotenvConfig.parsed.JWT_SECRECT, {expiresIn: dotenvConfig.parsed.JWT_EXPIRY});
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
  const token = req.body.accessToken;
  try {
    const verifiedToken = jwt.verify(token, dotenvConfig.parsed.JWT_SECRECT);
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
