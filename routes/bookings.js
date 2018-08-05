var router = require('express').Router();
var moment = require('moment');
var {ObjectId} = require('mongodb');

var Bookings = require('../models/bookings');
var User = require('../models/user');
var Rentals = require('../models/rentals');


var auth = require('../middleware/auth');

router.post('/',auth.checkJWT,(req,res,next)=>{
    const user = res.locals.user;

    const { startAt, endAt, totalPrice, guests, days, rental} = req.body;



    const booking = new Bookings({startAt, endAt,totalPrice,guests,days});

    Rentals.findById(rental)
           .populate('bookings')
           .populate('user')
           .exec(function(err,foundRental){
             if(err) {
               return next(err);
             }


             if(String(foundRental.user._id) === String(user._id)){
               return res.status(422).send({errors:[{title:'Invalid Operation!',detail:'You cannot create Booking on your own Rental'}]})
             }

             if(isValidBooking(booking,foundRental)){
               booking.user = user._id;
               booking.rentals = foundRental._id;
               foundRental.bookings.push(booking._id);

               booking.save(function(err){
                 if(err){
                   return next(err);
                 }

                 foundRental.save();
                 User.update({_id:user._id},{$push:{bookings:booking._id}},function(){});

                 res.json({startAt: booking.startAt,endAt:booking.endAt});
               });

             }else{
               return res.status(422).send({errors:[{title:'Booking Error!',detail:'Choosen Dates not Available for Booking!'}]});
             }

           });
});

router.get('/manage',auth.checkJWT,(req,res,next)=>{
  const user = res.locals.user;



  Bookings.find({user: user._id})
          .populate('rentals')
          .exec(function(err,foundBookings){
              if(err){
                return next(err);
              }

              return res.send(foundBookings);
          });

});

router.get('/rental/:id',auth.checkJWT,(req,res,next)=>{
  const user = res.locals.user;
  const rentalId = req.params.id;

  if(!ObjectId.isValid(rentalId)){
    return res.status(422).send({errors:{title:'Invalid Id!',detail:'Sorry! You Encountered a Broken Link!'}});
  }

  Bookings.where({rentals: rentalId})
    .populate('user','-password -bookings -rentals -_id')
    .populate('rentals','user')
    .exec(function(err,booking){

      if(err) {
        return next(err);
      }



      if(booking && booking.length > 0){

        if(String(booking[0].rentals.user) !== String(user._id)) {
          return res.status(422).send({errors:{title:'Invalid User!', detail:'Not Authorized to see the detail!'}});
        }
        res.json(booking);
      }else{
        return res.status(422).send({errors:{title:'Empty Booking!', detail:'No Booking has been made in the Rental!'}});

      }
});
});

function isValidBooking(proposedBooking,choosenRental) {
  let isValid = true;

  if(choosenRental.bookings && choosenRental.bookings.length > 0) {

    isValid = choosenRental.bookings.every(function(item){
      const proposedStartAt = moment(proposedBooking.startAt);
      const proposedEndAt = moment(proposedBooking.endAt);



      const choosenStartAt = moment(item.startAt);
      const choosenEndAt = moment(item.endAt);

      return ((choosenStartAt < proposedStartAt && choosenEndAt < proposedStartAt) || (proposedEndAt < choosenEndAt && proposedEndAt < choosenStartAt));

    });


  }

  return isValid;
}
module.exports = router;
