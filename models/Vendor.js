const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
    user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },

  storeName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
    unique: true
  },

  description: {
    type: String,
    trim: true,
    maxlength: 500
  },

   status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  },

  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  },

  reviewedAt: {
    type: Date,
    default: null
  },

  rejectionReason: {
    type: String,
    trim: true,
    default: null
  }

  }, {
  timestamps: true
});

const Vendor = mongoose.model("Vendor", vendorSchema);

module.exports = Vendor;