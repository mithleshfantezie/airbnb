
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bcrypt = require('bcryptjs');


var Rentals = require('./rentals');
var Bookings = require('./bookings');

var UserSchema = new Schema({
  username: {
    type: String,
    lowercase:true
  },
  email: {
    type:String,
    lowercase:true,
    unique: true,
    required: 'Email is required!'
  },
  password: {
    type: String,
    required: 'Password is required!'
  },
  rentals: [{type: Schema.Types.ObjectId, ref: 'Rentals'}],
  bookings: [{type: Schema.Types.ObjectId, ref: 'Bookings'}]
});

UserSchema.pre('save', function(next){
  var user = this;

  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
        user.password = hash;
        next();
    });
});

});

UserSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password); // true
}








module.exports = mongoose.model('User',UserSchema);
