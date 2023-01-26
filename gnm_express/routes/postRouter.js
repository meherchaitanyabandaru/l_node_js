const express = require('express');
const router = new express.Router();
const postController = require('../controllers/postController');
const {verifyToken, isAdmin, isModeratorOrAdmin} = require('../middlewares/authJwt');

router.route('/')
    .post(isAdmin, verifyToken, postController.createNewPost)
    .get(isModeratorOrAdmin, postController.getAllPosts)
    .patch(postController.updatePost)
    .delete(postController.deletePost);

router.route('/:id')
    .get(postController.getPost);

module.exports = router;
