/*
*** Note: copy locally angular library to allow to work on internet failures, locally.
*/

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myobj = [
	{ name:'form1', id:'aperson', lang:'es', title:'{{apptitle}}', script_up:['js/frameworkm.js', 'js/translation.js', 'https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js'], css:['css/style1.css', 'css/stylemenu.css'], body:"<body ng-app='myApp' ng-controller='myCtrl'><h1>{{apptitle}}</h1><hr/><div class='panel'><div id='panel1'></div><hr/></div><div class='mainPanel' id='mainPanel'><span id='menu'></span><span id='toolbar'></span><span id:'form1' style='float:right'></span></div></body>", fields:['{"name":"doctype", "id":"doctype", "type":"select", "class":"formcs", "label":"Tipo de Documento", "options":[{"name":"", "value":""}, {"name":"cedula de ciudadania", "value":"cc"}, {"name":"cedula extranjeria", "value":"ce"}, {"name":"registro civil", "value":"rc"}, {"name":"tarjeta de identidad", "value":"ti"}, {"name":"Nit", "value":"nit"}]}','{"name":"nombre", "id":"nombre", "type":"text", "class":"formc", "label":"nombre"}','{"name":"apellido", "id":"apellido", "type":"text", "class":"formc", "label":"apellido"}','{"name":"celular", "id":"celular", "type":"text", "class":"formc", "label":"celular"}','{"name":"email", "id":"email", "type":"text", "class":"formc", "label":"email"}','{"name":"vereda", "id":"vereda", "type":"text", "class":"formc", "label":"vereda"}', '{"name":"grupo", "id":"grupo", "type":"select", "class":"formcs", "label":"grupo", "options":[{"name":"", "value":""}, {"name":"lechero", "value":"lechero"}, {"name":"papero", "value":"papero"}, {"name":"jovenes", "value":"jovenes"}, {"name":"madre", "value":"madre cabeza de familia"}, {"name":"mujeres", "value":"mujeres"}]}', '{"name":"genero", "id":"genero", "type":"select", "class":"formcs", "label":"genero", "options":[{"name":"", "value":""}, {"name":"masculino", "value":"masculino"}, {"name":"femenino", "value":"femenino"}, {"name":"indefinido", "value":"indefinido"}]}'], toolbar:"<input type='button' name='first' value='||<' id='||<' class='control'/><input type='button' name='previous' value='<<' id='<<'  class='control'/><input type='button' name='next' value='>>' id='>>'  class='control'/><input type='button' name='last' value='>||' id='>||' class='control'/><input type='button' name='first' value='>||*' id='>||*' class='control'/><input type='button' name='save' value='Save' id='save' class='control'/><div id='txtsearch'><input type='text' class='formc' id='textsearch' name='textsearch'><input type='button' name='search' value='Search'></div>", toolbar_c:'toolbar', menu:'<ul><li><a href="#person">Personas</a></li><li><a href="#news">News</a></li><li class="dropdown"><a href="#" class="dropbtn">Dropdown</a><div class="dropdown-content"><a href="#">Link 1</a><a href="#">Link 2</a><a href="#">Link 3</a></div></li><li class="dropdown"><a href="#" class="dropbtn">Dropdown</a><div class="dropdown-content"><a href="#">Link 1</a><a href="#">Link 2</a><a href="#">Link 3</a></div></li><li class="dropdown"><a href="#" class="dropbtn">Dropdown</a><div class="dropdown-content"><a href="#">Link 1</a><a href="#">Link 2</a><a href="#">Link 3</a></div></li></ul>',menu_c:'menu', container:'mainPanel', script_do:['js/controller.js']}
	    ];
	dbo.collection("form").insertMany(myobj, function(err, res) {
	    if (err) throw err;
	    console.log("Number of documents inserted: " + res.insertedCount);
	    db.close();
	});
    });
