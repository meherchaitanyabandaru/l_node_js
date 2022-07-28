const mongoose = require('mongoose');
const validator = require('validator');

const Post = mongoose.model('Post', {
  postname: {
    type: String,
    required: true,
    trim: true,
  },
  postdescription: {
    type: String,
    required: true,
    trim: true,
  },
  postedby: {
    type: String,
    required: true,
    trim: true,
  },
  postedon: {
    type: String,
    required: false,
    trim: true,
  },
  postupdatedon: {
    type: String,
    required: false,
    trim: true,
  },
});

module.exports = Post;