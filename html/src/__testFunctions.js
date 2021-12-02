OB//archivo para efectuar pruebas de los modulos o funciones en el backend

const path = require('path');
var pathObj = path.parse(__filename);
const fn = require('./modules/functions.js');
const mongoclient = require('mongodb').MongoClient;
//const tr = require('./translations/translation.js');

fn.lM(pathObj) 
//function library fn

fn.c('archivo de pruebas de modulos y funciones')
fn.c('...')

var jsonUpdate = JSON.parse('{\"estado\":\"notificado\"}');

/*
let text = fn.rTranBk('{{celular}} {{agendapara}} mensaje', 'minghos', 'es')
fn.c(text)
*/

let nodocumentoas =  "654654654 Jesu Ronderos"
let nodocumentoes = "654654321 Juan Perez"
let celular = "3213213"
let email = "alguien@xsitecompany.net"
let fechacita = "2021-04-13"
let horacita = "14:50"
let estado = "programado"
let tipomsg = "email"
let henvio = "18:25"
let tableins = "d_meet"

mongoclient.connect('mongodb://192.168.0.90:27017', {useNewUrlParser:true}, function(err, db) {

    const dbo = db.db('minghos');

    dbo.collection('s_user').find().toArray(function(err, resltd) {
        
        //let numr = resltd.length
	let numr = 1
	let arrayProps = []
	let props = ""
	
	for(var ji=0;ji<numr;ji++){
	    fn.c(resltd[ji])

	    let item = resltd[ji]
	    for (const property in item) {
		arrayProps.push(property)
            }
	}

	fn.c('comentarios')
	fn.c(arrayProps)
	
	let ij = arrayProps.length

	for(ijk=0;ijk<ij;ijk++){
	    var coma = ","
	    if(ijk+1==ij){
		coma = ""
	    }
	    
	    props += `"${arrayProps[ijk]}":"text" ${coma}`
	}

	fn.c(`props:${props}`)

	const propsjs = `{${props}}`
	fn.c(propsjs)

	try{
	    dbo.collection('s_user').createIndex(propsjs);
	}catch(er){
	    fn.c(er)
	}
    })
});
                                             
    /*
      var dbo = db.db('minghos');
      let lim = 10
      let array = []
      for(let i=0;i<lim;i++){
      let jsonInsertU = `{"_id":"m${i}", "nodocumentoas":"${nodocumentoas}", "nodocumentoes":"${nodocumentoes}", "celular":"${celular}", "email":"${email}", "fechacita":"${fechacita}", "horacita":"${horacita}", "estado":"${estado}", "tipomsg":"${tipomsg}", "henvio":"${henvio}"}`
      let jsonpU = JSON.parse(jsonInsertU)
      
      array.push(jsonpU)
      }
      
      dbo.collection(tableins).insertMany(array)
    */

/*
fn.c('llamado a funcion de traducciones usando la conexion por defecto de minghos')

let variable = "otra variable de js"
let transl = `texto que debe reemplazar variables normalmente (${variable})`;

let texto = "contenido del archivo {{comunicados}} {{empresa}}"
let regexp1 = /{{/g
let i = texto.matchAll(regexp1)
let dL = 'es'

fn.c('tran')
fn.c(tran)

let pal = "comunicados"
let variab = eval('tran.lang_'+dL+'.'+pal);
var valprop = fn.p(`tran.lang_${dL}.${pal}`);
var valor = tran.lang_es.comunicados
fn.c(`valor ${variab}`)
fn.c(`valor ${valor}`)
fn.c(`valprop ${valprop}`)

fn.c(`linea de comunicados valprop ${valprop} pal ${pal}`)
*/

/*
mongoclient.connect('mongodb://localhost:27017', {useNewUrlParser:true}, function(err, dbmon) {

    fn.c('entra al mongo connect')
    
    let dbName = dbmon.db('minghos');
    let numails = 1000

    let nodocumentoas =  "654654654 Jesus Ronderos"
    let nodocumentoes = "654654321 Juan Perez"
    let celular = "3213213"
    let email = "alguien@xsitecompany.net"
    let fechacita = "2021-04-20"
    let horacita = "20:58"
    let estado = "programado"
    let tipomsg = "email"
    let henvio = "23:45"
    
    let tableins = "d_meet"
    let jsonInsertU = `{"nodocumentoas":"${nodocumentoas}", "nodocumentoes":"${nodocumentoes}", "celular":"${celular}", "email":"${email}", "fechacita":"${fechacita}", "horacita":"${horacita}", "estado":"${estado}", "tipomsg":"${tipomsg}", "henvio":"${henvio}"}`
    let jsonpU = JSON.parse(jsonInsertU)

    for(let i=0;i<50;i++){
	dbName.collection(tableins).insertOne(jsonpU, (err, result) => {
	    if (err){
		fn.c(`${i} error on insert ${err}`);
	    }else{
		fn.c(`${i} record inserted ${jsonInsertU}`);
	    }
	});
    }
    
    // include node fs module
    var fs = require('fs');
    
    // writeFile function with filename, content and callback function
    fs.writeFile('logfile.txt', 'Learn Node FS module', function (err) {
	if (err) throw err;
	console.log('File is created successfully.');
    });
    
});
*/
