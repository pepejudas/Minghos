var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myobj = [
	{ name:'form1', id:'apatient', lang:'es', title:'{{apptitle}}', script_up:['js/frameworkm.js', 'js/translation.js', 'https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js'], css:['css/style1.css', 'css/stylemenu.css'], body:"<body ng-app='myApp' ng-controller='myCtrl'><h1>{{apptitle}}</h1><hr/><div class='panel'><div id='panel1'></div><hr/></div><div class='mainPanel' id='mainPanel'><span id='menu'></span><span id='toolbar'></span><span id:'form1' style='float:right'></span></div></body>", fields:['{"name":"document", "id":"document", "type":"text", "class":"formc", "label":"document"}','{"name":"name", "id":"name", "type":"text", "class":"formc", "label":"name"}','{"name":"lastname", "id":"lastname", "type":"text", "class":"formc", "label":"lastname"}','{"name":"address", "id":"address", "type":"text", "class":"formc", "label":"address"}', '{"name":"visibility", "id":"visibility", "type":"select", "class":"formcs", "label":"visibility", "options":[{"name":"compensar", "value":"compensar"}, {"name":"cruzblanca", "value":"cruzblanca"}]}','{"name":"birthdate", "id":"birthdate", "type":"date", "class":"formcd", "label":"birthdate", "depends":["document"]}', '{"name":"documentnumber","id":"documentnumber", "type":"number", "class":"formc", "label":"documentnumber"}'], toolbar:"<input type='button' name='first' value='||<' id='||<' class='control'/><input type='button' name='previous' value='<<' id='<<'  class='control'/><input type='button' name='next' value='>>' id='>>'  class='control'/><input type='button' name='last' value='>||' id='>||' class='control'/><input type='button' name='first' value='>||*' id='>||*' class='control'/><input type='button' name='save' value='save' id='save' class='control'/><div id='txtsearch'><input type='text' class='formc' id='textsearch' name='textsearch'><input type='button' name='search' value='Search'></div>", toolbar_c:'toolbar', menu:'<ul><li><a href="#home">Home</a></li><li><a href="#news">News</a></li><li class="dropdown"><a href="#" class="dropbtn">Dropdown</a><div class="dropdown-content"><a href="#">Link 1</a><a href="#">Link 2</a><a href="#">Link 3</a></div></li><li class="dropdown"><a href="#" class="dropbtn">Dropdown</a><div class="dropdown-content"><a href="#">Link 1</a><a href="#">Link 2</a><a href="#">Link 3</a></div></li><li class="dropdown"><a href="#" class="dropbtn">Dropdown</a><div class="dropdown-content"><a href="#">Link 1</a><a href="#">Link 2</a><a href="#">Link 3</a></div></li></ul>',menu_c:'menu', container:'mainPanel', script_do:['js/controller.js']}
	    ];
	dbo.collection("form").insertMany(myobj, function(err, res) {
	    if (err) throw err;
	    console.log("Number of documents inserted: " + res.insertedCount);
	    db.close();
	});
    });
