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
			var newobj = {'name': req.body.name, 'date': req.body.date};
			obj.reservation.push(newobj);
			json = JSON.stringify(obj);
			fs.writeFile('public/api/reservation.json', json, 'utf8', (err) => { console.log(err); });
			MongoClient.connect("mongodb://ec2-35-180-109-215.eu-west-3.compute.amazonaws.com:27017/Station_F", function(error, db) {
				if (error)
					console.log(error);
				var collections;
				db.listCollections().toArray(function(err, collection) {
					if (err)
						throw error;
					else
						collections = collection;
				});
				console.log(collections);
				if (!collections.find("reservation"))
					db.createCollection("reservation");
				else
				{
					db.collection("reservation").insert(newobj, null, function (error, results) {
						if (error)
							throw error;
						console.log("Le document a bien été inséré");    
					});
				}
			});
		}
	});
	res.send(req.body);
});

app.listen(8333);
