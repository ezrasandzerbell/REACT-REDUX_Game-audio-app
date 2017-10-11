"use strict"
var mongoose = require('mongoose');

var ostSchema = mongoose.Schema({
  gameTitle: String,
  composer: String,
  publisher: String,
  releaseDate: String,
  description: String,
  trackList: String,
  images: String,
  url: String
})

var Osts = mongoose.model('Osts', ostSchema);
module.exports = Osts;
