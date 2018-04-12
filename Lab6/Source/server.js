var express = require('express')
var app = express();
var drugs = require('drugs');
const MongoClient = require('mongodb').MongoClient;
var db;
var port = process.env.PORT || 8080;

app.use(express.static(__dirname));

MongoClient.connect('mongodb://sirishasunkara:siri1206@ds121955.mlab.com:21955/sirishasunkara', (err, client) => {
    if (err) return console.log(err)
    db = client.db('sirishasunkara') 
    app.listen(8080,function(){
        console.log('listening on port 3000');
    });
  })

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
})
app.post('/home', function(req, res) {
	res.sendFile(__dirname + '/home.html');
})
app.get('/drugslist',function(req,res){
    res.send(drugs);
})

app.get('/drugseffectslist',function(req,res){
    var cursor = db.collection('sideeffects').find().toArray(function(err,result){
      if (err) return console.log(err)
      res.send(result)
    });
    
  })

app.listen(port, function() {
	console.log('app running')
})