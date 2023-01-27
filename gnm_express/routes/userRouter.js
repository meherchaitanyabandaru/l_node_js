const express = require('express');
const router = new express.Router();
const userController = require('../controllers/userController');
const {verifyToken, isAdmin} =
require('../middlewares/authJwt');

router.route('/')
    .post(userController.createNewUser)
    .get( userController.getAllUsers)
    .get(verifyToken, isModerator, userController.getUser)
    .patch(verifyToken, isModerator, userController.updateUser)
    .delete(verifyToken, isAdmin, userController.deleteUser);

router.route('/self')
    .get(verifyToken, isModerator, userController.getUser);

module.exports = router;
