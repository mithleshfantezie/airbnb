var router = require('express').Router();
var {ObjectId} = require('mongodb');
var Rentals = require('../models/rentals');
var User = require('../models/user');
var Bookings = require('../models/bookings');
var auth = require('../middleware/auth');


router.get('/manage',auth.checkJWT,(req,res,next)=>{
  const user = res.locals.user;

  Rentals.where({user: user._id})
         .populate('bookings')
         .exec(function(err,rentals){
           if(err){
             return next(err);
          }
          return res.send(rentals);
         })
});


router.get('/:id',(req,res,next)=>{
  const id = req.params.id;

  if(!ObjectId.isValid(id)){
    return res.status(422).send({errors:[{title:'Invalid ID!',detail:'The Rental Id is invalid!'}]});
  }

  Rentals.findById(id)
         .populate('user','username -_id')
         .populate('bookings','startAt endAt -_id')
         .exec(function(err,foundRental){
           if(err) {
              return next(err);
           }
           res.send(foundRental);

         });
});


router.delete('/:id',auth.checkJWT,(req,res,next)=>{
  const id = req.params.id;
  const user = res.locals.user;

  if(!ObjectId.isValid(id)){
    return res.status(422).send({errors:[{title:'Invalid ID!',detail:'The Rental Id is invalid!'}]});
  }

Rentals.findById(id)
       .populate('user','_id')
       .populate({
         path: 'bookings',
         select: 'startAt',
         match: {startAt: {$gt: new Date()}}
       })
       .exec(function(err,rental){
  if(err) {
   return next(err);
  }
  if(String(rental.user._id) !== String(user._id)){
    return res.status(422).send({errors:[{title:'Invalid User!',detail:'You do not have Permission to Perform this operation!'}]});
  }

  if(rental.bookings.length > 0 ){
    return res.status(422).send({errors:[{title:'Invalid Opertaion!',detail:'Unable to delete the Rental with active Booking(s)'}]});
  }

  rental.remove(function(err){
    if(err) {
     return next(err);
    }

    res.send({'Success':'Successfully Removed the Rental!'});
  });


});


});

router.post('/',auth.checkJWT,(req,res,next)=>{
  const user = res.locals.user;

  const {title,city,street,category,image,bedrooms,shared,description,dailyRate} = req.body;

  const rental = new Rentals({title,city,street,category,image,bedrooms,shared,description,dailyRate});
  rental.user = user._id;

 Rentals.create(rental,function(err,newRental) {
   if(err) {
     return next(err);
   }

   User.update({_id:user._id},{$push:{rentals:rental._id}},function(){});

     return res.json(newRental);



 });


});


router.get('/',(req,res,next)=>{
  const query = req.query.city;
  if(query) {
    const city = query.toLowerCase();
    Rentals.find({})
           .select('-bookings')
           .exec(function(err,foundRentals){
             if(err) {
               return next(err);
            }
            const rentals = [];

            foundRentals.map((item)=>{
              if(item.city.includes(city)){
                rentals.push(item);
              }
            });
            return res.send(rentals);

          });
  }else{
    Rentals.find({})
           .select('-bookings')
           .exec(function(err,rentals){
             if(err){
               return next(err);
             }
             return res.send(rentals);
           })

  }

});

module.exports = router;
