var jwt = require('jsonwebtoken');
var User = require('../models/user');
var keys = require('../secret/keys');



function notAuthorized(res) {
  return res.status(422).send({errors:[{title:'Authorization Failed!',detail:'You Must Login to Continue!'}]})
}

exports.checkJWT = function(req,res,next) {
 var token = req.headers['authorization'];

 if(token) {

   jwt.verify(token,keys.secret,function(err,decoded){
     if(err){
       return res.status(422).send({errors:[{title:'Invalid Token',detail:'Token is invalid!'}]});
     }
     const user = decoded;
     User.findById(user._id)
          .select('-password')
          .exec(function(err,user){
       if(err) {
         return next(err);
       }
       if(!user) {
         notAuthorized(res);
       }

       res.locals.user = user;
       next();

     });


   });


 }else {
   return res.status(422).send({errors:[{title:'Token Missing!',detail:'No Token Available!'}]})

 }

}
