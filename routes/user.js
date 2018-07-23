var router = require('express').Router();
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var keys = require('../secret/keys');
var auth = require('../middleware/auth');

router.get('/',auth.checkJWT,(req,res)=>{
const user = res.locals.user;
User.findById(user._id)
    .select('-password')
    .populate('rentals')
    .populate('bookings')
    .exec(function(err,user){
      if(err){
        return next(err);
      }
        return res.send(user);
    })

});

router.post('/', (req,res,next)=>{
  var { username, email, password} = req.body;

  if(!username || !password || !username){
    return res.status(422).send({errors:[{title:'Field Empty!',detail:'You cannot leave the field Empty!'}]});
  }

  var user = new User({username,email,password});

var u = username.toLowerCase();
var e = email.toLowerCase();


  User.findOne({email:e}, function(err,foundUser){
    if(err){
      return next(err);
    }
    if(foundUser){
      return res.status(422).send({errors:[{title:'Email Used Already!',detail:'Account with this Already Exits!'}]});
    }
  });

  user.save(function(err){
    if(err){
      return next(err);
    }

    return res.json({"Success":"User Registered!"});
  })


});


router.post('/login',(req,res,next)=>{
  const {email, password} = req.body;

  if(!email || !password) {
  return  res.status(422).send({errors:[{title:'Empty Field!',detail:'You cannot leave the field Empty'}]});
  }

  User.findOne({email},function(err,foundUser){
    if(err) {
      return next(err);
    }
    if(!foundUser) {
      return res.status(422).send({errors:[{title:'Invalid Credentials!',detail:'Username or Password didnot matched!'}]});
    }
      const isMatched = foundUser.comparePassword(password);
    if(!isMatched) {
          return res.status(422).send({errors:[{title:'Invalid Credentials!',detail:'Username or Password didnot matched!'}]});
    }else{
      const token = jwt.sign({
        _id: foundUser._id,
        username: foundUser.username
      },keys.secret,{expiresIn: '7d'});
      res.json({"Success":"Login Successful","token":token});
    }



  })

});

module.exports = router;
