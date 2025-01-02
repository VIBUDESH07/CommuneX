const mongoose = require('mongoose');
const messageSchema = new mongoose.Schema(
  {
    content: {
      type: String, 
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false } 
);
const friendSchema = new mongoose.Schema(
  {
    friend: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User',
      required: true,
    },
    messages: [messageSchema], 
    tag: {
      type: String,
      default: '', 
    },
  },
  { _id: false } 
);

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    localCommunity: {
      type: String,
      default: '',
    },
    address: {
      type: String,
      default: '',
    },
    contactNumber: {
      type: String,
      default: '',
    },
    profilePicture: {
      type: String,
      default: '',
    },
    skills: {
      type: [String],
      default: [],
    },
    friends: [friendSchema],
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model('User', userSchema);
