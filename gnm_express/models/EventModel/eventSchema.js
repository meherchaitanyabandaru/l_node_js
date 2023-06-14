const mongoose = require('mongoose');
const {Schema} = mongoose;


const userSchema = new Schema({
  eventName: {
    type: String,
    required: true,
    trim: true,
  },
  eventStartDate: {
    type: Date,
    min: '2023-01-01',
    max: '2024-12-31',
    required: true,
    trim: true,
  },
  eventEndDate: {
    type: Date,
    min: '2023-01-01',
    max: '2024-12-31',
    required: true,
    trim: true,
  },
  registredUserID: {
    type: String,
    required: true,
    trim: true,
  },
  registredUserName: {
    type: String,
    required: true,
    trim: true,
  },
  approvalUserID: {
    type: String,
    required: true,
    trim: true,
  },
  approvalUserName: {
    type: String,
    required: true,
    trim: true,
  },
  amountPaid: {
    type: Number,
    min: 100,
    max: 10000,
    required: true,
    trim: true,
  },
  paymentReceiptID: {
    type: String,
    min: 100,
    max: 10000,
    required: true,
    trim: true,
  },
  remarks: {
    type: String,
    required: false,
    trim: true,
  },
  registrationStatus: {
    type: Boolean,
    required: true,
    trim: true,
  },
}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}});

module.exports = userSchema;
