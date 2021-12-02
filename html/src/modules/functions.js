/**
BACKEND FUNCTIONS
library to create and set functions to be used all over the backend
*/
const path = require('path');
var pathObj = path.parse(__filename);                                                                
//load properties from file
const pathproperties =  __dirname + '/../conf/conf.properties';
const properties = loadProperties(pathproperties);

var debugMode = properties.get('app.debugmode')

lM(pathObj)

//Function to load properties files and return with data
function loadProperties(url){
    var PropertiesReader = require('properties-reader');
    var prop = PropertiesReader(url);
    return prop;
}

//function to print the current path of loading module
function lM(pat){
    if (debugMode){
	c('loading...');
	c(pat)
    }
}

//log the filename and path of module 
function lFile(){
    if (debugMode){
	c('Loading module functions.js...\npath:'+__filename);
    }
}
//console log function
function c(text){
    if (debugMode){
	console.log(text);
    }
}
//console log function witout debug mode
function cwd(text){
	console.log(text);
}
//log error function
function e(er){
    if(debugMode){
	console.error(er)
    }
}
//function to validate if the user has been logged before
function v(s, res){
    if(!s.isLogged){
	//session expired message
	res.send('{"e":"1"}')
    }
}
//clear console function
function cl(){
    console.log('\033[2J')
}

//function to return app name
function nameApp(){
    return nameApp
}
//function to avoid use of eval with stric mode enabled
function p(str) {
    return Function(`'use strict'; return (${str})`)()
}
/**
@name: valUser
@description: function to validate the user input from outside application, should be alphanumeric
*/
function valUser(tfval){
    var re1 = new RegExp('^[a-zA-Z0-9]+$');
    return re1.test(tfval);
}

/**
@name: rTranRp
@description: function to replace all fields inside reports and create html document ready for pdf creation
@param:texto-text requiredt inside replace the fields
@param:reqbody request with parameters inside body variable
@param:arrfields collection with field values to replace inside document
@returns:text with fields type {{collection.field}} replaced by collection value
*/
function rTranRp(texto, reqbody, arrfields){
    try{
        const regexp1 = /{{/g;
        const regexp2 = /}}/g;
        const array1 = [...texto.matchAll(regexp1)];
        const array2 =  [...texto.matchAll(regexp2)];
        let i=0;
        const maxItera = array1.length;
        
        for(i=0;i<maxItera;i++){

	    if(i==0){
		try{
		    
                    let pal = texto.substring(array1[i].index+2,array2[i].index);
		    let collname = pal.split(".")[0];
		    let propname = pal.split(".")[1];
		    let valprop = '';
		    
		    try{
			const trn = `arrfields.${collname}[0][0].${propname}`;
			valprop = eval(trn);
		    }catch(e){
			continue;
		    }

		    //removido porque genera iteraciones infinitas cuando no esta definido algun campo tumbando la aplicacion, en cambio mejor asi reemplaza el valor unicamente con vacio cuando algun campo inmerso en el reporte no esta definido en la tabla origen
		    //if(valprop!==''){
		    texto = texto.replace('{{'+pal+'}}',valprop);
		    //}
		}catch(e){
		    c(e);
		}
            }else{
                texto = rTranRp(texto, reqbody, arrfields);
            }
        }
    }catch(e){
        c(e);
    }finally{
        return texto;
    }
}

//necesita revision porque solo se esta efectuando la traduccion una unica vez para la 2da etapa
function rTranBk(texto, filename, dL){
    try{
        
        var obj = 'lang_'+dL;
        let regexp1 = /{{/g;
        let regexp2 = /}}/g;
        var array1 = [...texto.matchAll(regexp1)];
        var array2 =  [...texto.matchAll(regexp2)];
        var i=0;
        var maxItera = array1.length;
        
        for(i=0;i<maxItera;i++){
            
            try{
                var pal = texto.substring(array1[i].index+2,array2[i].index);
                
                try{
		    //try to load dbname file created on signup
		    const trn =  require(__dirname + `/../translations/${filename}.js`);
		    //var valprop = p('trn.lang_'+dL+'.'+pal);
		    let l =`trn.lang_${dL}.${pal}`
		    //c(`${l} iteracion:${i} maxitera:${maxItera} dL:${dL} pal:${pal}__________________________________________________________________`)
                    var valprop = eval(l);
		    
                }catch(e){
		    c(`entra al catch error ${e}`)
		    //if there is an error
                    if(i==0){
                        c('Error loading translation:' + pal);
			c(e)
                    }
                }
		
                if(i==0){
		    c(`entra al replace de un valor ${pal} ${valprop}`)
                    texto = texto.replace('{{'+pal+'}}',valprop);
                }else{
		    c(`entra a funcion de forma recurrente`)
                    texto = rTranBk(texto, dbname, dL);
                }
            }catch(e){
                c('d');
            }
        }
    }catch(e){
        c(e);
    }finally{
        return texto;
    }
}
//function to send email inside application
function sendMail(emailto, subject, message, db, okcallback){

    let params = [];
    let conc = db.initDefault();

    //query params to sendemail
    var orgidef = properties.get('params.orgidef');
    var sqlparams = `select * from d_param where org='${orgidef}' and param like 'email_%'`;
    var arrayEmail = []

    //reset the way parameters are loaded
    var nodemailer = require('nodemailer');
    var host; //= params.email_host
    //properties.get('conf.email.host');
    var port; //= params.email_port
    //properties.get('conf.email.port');
    var secure; //= params.email_secure
    //properties.get('conf.email.secure');
    var requiretls; //= params.email_requiretls
    //properties.get('conf.email.requiretls');
    var email; //= params.email_from
    //properties.get('conf.email.from');
    var password; //= params.email_password
    //service
    var service;

    db.queryl(sqlparams, function(r){

	if(r.rows.length>0){
	    params = r.rows;
	}

	var i = params.length;

	for(j=0;j<i;j++){

	    var field = params[j].param;

	    switch(field){
	    case "email_host":
		host=params[j].value;
		break;
	    case "email_from":
		email=params[j].value;
		break;
	    case "email_password":
		password=params[j].value;
		break;
	    case "email_port":
		port=params[j].value;
		break;
	    case "email_secure":
		secure=params[j].value;
		break;
	    case "email_requiretls":
		requiretls=params[j].value;
		break;
	    case "email_service":
		service=params[j].value;
		break;
	    }
	}

	var arrayResponse = new Array();

	var transporter = nodemailer.createTransport({
	    host: host,
	    port: port,
	    secure: secure,
	    requireTLS: requiretls,
	    service: service,
	    auth: {
		user: email,
		pass: password
	    }
	});

	const mailOptions = {
	    from: email, // sender address
	    to: emailto, // list of receivers
	    subject: subject, // Subject line
	    html: message,// plain text body
	    attachments:{
		filename:'notas',
		content:`${subject}\n${message}`
	    }
	};

	var infoemail = transporter.sendMail(mailOptions, function (err, info) {

	    c(`email :${emailto} host:${host} port:${port} secure:${secure} requiretls:${requiretls} from:${email} password:************* servicios:${service}`);

	    !!err ? c('error:') + c(err) : okcallback()
	    !!err ? c('info:') + c(info):

	    arrayResponse=info

	    return arrayResponse;
	});
    });   
}

module.exports.c=c;
module.exports.e=e;
module.exports.cl=cl;
module.exports.nameApp=nameApp;
module.exports.debugMode=debugMode;
module.exports.loadProperties=loadProperties;
module.exports.sendMail=sendMail;
module.exports.v=v;
module.exports.rTranBk=rTranBk;
module.exports.lM=lM;
module.exports.cwd=cwd;
module.exports.p=p;
module.exports.valUser=valUser;
module.exports.rTranRp=rTranRp;
