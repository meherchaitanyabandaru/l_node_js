const express = require('express');
const router = new express.Router();
const userController = require('../controllers/userController');
const {verifyToken, isAdmin} =
require('../middlewares/authJwt');

router.route('/')
    .post(userController.createNewUser)
    .get(verifyToken, isModerator, userController.getAllUsers)
    .patch(verifyToken, isModerator, userController.updateUser)
    .delete(verifyToken, isAdmin, userController.deleteUser);

router.route('/:email')
    .get(verifyToken, isModerator, userController.getUser);

module.exports = router;
