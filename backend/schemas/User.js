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
    required: false, 
    default: '',     
  },
  address: {
    type: String,
    required: false, 
    default: '',      
  },
  contactNumber: {
    type: String,
    required: false,  
    default: '',   
  },
  profilePicture: {
    type: String,
    default: '',  
  },
  skills: {
    type: [String], 
    default: [],  
  resources: {
    type: [String], 
    default: [],    
  }},
  role: {
    type: String, 
    default: 'user',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', userSchema);
