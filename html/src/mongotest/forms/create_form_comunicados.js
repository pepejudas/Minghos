/*
*** Note: copy locally angular library to allow to work on internet failures, locally.
*/

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myobj = [
	{ name:'form1', id:'acomunicado', lang:'es', title:'{{apptitle}}', script_up:['js/frameworkm.js', 'js/translation.js', 'https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js'], css:['css/style1.css', 'css/stylemenu.css'], body:"<body ng-app='myApp' ng-controller='myCtrl'><h1>{{apptitle}}</h1><hr/><div class='panel'><div id='panel1'></div><hr/></div><div class='mainPanel' id='mainPanel'><span id='menu'></span><span id='toolbar'></span><span id='form1' style='float:right'></span><div id='recounter'></div></div></body>", fields:['{"name":"type", "id":"type", "type":"select", "class":"formcs", "label":"Tipo de Documento", "options":[{"name":"", "value":""}, {"name":"email", "value":"email"}, {"name":"sms", "value":"sms"}, {"name":"whatsapp", "value":"whatsapp"}]}','{"name":"grupo", "id":"grupo", "type":"select", "class":"formcs", "label":"grupo", "options":[{"name":"", "value":""}, {"name":"lechero", "value":"lechero"}, {"name":"papero", "value":"papero"}, {"name":"jovenes", "value":"jovenes"}, {"name":"madre", "value":"madre cabeza de familia"}, {"name":"mujeres", "value":"mujeres"}]}','{"name":"comunicado", "id":"comunicado", "type":"textarea", "class":"formc", "label":"comunicado"}'], toolbar:"<input type='button' name='first' value='||<' id='||<' class='control'/><input type='button' name='previous' value='<<' id='<<'  class='control'/><input type='button' name='next' value='>>' id='>>'  class='control'/><input type='button' name='last' value='>||' id='>||' class='control'/><input type='button' name='first' value='>||*' id='>||*' class='control'/><input type='button' name='save' value='Save' id='save' class='control'/><div id='txtsearch'><input type='text' class='formc' id='textsearch' name='textsearch'><input type='button' name='search' value='Search'></div>", toolbar_c:'toolbar', menu:'<ul><li><a href="#person">Personas</a></li><li><a href="#news">News</a></li><li class="dropdown"><a href="#" class="dropbtn">Dropdown</a><div class="dropdown-content"><a href="#">Link 1</a><a href="#">Link 2</a><a href="#">Link 3</a></div></li><li><a href="#" class="dropbtn"><select id="scriterial"><option value="type">Tipo</option><option value="grupo">Grupo</option></select></a></li></ul>',menu_c:'menu', container:'form1', script_do:['js/controller.js'], collection:'comunicado'}
	    ];
	dbo.collection("form").insertMany(myobj, function(err, res) {
	    if (err) throw err;
	    console.log("Number of documents inserted: " + res.insertedCount);
	    db.close();
	});
    });
