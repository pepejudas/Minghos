/**
Header to send to console the loaded module iformation
Header begins
*/

const path = require('path');
var pathObj = path.parse(__filename);
const fn = require('./functions.js');

fn.lM(pathObj)

/**
Header ends
*/

var debugMode = true;

//log the filename and path of module 
function lFile(){
    if (debugMode){
	pTC('Loading module functions.js...\npath:'+__filename);
    }
}

function pTC(text){
    if (debugMode){
	console.log(text);
    }
}

function pTClear(){
    console.log('\033[2J');
}

function nameApp(){
    return nameApp;
}
/*
Function to load properties files and return with data
*/
function loadProperties(url){

    var PropertiesReader = require('properties-reader');
    var properties = PropertiesReader(url);

    return properties;
}

function sendMail(to, subject, message){

    var properties = fn.loadProperties('./conf/conf.properties');
    var nodemailer = require('nodemailer');
    var host = properties.get('conf.email.host');
    var port = properties.get('conf.email.port');
    var secure = properties.get('conf.email.secure');
    var requiretls = properties.get('conf.email.requiretls');
    
    var email= properties.get('conf.email.from');
    var password= properties.get('conf.email.password');
    var arrayResponse = new Array();
    
    var transporter = nodemailer.createTransport({
	host: host,
	port: port,
	secure: secure,
	requireTLS: requiretls,
	auth: {
	    user: email,
	    pass: password
	}
    });

    !!req.query.typec? typec=req.query.typec:typec="";
    !!req.query.group? group=req.query.group:group="";
    !!req.query.comunicado? comunicado=req.query.comunicado:comunicado="";
    !!req.query.titulo? titulo=req.query.titulo:titulo="";
    
    var busq = JSON.parse("{\"grupo\":\""+group+"\"}");
    dbo.collection(typec).find(busq).toArray(function(err, resultcol){

	var numl = resultcol.length;
	var emailto;

	for(var i=0;i<numl;i++){
	    
	    emailto = resultcol[i].email

	    fn.pTC(emailto);
	    
    	    const mailOptions = {
		from: email, // sender address
		to: emailto, // list of receivers
		subject: titulo, // Subject line
		html: comunicado// plain text body
	    };

	    fn.pTC(mailOptions);
	    
	    transporter.sendMail(mailOptions, function (err, info) {
		fn.pTC("envio de email"+emailto);
		fn.pTC(err);
		fn.pTC(info);
		
		arrayResponse[i]=info
		//arrayResponse[i].err=err
		
	    });
	    
	}
	
    });

    res.send(arrayResponse);
}

pTC(pathObj);

module.exports.pTC=pTC;
module.exports.pTClear=pTClear;
module.exports.nameApp=nameApp;
module.exports.debugMode=debugMode;
module.exports.loadProperties=loadProperties;
