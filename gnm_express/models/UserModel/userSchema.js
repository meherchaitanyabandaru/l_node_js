const mongoose = require('mongoose');
const {Schema} = mongoose;
const validator = require('validator');


const userSchema = new Schema({
  fullName: {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    middleName: {
      type: String,
      required: false,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
  },
  dateOfBirth: {
    type: Date,
    // The dates of the first and last episodes of
    // Star Trek: The Next Generation
    min: '1950-01-01',
    max: '2022-12-31',
    required: true,
    trim: true,
  },
  gender: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid');
      }
    },
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    doorNo: {
      type: String,
      required: true,
      trim: true,
    },
    streetName: {
      type: String,
      required: true,
      trim: true,
    },
    areaName: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
    zipcode: {
      type: String,
      required: true,
      trim: true,
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes('password')) {
        throw new Error('Password cannot contain "password"');
      }
    },
  },
  usertype: {
    type: String,
    required: true,
    trim: true,
  },
  UID: {
    type: String,
    required: true,
    trim: true,
  },
}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}});

module.exports = userSchema;
