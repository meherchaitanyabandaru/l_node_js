/* eslint-disable max-len */
const jwt = require('jsonwebtoken');
const dotenvConfig = require('dotenv').config();
const UserModel = require('../models/UserModel/userModel');
const {forbiddenError, internalServerError, unAuthorisedError}=
require('../utils/customHttpMessages');


verifyToken = (req, res, next) => {
  // Extract the token from the request headers
  const token = req?.headers?.authorization?.replace('Bearer ', '');

  // If no token is provided, return a forbidden error
  if (!token) {
    return res.status(403).send(forbiddenError('No token provided!'));
  }

  // Verify the token using the JWT library and the secret key from the environment variables
  jwt.verify(token, dotenvConfig.parsed.JWT_SECRECT, (err, decoded) => {
    // If there's an error while verifying the token, return an unauthorized error
    if (err) {
      return res.status(401).send(unAuthorisedError('User Session got Expired / Invalid Token, Please login again..!'));
    }
    // If the token is valid, extract the email from the decoded token and attach it to the request object
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
