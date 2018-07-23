var express = require('express');
var morgan = require('morgan');
var port = process.env.PORT || 3004;
var bodyParser = require('body-parser');
var cors = require('cors');
require('./db/mongoose');


var userRoute = require('./routes/user');
var rentalsRoute = require('./routes/rentals');
var bookingsRoute = require('./routes/bookings');

var app = express();



app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());



app.use('/api/v1/user',userRoute);
app.use('/api/v1/rental',rentalsRoute);
app.use('/api/v1/booking',bookingsRoute);



app.listen(port, () => {
  console.log(`Server listening to Port: ${port}`);
});
