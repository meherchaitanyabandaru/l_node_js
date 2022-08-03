/* eslint-disable max-len */
const {request} = require('express');
const express = require('express');
const timestamp = require('time-stamp');
const Post = require('../models/post');
const router = new express.Router();


// Routes

/**
 * @swagger
 * /posts:
 *   post:
 *     "tags": ["Posts"]
 *     summary: Create a new Post.
 *     description: this is used to insert a new post into db.
 *     requestBody:
 *          required: true 
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                     postname:
 *                       type: string
 *                       description: post name.
 *                       example: my post title
 *                     postdescription:
 *                       type: string
 *                       description: The post description.
 *                       example: my sample post description
 *                     postedby:
 *                       type: string
 *                       description: The posted by.
 *                       example: MEHAR BANDARU
*/

const createNewPost = ('/posts', async (req, res) => {
  req.body.postedon=timestamp('YYYY/MM/DD:mm:ss').toString();
  const post = new Post(req.body);

  try {
    await post.save();
    res.status(201).send(post);
  } catch (e) {
    res.status(400).send(e);
  }
});


// Routes
/**
 *  @swagger
 *  /posts:
 *  get:
 *     "tags": ["Posts"]
 *     description: "it will fetch all the posts information"
 *     responses:
 *        '200':
 *          description: "success"
*/
const getAllPosts = ('/posts', async (req, res) => {
  try {
    const posts = await Post.find({});
    res.send(posts);
  } catch (e) {
    res.status(500).send();
  }
});

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     "tags": ["Posts"]
 *     summary: fetch the post by id.
 *     description: Retrieve a single JSONPlaceholder user. Can be used to populate a user profile when prototyping or testing an API.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: record fetched.
 */

const getPost = ('/posts/:id', async (req, res) => {
  const _id = req.params.id;

  try {
    const post = await Post.findById(_id);

    if (!post) {
      return res.status(404).send();
    }

    res.send(post);
  } catch (e) {
    res.status(500).send();
  }
});


/**
 * @swagger
 * /posts/{id}:
 *   patch:
 *     "tags": ["Posts"]
 *     summary: update the record.
 *     description: Retrieve a single JSONPlaceholder user. Can be used to populate a user profile when prototyping or testing an API.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: string
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                            postname:
 *                               type: string
 *                               description: post name.
 *                               example: my post title
 *                            postdescription:
 *                               type: string
 *                               description: The post description.
 *                               example: my sample post description
 *                            postedby:
 *                               type: string
 *                               description: The posted By.
 *                               example: MEHAR BANDARU
 * 
 *     responses:
 *       200:
 *         description: record updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                     postname:
 *                       type: string
 *                       description: post name.
 *                       example: my post title
 *                     postdescription:
 *                       type: string
 *                       description: The post description.
 *                       example: my sample post description
 *                     postedby:
 *                       type: string
 *                       description: The posted by.
 *                       example: MEHAR BANDARU
 */

const updatePost = ('/posts/:id', async (req, res) => {
  req.body.postupdatedon=timestamp('YYYY/MM/DD:mm:ss').toString();
  const updates = Object.keys(req.body);
  const allowedUpdates = ['postname', 'postdescription', 'postedby', 'postupdatedon'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({error: 'Invalid updates!'});
  }

  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});

    if (!post) {
      return res.status(404).send();
    }

    res.send(post);
  } catch (e) {
    res.status(400).send(e);
  }
});


/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     "tags": ["Posts"]
 *     summary: it will delete the post.
 *     description: Retrieve a single JSONPlaceholder user. Can be used to populate a user profile when prototyping or testing an API.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: post deleted.
 */

const deletePost = ('/posts/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) {
      return res.status(404).send();
    }

    res.send(post);
  } catch (e) {
    res.status(500).send();
  }
});

//module.exports = router;
module.exports = {
  createNewPost,
  getAllPosts,
  getPost,
  updatePost,
  deletePost
}
