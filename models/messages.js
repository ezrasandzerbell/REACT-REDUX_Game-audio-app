"use strict"
var mongoose = require('mongoose');

var messageSchema = mongoose.Schema({
  name: String,
  title: String,
  message: String
})

var Messages = mongoose.model('Messages', messageSchema);
module.exports = Messages;
