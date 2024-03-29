/* eslint-disable max-len */
const jwt = require('jsonwebtoken');
const dotenvConfig = require('dotenv').config();
const UserModel = require('../models/UserModel/userModel');
const {forbiddenError, internalServerError, unAuthorisedError}=
require('../utils/customHttpMessages');


verifyToken = (req, res, next) => {
  const token = req?.headers?.authorization?.replace('Bearer ', '');

  if (!token) {
    return res.status(403).send(forbiddenError('No token provided!'));
  }

  jwt.verify(token, dotenvConfig.parsed.JWT_SECRECT, (err, decoded) => {
    if (err) {
      return res.status(401).send(unAuthorisedError('User Session got Expired / Invalid Token, Please login again..!'));
    }
    req.email = decoded.email;
    next();
  });
};

isAdmin = async (req, res, next) => {
  try {
    const user = await UserModel.find({email: req.email});
    const roles = user[0].usertype;
    console.log(roles);
    for (let i = 0; i < roles.length; i++) {
      if (roles[i] === 'admin') {
        return next();
      }
    }

    return res.status(403).send(forbiddenError('forbiddenError Role Access'));
  } catch (error) {
    // eslint-disable-next-line max-len
    return res.status(500).send(internalServerError('Unable to validate User role!'));
  }
};

isModerator = async (req, res, next) => {
  try {
    const user = await UserModel.find({$and:
      [{email: 'jhansibandaru971@gmail.com'},
        {usertype: 'default'}]});
    const roles = user[0].usertype;
    console.log(roles);

    for (let i = 0; i < roles.length; i++) {
      if (roles[i] === 'default') {
        return next();
      }
    }

    return res.status(403).send(forbiddenError('forbidden Role access'));
  } catch (error) {
    return res.status(500).send(internalServerError('Unable to validate User role!'));
  }
};

const authJwt = {
  verifyToken,
  isAdmin,
  isModerator,
};
module.exports = authJwt;
