const express = require('express');
const router = new express.Router();
const Post = require('../models/post');
const postController = require('../controllers/postController');

router.route('/')
  .post(postController.createNewPost)
  .get(postController.getAllPosts)
  .patch(postController.updatePost)
  .delete(postController.deletePost)

router.route('/:id')
  .get(postController.getPost);

module.exports = router;
