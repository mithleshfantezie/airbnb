var express = require('express');
var morgan = require('morgan');
var port = process.env.PORT || 3004;
var bodyParser = require('body-parser');



var app = express();

app.use(bodyParser.json());
app.use(morgan('dev'));


app.get('/', (req,res)=>{
  res.json({"HEllo":"Hey"});
});

app.listen(port, () => {
  console.log(`Server listening to Port: ${port}`);
});
