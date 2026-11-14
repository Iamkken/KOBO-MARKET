const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

   title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 150
  },

   message: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500
  },

  type: {
    type: String,
    enum: [
      "order",
      "payment",
      "dispute",
      "payout",
      "system"
    ],
    required: true
  },

  isRead: {
    type: Boolean,
    default: false
  },

  referenceId: {
    type: String,
    default: null
  }

}, {
  timestamps: true
});

notificationSchema.index({
  user: 1,
  createdAt: -1
});

const Notification = mongoose.model(
  "Notification",
  notificationSchema
);

module.exports = Notification;