var mongodb = require('mongodb');
var mongoose = require('mongoose');
var keys = require('../secret/keys');

mongoose.Promise = global.Promise;

mongoose.connect(keys.mongoURI,{ useNewUrlParser: true });


module.exports = mongoose;
