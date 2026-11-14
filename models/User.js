const mongoose = require('mongoose');

const refreshSessionSchema = new mongoose.Schema({
  tokenHash: {
    type: String,
    required: true
  },

  expiresAt: {
    type: Date,
    required: true
  },

  revokedAt: {
    type: Date,
    default: null
  }
}, { _id: false });

const userSchema = new mongoose.Schema({

  fullName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },

  passwordHash: {
    type: String,
    required: true,
    select: false
  },

  roles: {
    type: [{
      type: String,
      enum: ["buyer", "vendor", "admin"]
    }],
    default: ["buyer"]
  },

  phone: {
    type: String,
    trim: true
  },

  isEmailVerified: {
    type: Boolean,
    default: false
  },

  emailVerificationTokenHash: {
    type: String,
    select: false
  },

  emailVerificationExpiresAt: {
    type: Date
  },

  passwordResetTokenHash: {
    type: String,
    select: false
  },

  passwordResetExpiresAt: {
    type: Date
  },

  status: {
    type: String,
    enum: ["active", "frozen"],
    default: "active"
  },

  refreshSessions: {
    type: [refreshSessionSchema],
    default: []
  }

}, {
  timestamps: true
});

const User = mongoose.model("User", userSchema);

module.exports = User;
