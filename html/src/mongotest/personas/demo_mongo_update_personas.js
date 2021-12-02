var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
  
    dbo.collection("personas").updateOne({"nodocumento":"898798"},{$set: {"nodocumento":"89879898798798798"}});
    
    });
