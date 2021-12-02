var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myobj = [
	{ name: "panel1", lang:"es", html: "<div><a href='#' class='panel1' id='acontrolpanel' id_form='1'>Panel de Control<a></div>"},
	{ name: "panel1", lang:"es", html: "<div><a href='#' class='panel1' id='aperson' id_form='2'>Personas<a></div>"},
	{ name: "panel1", lang:"es", html: "<div><a href='#' class='panel1' id='acomunicado' id_form='3'>Comunicados<a></div>"},
	{ name: "panel1", lang:"es", html: "<div><a href='#' class='panel1' id='asetmodel' id_form='4'>Establecer Modelo<a></div>"},
	{ name: "panel1", lang:"es", html: "<div><a href='#' class='panel1' id='aimportdata' id_form='5'>Importar Datos<a></div>"},
	{ name: "panel1", lang:"es", html: "<div><a href='#' class='panel1' id='asolvemodel' id_form='6'>Resolver Modelo<a></div>"},
	{ name: "panel1", lang:"es", html: "<div><a href='#' class='panel1' id='aconfiguration' id_form='7'>Configuracion<a></div>"},
	{ name: "panel1", lang:"es", html: "<div><a href='#' class='panel1' id='apatient' id_form='8'>Paciente<a></div>"},
	{ name: "panel1", lang:"es", html: "<div><a href='#' class='panel1' id='anotificaciones' id_form='9'>Notificaciones<a></div>"},
	{ name: "panel1", lang:"es", html: "<div><a href='#' class='panel1' id='aemail' id_form='10'>Email<a></div>"},
	{ name: "panel1", lang:"es", html: "<div><a href='#' class='panel1' id='aservices' id_form='11'>Servicios<a></div>"},
	{ name: "panel1", lang:"es", html: "<div><a href='index.html' class='panel1' id='exit'>Salir<a></div>"}
	    ];
	dbo.collection("menu").insertMany(myobj, function(err, res) {
	    if (err) throw err;
	    console.log("Number of documents inserted: " + res.insertedCount);
	    db.close();
	});
    });
