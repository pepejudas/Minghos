var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myobj = [
	{ name: 'John', document:'234134', address: 'Highway 71', lastname:'smith', address:'victoria'}, 		
            { name: 'Peter',  document:'23413412123', address: 'Lowstreet 4', lastname:'smith', address:'victoria hill', visibility:'cruzblanca',birthdate:''},
		{ name: 'Amy',  document:'2341231134', address: 'Apple st 652', lastname:'smith', address:'victoria hill', visibility:'cruzblanca',birthdate:''},
	{ name: 'Hannah', document:'234111134', address: 'Mountain 21', lastname:'smith', address:'victoria hill', visibility:'compensar',birthdate:'2018-12-31', documentnumber:'234234'},
		{ name: 'Michael',  document:'234122234', address: 'Valley 345', lastname:'smith', address:'victoria hill', visibility:'',birthdate:''},
		{ name: 'Sandy',  document:'2341333334', address: 'Ocean blvd 2', lastname:'smith', address:'victoria hill', visibility:'',birthdate:''},
		{ name: 'Betty',  document:'234332134', address: 'Green Grass 1', lastname:'smith', address:'victoria hill', visibility:'',birthdate:''},
		{ name: 'Richard',  document:'2341212334', address: 'Sky st 331', lastname:'smith', address:'victoria hill', visibility:'',birthdate:''},
		{ name: 'Susan',  document:'2341322114', address: 'One way 98', lastname:'smith', address:'victoria hill', visibility:'',birthdate:''},
		{ name: 'Vicky', document:'2341312114', address: 'Yellow Garden 2', lastname:'smith', address:'victoria hill', visibility:'',birthdate:''},
		{ name: 'Ben',  document:'234221213134', address: 'Park Lane 38', lastname:'smith', address:'victoria hill', visibility:'',birthdate:''},
		{ name: 'William',  document:'234111121234', address: 'Central st 954', lastname:'smith', address:'victoria hill', visibility:'',birthdate:''},
		{ name: 'Chuck',  document:'23112331234134', address: 'Main Road 989', lastname:'smith', address:'victoria hill', visibility:'',birthdate:''},
	{ name: 'Viola',  document:'23411231134', address: 'Sideway 1633', lastname:'smith', address:'victoria hill', visibility:'',birthdate:''}
	    ];
	dbo.collection("patient").insertMany(myobj, function(err, res) {
	    if (err) throw err;
	    console.log("Number of documents inserted: " + res.insertedCount);
	    db.close();
	});
    });
