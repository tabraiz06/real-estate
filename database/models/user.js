const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({ 
  username:String,
  userID:String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

const usermodel = mongoose.model('User', userSchema);

module.exports = usermodel;
