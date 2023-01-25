const express = require('express');
const router = new express.Router();
const userController = require('../controllers/userController');

router.route('/')
    .post(userController.createNewUser)
    .get(userController.getAllUsers)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

router.route('/:email/:phoneNumber')
    .get(userController.getUser);

module.exports = router;
