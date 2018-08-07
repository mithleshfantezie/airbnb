var express = require('express');
var morgan = require('morgan');
var port = process.env.PORT || 3004;
var bodyParser = require('body-parser');
var cors = require('cors');
require('./db/mongoose');
var path = require('path');

var userRoute = require('./routes/user');
var rentalsRoute = require('./routes/rentals');
var bookingsRoute = require('./routes/bookings');

var app = express();


app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));





app.use('/api/v1/user',userRoute);
app.use('/api/v1/rentals',rentalsRoute);
app.use('/api/v1/bookings',bookingsRoute);

app.use(express.static(path.join(__dirname,'/build')));
app.get('*',function(req,res){
  res.sendFile(path.join(__dirname,'/build','index.html'));
});


app.listen(port, () => {
  console.log(`Server listening to Port: ${port}`);
});
