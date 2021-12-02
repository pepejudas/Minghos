var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myobj = [
	{ doctype:'cc', nombre: 'John', apellido:'Rodriguez', celular: '21341234', email:'miemail1@gmail.com', vereda:'san jose', grupo:'lechero', genero:'femenino'},
	{ doctype:'cc', nombre: 'Carlos', apellido:'Romero', celular: '123412344', email:'miemail2@gmail.com', vereda:'gobernador', grupo:'papero', genero:'masculino'},
	{ doctype:'cc', nombre: 'Rodrigo', apellido:'Rodriguez', celular: '12341234', email:'miemail5@gmail.com', vereda:'tierra negra', grupo:'lechero', genero:'femenino'},
	{ doctype:'cc', nombre: 'Alberto', apellido:'Gonzalez', celular: '12341234', email:'miemail4@gmail.com', vereda:'el hato', grupo:'papero', genero:'masculino'},
	{ doctype:'cc', nombre: 'Manchego', apellido:'Martinez', celular: '123421333', email:'miemail3@gmail.com', vereda:'el alto', grupo:'lechero', genero:'femenino'},
	{ doctype:'cc', nombre: 'Isaias', apellido:'Rodriguez', celular: '221342134', email:'miemail2@gmail.com', vereda:'tres viejas', grupo:'papero', genero:'masculino'},
	{ doctype:'cc', nombre: 'Triple', apellido:'Rodriguez', celular: '34442332432', email:'miemail34@gmail.com', vereda:'la lechuza', grupo:'lechero', genero:'femenino'},
	{ doctype:'cc', nombre: 'Doble', apellido:'Rodriguez', celular: '4423423423', email:'miemail0@gmail.com', vereda:'la loma', grupo:'papero', genero:'masculino'},
	{ doctype:'cc', nombre: 'Moron', apellido:'Rodriguez', celular: '123412341234', email:'miemai22l@gmail.com', vereda:'boita', grupo:'lechero', genero:'femenino'},
	{ doctype:'cc', nombre: 'Mirta', apellido:'Rodriguez', celular: '32452345', email:'miemail000@gmail.com', vereda:'el arrume', grupo:'papero', genero:'masculino'},
	{ doctype:'cc', nombre: 'Alberta', apellido:'Rodriguez', celular: '23452345', email:'miemail123@gmail.com', vereda:'chaleche', grupo:'lechero', genero:'femenino'},
	{ doctype:'cc', nombre: 'Willa', apellido:'Rodriguez', celular: '2345234555', email:'miemail564@gmail.com', vereda:'guatavita', grupo:'papero', genero:'masculino'}
	    ];
	dbo.collection("personas").insertMany(myobj, function(err, res) {
	    if (err) throw err;
	    console.log("Number of documents inserted: " + res.insertedCount);
	    db.close();
	});
    });
