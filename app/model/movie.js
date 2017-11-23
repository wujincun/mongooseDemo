let mongoose = require('mongoose');
let MovieSchema = require('../schema/movie');
let Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie