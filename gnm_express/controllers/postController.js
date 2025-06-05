/* eslint-disable max-len */
const timestamp = require('time-stamp');
const PostModel = require('../models/postModel');

const createNewPost = ('/posts', async (req, res) => {
  req.body.postedon = timestamp('YYYY/MM/DD:mm:ss').toString();
  const post = new PostModel(req.body);

  try {
    await post.save();
    res.status(201).send(post);
  } catch (e) {
    res.status(400).send(e);
  }
});


const getAllPosts = ('/posts', async (req, res) => {
  try {
    const posts = await PostModel.find({});
    res.send(posts);
  } catch (e) {
    res.status(500).send();
  }
});

// sample code modified to test the github


const getPost = ('/posts/:id', async (req, res) => {
  const _id = req.params.id;

  try {
    const post = await PostModel.findById(_id);

    if (!post) {
      return res.status(404).send();
    }

    res.send(post);
  } catch (e) {
    res.status(500).send();
  }
});


const updatePost = ('/posts/:id', async (req, res) => {
  req.body.postupdatedon = timestamp('YYYY/MM/DD:mm:ss').toString();
  const updates = Object.keys(req.body);
  const allowedUpdates = ['postname', 'postdescription', 'postedby', 'postupdatedon'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({error: 'Invalid updates!'});
  }

  try {
    const post = await PostModel.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});

    if (!post) {
      return res.status(404).send();
    }

    res.send(post);
  } catch (e) {
    res.status(400).send(e);
  }
});


const deletePost = ('/posts/:id', async (req, res) => {
  try {
    const post = await PostModel.findByIdAndDelete(req.params.id);

    if (!post) {
      return res.status(404).send();
    }

    res.send(post);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = {
  createNewPost,
  getAllPosts,
  getPost,
  updatePost,
  deletePost,
};
