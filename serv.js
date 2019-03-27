var express = require('express');
 
var app = express();

app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res, next){
  res.render('./public/index.html');
});
app.listen(8333);