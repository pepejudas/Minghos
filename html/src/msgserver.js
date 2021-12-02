/*
Libreria, servicio de envio SMS, Email y Whatsapp
*/
const fn = require('./modules/functions.js'); 
const pathproperties =  __dirname + '/conf/conf.properties';
const properties = fn.loadProperties(pathproperties); 
const milsectry = properties.get('params.milsec');
const mongoclient = require('mongodb').MongoClient;
const mongodb = require('mongodb');
const udatabase = properties.get('udatabase.database');
const uhost = properties.get('udatabase.host');
const uport = properties.get('udatabase.port');
const inst = properties.get('app.instance');
//postgres connection module                                                                                                       
const db = require('./modules/pgdb.js');

fn.c('loading parameters...');

db.initDefault();
//function to change record status when the notification has been sent
function chngStatus(dbo, idrec){
    try{

	//var objsearch = {_id:new mongodb.ObjectID(idrec)};
	var objsearch = {"_id":idrec};  
	var jsonUpdate = JSON.parse("{\"estado\":\"notificado\"}");
	const dmeet = 'd_meet'

	var updt = {$set:{"estado":"notificado"}};

        dbo.collection(dmeet).updateOne(objsearch, updt);
	
    }catch(e){
        fn.c(e);
    }
}

//function to save record from comunication sent
function saveComSent(dbo, json, idrec){
    try{
	var jsonInsert = JSON.parse(json);
	const colcomsent = "d_comsent"
        dbo.collection(colcomsent).insertOne(jsonInsert, (err, result) => {
            if (err){
                fn.c( `error has ocurred: ${err}`);
	    }else{
		chngStatus(dbo, idrec);
	    }
        });
    }catch(e){
        fn.c(e);
    }
}

function msgServer(){

    let urlm = `${uhost}${uport}`;
    
    mongoclient.connect(urlm, {useNewUrlParser:true}, function(err, dbmon) {

	if (err) throw err;
	
	var dbo = dbmon.db(udatabase);

	dbo.admin().listDatabases(function(er, result){

	    let i=result.databases.length;
	    let j = 0;
	    
	    const colname = 'd_meet';
	    const c_system = 'd_system';

	    var accountSid = "";
	    var authToken = "";
	    var fromNumber = "";

	    //iteration all databases
	    var contenvios = 0;

	    const funMsg = function(dbname){

		let adbname;
		//si es una base de datos mydb
		if(dbname.startsWith('minghos')){
		    
		    adbname = dbmon.db(dbname);
		    
		    //to search if is dev, val or prod instance and use appropiate credentials
		    busqueda = JSON.parse("{\"tipo\":\""+inst+"\"}");
		    
		    adbname.collection(c_system).find(busqueda).toArray(function(err, resultat){
			
			if(resultat.length > 0){
			    accountSid = resultat[0].accountsid;
			    authToken = resultat[0].authtoken;
			    fromNumber = resultat[0].fromnumber;
			}    
		    });
		    
		    //parametros de consulta para solo ver los mensajes del dia
		    let dat = new Date();
		    let yyyy = dat.getFullYear();
		    let mm = ('0'+(dat.getMonth() + 1).toString()).slice(-2);
		    let dd = ('0'+dat.getDate().toString()).slice(-2);
		    
		    let datn = yyyy+'-'+mm+'-'+dd;
		    
		    var srch = {
			fechacita: {
			    $gte:datn
			},
			//msg status still unsend
			estado:'programado'
		    }

		    adbname.collection(colname).find(srch).toArray(function(err, resultmeet) {
			
			let k = resultmeet.length;
			
			resultmeet.forEach(function(item, index, arr){
					
			    let tipemsg = item.tipomsg;
			    let usuario = item.nodocumentoas;
			    let profesional = item.nodocumentoes;
			    let celular = item.celular;
			    let fecha = item.fechacita;
			    let hora = item.horacita;
			    let idrec = item._id;
			    let email = item.email;
			    let henvio = item.henvio;
			    
			    let hours = ('0'+dat.getHours()).toString().slice(-2);
			    let minutes = ('0'+dat.getMinutes()).toString().slice(-2);
			    
			    let msg = ""
			    let subj = ""

			    let arrhe = henvio.split(':')
			    let hourse = arrhe[0]
			    let minutese = arrhe[1]
			    
			    //search the default configuration from company in s_conf collection
			    let colnconf = "s_conf"
			    
			    adbname.collection(colnconf).find().toArray(function(err, rtmeet) {
				
				if(rtmeet.length > 0){
				    msg = fn.rTranBk(`id:${idrec} {{mensajecita}}<br/>${usuario}<br/>${fecha} ${hora}`, dbname, rtmeet[0].dL);
				    subj = fn.rTranBk(`{{titulomensajecita}} ${idrec}`, dbname, rtmeet[0].dL);
				}
				
				if(tipemsg){	    
				    //switch(tipemsg){
				    if(tipemsg== "email" || "email_sms"){
					try{
					    if(datn==fecha){
						//si coincide la hora de envio de la notificacion
						if (hours+':'+minutes==henvio){
						    //fn.c(fn.rTranBk(`{{envioemail}} ${email} ${subj} ${msg}`,dbname, rtmeet[0].dL));
						    let resp = fn.sendMail(email, subj, msg, db, function(){
							let jsonsv = `{"datetime":"${dat}", "tipomsg":"${tipemsg}", "subj":"${subj}", "msg":"${msg}", "email":"${email}", "fechacita":"${fecha}", "henvio":"${henvio}"}`
							saveComSent(adbname,jsonsv,idrec);
							
						    });
						}
					    }
					}catch(e){
					    fn.c(e);
					}
				    }
				    
				    if(tipemsg=="sms" || tipemsg=="whatsapp" || tipemsg=="email_sms"){
					//falta probar el envio del mensaje sms 
					try{
					    if(datn==fecha){
						
						if (accountSid && authToken){
						    
						    var client = require('twilio')(accountSid, authToken);
						    
						    if (tipemsg=="whatsapp"){
							fromNumber = "whatsapp:"+fromNumber;
						    }
						    
						    if (tipemsg=="whatsapp"){
							celular = "whatsapp:"+celular;
						    }
						    
						    //si coincide la hora de envio de la notificacion
						    if (hours+':'+minutes==henvio){
							
							fn.c(`entra a enviar SMS ${msg} ${celular} ${fromNumber}`);
							client.messages.create({
							    body:msg,
							    to:celular,
							    from:fromNumber
							}).then((message) => {
							    saveComSent(adbname, `{"datetime":"${dat}", "tipemsg":"${tipemsg}", "msg":"${msg}",  "msgsid":"${message.sid}", "celular":"${celular}"}`, idrec)
							});
						    }
						}else{
						    fn.c("undefined twilio accountSid or authToken")
						}
					    }
					}catch(e){
					    fn.c(e)
					}
				    }
				}
			    });
			});
		    });
		}
	    }
	    
	    result.databases.forEach(function(item, index, arr){
		funMsg(item.name);                                                
	    });
	});
    });
}

//service interval definition
let i=0;
setInterval(function(){
    i++;;
    try{
	msgServer();
    }catch(e){
	fn.c(e)
    }
}, milsectry)
