const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel/userModel');


verifyToken = (req, res, next) => {
  const token = req.body?.token;

  if (!token) {
    return res.status(403).send({
      message: 'No token provided!',
    });
  }

  jwt.verify(token, dotenvConfig.parsed.JWT_SECRECT, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: 'Unauthorized!',
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = async (req, res, next) => {
  try {
    const user = await UserModel.find({$and:
      [{email: 'jhansibandaru971@gmail.com'},
        {usertype: 'default'}]});
    const roles = user[0].usertype;
    console.log(roles);

    for (let i = 0; i < roles.length; i++) {
      if (roles[i] === 'admin') {
        return next();
      }
    }

    return res.status(403).send({
      message: 'Unauthorized Role',
    });
  } catch (error) {
    return res.status(500).send({
      message: 'Unable to validate User role!',
    });
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

    return res.status(403).send({
      message: 'Unauthorized Role',
    });
  } catch (error) {
    return res.status(500).send({
      message: 'Unable to validate User role!',
    });
  }
};

isModeratorOrAdmin = async (req, res, next) => {
  try {
    const user = await UserModel.find({$and:
      [{email: 'jhansibandaru971@gmail.com'},
        {usertype: 'test'}]});
    const roles = user[0].usertype;

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === 'default') {
        return next();
      }

      if (roles[i].name === 'admin') {
        return next();
      }
    }

    return res.status(403).send({
      message: 'Require Moderator or Admin Role!',
    });
  } catch (error) {
    return res.status(500).send({
      message: 'Unable to validate Moderator or Admin role!',
    });
  }
};
const authJwt = {
  verifyToken,
  isAdmin,
  isModerator,
  isModeratorOrAdmin,
};
module.exports = authJwt;
