const mongoose = require('mongoose');

const idCounterSchema = new mongoose.Schema({ 
  userID:Number,
  ppdID:Number
});

const idmodel = mongoose.model('idcounter', idCounterSchema);

module.exports = idmodel;