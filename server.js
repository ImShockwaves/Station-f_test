var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require("mongodb").MongoClient;
var fs = require('fs');
 
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res, next){
  res.render('./public/index.html');
});

app.post('/endpoint', function(req, res){
  fs.readFile('public/api/reservation.json', 'utf8', function readFileCallback(err, data)
  {
    if (err)
        console.log(err);
    else
    {
      var obj = JSON.parse(data);
      obj.reservation.push({'name': req.body.name, 'date': req.body.date});
      json = JSON.stringify(obj);
      fs.writeFile('public/api/reservation.json', json, 'utf8', (err) => { console.log(err); });
    }
  });
  res.send(req.body);
});

app.listen(8333);



db.createUser(
  {
    user: "servUser",
    pwd: "tyJKUUY5",
    roles: [ { role: "readWrite", db: "Station_F" }]
  }
)