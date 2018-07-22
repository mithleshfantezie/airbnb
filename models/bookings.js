var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = require('./user');
var Rentals = require('./rentals');

var BookingsSchema = new Schema({
  startAt: {type: Date, required: 'Starting Date is Required!'},
  endAt: {type: Date, required: 'End Date is Required!'},
  totalPrice: Number,
  days: Number,
  guests: Number,
  createAt: {type:Date , default: Date.now},
  user: {type: Schema.Types.ObjectId, ref: 'User' },
  rentals: {type: Schema.Types.ObjectId, ref:'Rentals'}
});
