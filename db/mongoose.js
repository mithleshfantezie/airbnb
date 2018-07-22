var mongodb = require('mongodb');
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/airbnb');


module.exports = mongoose;
