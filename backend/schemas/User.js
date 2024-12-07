const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
  resources: {
    type: [String], 
    default: [], 
  },
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
    },
  ],
  role: {
    type: String,
    enum: ['user', 'admin'], 
    default: 'user',
  },
}, 
{
  timestamps: true, // Automatically add createdAt and updatedAt fields
});

module.exports = mongoose.model('User', userSchema);
