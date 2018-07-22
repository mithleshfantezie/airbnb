var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = require('./user');
var Booking = require('./bookings');

var RentalsSchema = new Schema({
  title: {
    type: String,
    required: true,
    max: [128, 'Too Long, Max is 128 Characters!']
  },
  city: {
    type: String,
    required: true,
    lowercase: true
  },
  street: {
    type:String,
    required:true,
    min: [4,'Too Short, min is 4 Characters!']
  },
  category: {
    type:String,
    required: true,
    lowercase: true
  },
  image: {
    type: String,
    required: true
  },
  bedrooms: Number,
  shared: Boolean,
  description: {
    type:String,
    required: true
  },
  dailyRate: Number,
  createAt: {type:Date, default: Date.now},
  user: {type: Schema.Types.ObjectId, ref:'User'},
  bookings: [{type: Schema.Types.ObjectId, ref:'Bookings'}]
});


module.exports = mongoose.model('Rentals', RentalsSchema);
