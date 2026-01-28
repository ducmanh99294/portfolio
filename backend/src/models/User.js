const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    enum: ["guest", "customer", 'admin'],
    default: 'guest'
  },
  refreshToken: {
    type: String
  },
  isBanned: {
    type: Boolean,
    default: false
  },
  bannedAt: Date,
  banReason: String
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)
