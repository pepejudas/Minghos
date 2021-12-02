/*****************************************
//App Server Minghos
//@version 0.0.1
//@author: Neoblaster
*/
const nameApp = "Minghos";
const version = "0.0.1";
const url = require('url');
const mongodb = require('mongodb');
const express = require('express');
const fs = require('fs');
const app = express();
//importing module to os information
const osInfo = require('./modules/osInfo.js');
//function library fn
const fn = require('./modules/functions.js');
//webpage module library wp
const wp = require('./modules/htmlPage.js');
//postgres connection module
const db = require('./modules/pgdb.js');
//postgres connection module
const dv = require('./modules/__functionsTest.js');
//sessions
const session = require('express-session');
//body parser to express operations
const bodyParser = require('body-parser');
//app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
//properties config load
const pathproperties =  __dirname + '/conf/conf.properties';
const properties = fn.loadProperties(pathproperties);
//duration
const duracionS = properties.get('params.duration');
//app properties definition
const mongoclient = require('mongodb').MongoClient;
//current number of users of all application
let numUser = 0;
//user params teamplate to register on every session
up = {
    user:'',
    passw:'',
    //vars to set/unset on start/exit session
    orgid:'',
    udatabase:'',
    uhost:'',
    uport:'',
    //email vars
    email_from:'',
    email_password:'',
    email_host:'',
    email_port:'',
    email_secure:'',
    email_requiretls:''
}

let port = properties.get('app.port');
//creating the session
const crypto = require('crypto');
const secret = 'lih325k4l43k';
const hash = crypto.createHmac('sha256', secret).update('8723jhk2j3ikdjs').digest('hex');

/* art taken from patorjk.com thanks */
fn.cwd(`
                                                                      :             
                           L.                                        t#,           .
                       t   EW:        ,ft         .Gt .    .        ;##W.         ;W
            ..       : Ej  E##;       t#E        j#W: Di   Dt      :#L:WE        f#E
           ,W,     .Et E#, E###t      t#E      ;K#f   E#i  E#i    .KG  ,#D     .E#f 
          t##,    ,W#t E#t E#fE#f     t#E    .G#D.    E#t  E#t    EE    ;#f   iWW;  
         L###,   j###t E#t E#t D#G    t#E   j#K;      E#t  E#t   f#.     t#i L##Lffi
       .E#j##,  G#fE#t E#t E#t  f#E.  t#E ,K#f   ,GD; E########f.:#G     GK tLLG##L 
      ;WW; ##,:K#i E#t E#t E#t   t#K: t#E  j#Wi   E#t E#j..K#j... ;#L   LW.   ,W#i  
     j#E.  ##f#W,  E#t E#t E#t    ;#W,t#E   .G#D: E#t E#t  E#t     t#f f#:   j#E.   
   .D#L    ###K:   E#t E#t E#t     :K#D#E     ,K#fK#t E#t  E#t      f#D#;  .D#j     
  :K#t     ##D.    E#t E#t E#t      .E##E       j###t f#t  f#t       G#t  ,WK,      
  ...      #G      ..  E#t ..         G#E        .G#t  ii   ii        t   EG.       
           j           ,;.             fE          ;;                     ,         
                                        ,                                           

`);

app.use(session({"secret":hash, "isLogged":false, "resave":false, "saveUninitialized":true, "cookie":{"maxAge":duracionS}}));

//Application login and form structure creation
app.post('/login', function(req, res){

    const pathname = url.parse(req.url).pathname;
    fn.c('entra al login: '+pathname);
    
    user = req.body.user;
    passw = req.body.password;

    try{
	
	if(fn.valUser(user)){
	    
	    up.user = user;
	    up.passw = passw;
	    
	    try{
		let dbinit = db.init(user, passw);
		//login correcto a la base de datos
		try{
		    //body login function
		    
		    let sqlsent = `select u.org, u.lang, s.active, s.nuser, s.maxuser, p.param, p.value from public.s_system s inner join public.d_uconfig u on (s.id = u.org) inner join public.d_param p on (p.org=s.id) where u.user = '${user}'`;
		    
		    fn.c(sqlsent);
		    
		    db.queryl(sqlsent,
			      function(r){
				  try{
				      fn.c('entra a la consulta de la base de datos_______________________________________________')
				      //set app params
				      for(let i=0;i<r.rows.length;i++){
					  if(r.rows[i].active){
					      if(r.rows[i].nuser < r.rows[i].maxuser){
						  switch(r.rows[i].param){
						  case "database":
						      up.orgid = r.rows[i].org;
						      up.udatabase = r.rows[i].value;
						      up.lang = r.rows[i].lang;
						      break;
						  case "host":
						      up.uhost = r.rows[i].value;
						      break;
						  case "port":
						      up.uport = r.rows[i].value;
						      break;
						  case "email_from":
						      up.email_from = r.rows[i].value;
						      break;
						  case "email_host":
						      up.email_host = r.rows[i].value;
						      break;
						  case "email_port":
						      up.email_port = r.rows[i].value;
						      break;
						  case "email_secure":
						      up.email_secure = r.rows[i].value;
						      break;
						  case "email_requiretls":
						      up.email_requiretls = r.rows[i].value;
						      break;
						  }
						  //logueo correctamente a la aplicacion
						  req.session.isLogged=true;
						  numUser++;
					      }else{
						  res.redirect('/ilogin.html?v=false&m=there is no left user licences to use');
						  break
					      }
					  }else{
					      res.redirect('/ilogin.html?v=false&m=the customer has not been activated please follow the email instructions to finish the sign up process');
					      break
					  }
					  //close for    
				      }
				      
				      //verificacion de licencia registrada
				      try{
					  //ya esta logueado el usuario previamente es una actualizacion no registrar nueva licencia
					  if (req.session.up.orgid > 0 && req.session.isLogged){
					      varorgid = req.session.up.orgid;
					      wp.createWebPage(res,'form1', req.session.up.lang);
					  }
				      }catch(e){
					  //send the update sentence to db to set minus one user to customer
					  //logueo normal
					  if(req.session.isLogged){
					      //register session data
					      let mu = r.rows[0].maxuser;
					      let cu = r.rows[0].nuser;
					      let nu = cu + 1;
					      
					      if (cu < mu){
						  let q = `update public.s_system set nuser='${nu}' where id='${up.orgid}'`
						  db.query(q, function(r){
						      
						      let uhost = properties.get('udatabase.host_c');
                                                      let uport = properties.get('udatabase.port'); 
						      
						      wp.setParams(mongoclient, up.udatabase, uhost, uport);
						      req.session.up = up;
						      wp.createWebPage(res,'form1', up.lang);
						  })
					      }
					  }
				      }
				  }catch(e){
				      fn.c(e);
				  }
			      },
			      function(){
				  res.redirect('/ilogin.html?v=false&u='+user);
			      });
		}catch(e){
		    fn.c('entra al catch de error linea 179_______________________________________________________')
		    res.redirect('/ilogin.html?v=false&u='+user);
		    fn.c(e);
		}
	    }catch(er){
		fn.c('Error trying to postgres connect line (180):');
		fn.e(er);
	    }
	}else{
	    res.redirect('/ilogin.html?v=false&u='+user);
	}
    }catch(e){
	fn.c('Error trying to postgres connect line (184):' + e.toString());
	fn.e(e);
	res.send('{"e":"1"}');
    }
});
	 
//reporting microservice
app.post('/reporting', function(req, res){

    let pathname = url.parse(req.url).pathname;
    fn.c('entra a reporting: '+pathname);
    
    try{
	//primero preguntar por la sesion iniciada
	let orgid = req.session.up.orgid
	
	//esta logueado sino enviar al login
	if(orgid>0){

	    fn.c('entra a reporting session: l:224');
	    let oper, id;
	    
	    try{

		let html_to_pdf = require('html-pdf-node');
		let idrep = req.body.id_reporte;

		if(idrep!==""){
		    
		    fn.c('entra a reporting session: l:233');
		

		    // Example of options with args //
		    // let options = { format: 'A4', args: ['--no-sandbox', '--disable-setuid-sandbox'] };
		    
		    const uhost = properties.get('udatabase.host');
		    const uport = properties.get('udatabase.port');
		    const reportdir = properties.get('paths.report');
		    
		    const udatabase = req.session.up.udatabase;
		    const urlm = `${uhost}${uport}`;
		    
		    let table = "d_report";
		    
		    mongoclient.connect(urlm, {useUnifiedTopology: true}, function(err, db) {

			fn.c('entra a reporting session: l:224');
			
			if (err) throw err;
			const dbo = db.db(udatabase);
			
			if (!!table){
			    let objsearch = {_id:new mongodb.ObjectID(idrep)};
			    
			    dbo.collection(table).find(objsearch).toArray(function(err, result){

				fn.c('entra a reporting session: l:267');
				
				let numr = result.length

				if(numr>0){

				    fn.c(`entra a reporting session: l:273 ${result[0].reportext}`);
				    
				    let options = { format: 'A4' };

				    let arrcol = result[0].collections.length;
				    let arrcollect = {"prop":""};
				    let strtxt = result[0].reportext;
				    let str = "";

				    result[0].collections.forEach(function(item, index){
					fn.c(`entra al foreach reporting session: l:280 ${item}, ${index}`);
					
					try{
					    let ind = `req.body.${item}`
					    let indic = eval(ind).split(" ")[0];
					    const tablesrc = item;
					    
					    fn.c(`entra al foreach reporting session: l:289 ${ind}, ${indic}, ${tablesrc}`);
					    
					    let objsearch = {_id:new mongodb.ObjectID(indic)};

					    let indice = 0;
					    
					    dbo.collection(tablesrc).find(objsearch).toArray(function(err, resultrpt){
						//arrcollect[item] = new Array();
						let itm= new Array ();
						itm.push(resultrpt);
						arrcollect[item]=itm;
						
						//ejecutar en la ultima iteracion para evitar que se efectue de forma sincrona
						if(indice+1==arrcol){

						    //fn.c('arrcollect.d_person[0][0].name');
						    //fn.c(arrcollect.d_person[0][0].name);
						    fn.c(`entra al foreach reporting session: l:300`);
						    str = fn.rTranRp(strtxt, req.body, arrcollect);
						    let file = { content:str, name: 'example.pdf', path:'/home/ferley/Documents/' };
						    
						    html_to_pdf.generatePdf(file, options).then(output => {
							let narch = idrep+"_"+Date.now()+".pdf";
							let rutarch = reportdir+narch;
							
							fn.c(`entra a reporting session: l:281 ${rutarch}`);
							
							fs.writeFile(rutarch, output, (err) => {
							    res.send(narch)
							});
							
						    });
						}
						indice++;
					    });
					}catch(e){
					    fn.c(e);
					}
				    });
				    
				//la busqueda no coincide con ningun registro almacenado
				}else{
				    res.send('{"e":"1", "m":"${r}"}');
				}
			    }); 
			};
		    });
		};
	    }catch(e){
		fn.c(e);
	    }
	}
    }catch(er){
	fn.c(er)
    }
});

//notify manually
app.get('/notify', function(req, res){

    const pathname = url.parse(req.url).pathname;
    fn.c('entra a notify: '+pathname);
    
    try{
	//primero preguntar por la sesion iniciada
	let orgid = req.session.up.orgid
	
	//esta logueado sino enviar al login
	if(orgid>0){
	    
	    let oper, id;
	    
	    try{
		!!req.body.oper? oper=req.body.oper:oper="";
		!!req.body.id? id=req.body.id:id="";
		
	    }catch(e){
		fn.c(e);
	    }
	}
    }catch(er){
	fn.c(er)
    }
});


//registry confirm
app.get('/confirm', function(req, res){

    let pathname = url.parse(req.url).pathname;
    fn.c('entra al confirm: '+pathname);

    let orgid = req.query.orgid;
    
    try{
	db.initDefault();
	//logueo correctamente a la base de datos
	try{
	    //body login function
	    if(orgid){
		const confirmsql = `update s_system set active = true where id='${orgid}'`;
		
		db.query(confirmsql, function(r){
		    fn.c('entra a confirm sql en la linea 213:')
		    fn.c(confirmsql);
		    fn.c(r)
		    //res.send('{"ok":"1", "m":"the account has been activated please login using credentials <a href="ilogin.html">Login</a>"}');
		},function(r){
		    res.send('{"e":"1", "m":"${r}"}');
		})

		try{
		    //poner el codigo aqui luego del insert de los collection
		    fn.c('entra al try de confirm linea 224_____________________________________________')
		    let sqlsent=`select p.value, u.user, s.email, u.password from d_param p inner join d_uconfig u on (p.org=u.org) inner join s_system s on (s.id=p.org) where p.param='database' and p.org='${orgid}' `;
		    let ndatabase = properties.get('udatabase.database');
		    let inspath = properties.get('paths.instpath');
		    let nudatabase = "";
		    
		    db.query(sqlsent, function(rslt){

			fn.c('entra a la consulta db.query rslt_____________________________________________')
			fn.c(rslt)
			
			if(rslt.rows.length > 0){
			    
			    fn.c('entra al rslt.length > 0 de confirm linea 233_____________________________________________')

			    //asignar variable de nombre de base de datos
			    nudatabase = rslt.rows[0].value;
			    let usuario = rslt.rows[0].user
			    let email = rslt.rows[0].email
			    let password0 = rslt.rows[0].password
			    let tables = "s_rol"
			    let arrayrol = ""
			    
			    let uhost = properties.get('udatabase.host');
			    let uport = properties.get('udatabase.port');
			    let udatabase = properties.get('udatabase.database');  
			    let urlm = `${uhost}${uport}`;

			    //poner el codigo de creacion de archivo para las traducciones personalizadas del cliente
			    let translfile = `${nudatabase}.js`
			    const orig = `${inspath}/translations/minghos.js`
			    const dest =  `${inspath}/translations/${translfile}`
			    
			    // File destination.txt will be created or overwritten by default.
			    fs.copyFile(orig, dest, fs.constants.COPYFILE_EXCL, (err) => {
				if (err){
				    fn.c(err)
				} 
				fn.c(`translation file was created successfully ${orig} ${dest}`)
				//actualizar registro con el nombre del archivo de traducciones
			    });
			    
			    mongoclient.connect(urlm, {useUnifiedTopology: true}, function(err, db){
				
				let dbo = db.db(udatabase);
				let dbn = db.db(nudatabase);
				
				dbo.collection(tables).find().toArray(function(err, resltd) {

				    fn.c('resultado de consulta de s_rol')
				    fn.c(resltd)
				    //create array to insert user with all rol records in db master
				    let numr = resltd.length
				    
				    for(let i=0;i<numr;i++){
					let coma = ","
					
					if (i+1==numr){
					    coma = ""
					}
					
					arrayrol += "\""+resltd[i].name+"\"" + coma
				    }
				    
				    let jsonInsert = `{"rol":[${arrayrol}], "user":"${usuario}"}`
				    let jsonp = JSON.parse(jsonInsert)
				    let colins = "d_userui"
				    
				    dbn.collection(colins).insertOne(jsonp, (err, result) => {
					if (err){
					    fn.c(`error on insert ${jsonInsert}`);
					}else{
					    fn.c(`record inserted ${jsonInsert}`);
					    
					    let tableins = "s_user"
					    let jsonInsertU = `{"email":"${email}", "user":"${usuario}", "password":"${password0}", "tipo":"sistema", "estado":"activo"}`
					    let jsonpU = JSON.parse(jsonInsertU)
					    
					    dbn.collection(tableins).insertOne(jsonpU, (err, result) => {
						if (err){
						    fn.c(`error on insert ${jsonInsert}`);
						    res.send('{"ok":"0", "m":"an error has ocurred ${err} please try to activate the account again or send support comunication to Xsite <a href="mailto:soporte@xsitecompany.net">Mail</a>"}');
						}else{
						    fn.c('entra a crear el listado de modulos para activar')
						    //query the menu colleciton to activate this records
						    let htmlresp = "<html><title>Activation Process</title><body><form method='post' action='\enablemods'><p>Enable Components</p>"
						    htmlresp += `<input type='hidden' name='orgid' value='${orgid}'>`
						    
						    dbo.collection('s_menu').find().toArray(function(err, resltd) {
							//resltd.
							//user with all rol records in db master
							let numr = resltd.length
							
							for(let i=0;i<numr;i++){
							    htmlresp+=`<p><input type='checkbox' name='${resltd[i].id}'>${resltd[i].id}</p>`
							    if(numr == i+1){
								htmlresp+=`<button>Send</button></form></body></html>`
								res.send(htmlresp);
							    }
							}
						    });
						    //res.send('{"ok":"1", "m":"the account has been activated please login using credentials <a href="ilogin.html">Login</a>"}');
						    fn.c(`record inserted ${jsonInsert}`);
						}
					    });
					}
				    });
				});
			    });
			}
		    })
		}catch(e){
		    fn.c(e);
		}
	    }else{
		res.send('{"ok":"1", "m":"no se reconoce el orgid"}');
	    }
	}catch(e){
	    fn.c(e)
	}
    }catch(er){
	fn.c(er)
    }
});

/**
@description: user administration
*/
app.post('/adminusers', function(req, res){

    const pathname = url.parse(req.url).pathname;
    fn.c('entra a adminusers: '+pathname);
    
    try{
	//primero preguntar por la sesion iniciada
	let orgid = req.session.up.orgid

	//esta logueado sino enviar al login
	if(orgid>0){

	    let oper, jsonstring, jsons;
	    
	    try{
		fn.c('req.body');
		fn.c(req.body);

		!!req.body.oper? oper=req.body.oper:oper="";
		!!req.body.jsonString? jsonstring=req.body.jsonString:conditionsjsonstring="{}";
		jsons = JSON.parse(jsonstring);
		
	    }catch(e){
		fn.c(e);
	    }
	    
	    let id = jsons.id;
	    let user = jsons.user;
	    let password = jsons.password;
	    let email = jsons.email;
	    let type = jsons.type;
	    let lang = jsons.lang;

	    fn.c(`antes de db.initDefault() oper=${oper}`)
	    db.initDefault();
	    //logueo correctamente a la base de datos
	    try{
		if(oper=='activate'){
		    
		    fn.c('entra a oper activate')
		    //if user is defined
		    if(!!user){

			fn.c('entra a oper activate !!user')
			const verifysql = `SELECT 1 FROM pg_roles WHERE rolname='${user}'`;

			db.query(verifysql, function(r){

			    fn.c('entra a verifysql')
			    fn.c(verifysql)
			    
			    if (r.rowCount > 0){
				res.send('{"available":"0", "m":"the account already exists"}');
			    }else{
				try{
				    let arraySQL = []
				    //create new user
				    if(type=='usuario'){
					
					arraySQL[1] = `CREATE ROLE ${user} WITH LOGIN NOSUPERUSER NOCREATEDB NOCREATEROLE INHERIT NOREPLICATION CONNECTION LIMIT -1 PASSWORD '${password}'`;
					arraySQL[2] = `GRANT SELECT ON ALL TABLES IN SCHEMA public TO ${user};`;
					arraySQL[3] = `INSERT INTO public.d_uconfig("user", "lang", "org") VALUES ('${user}','${lang}','${orgid}')`
					
				    }else if(type=='sistema'){

					arraySQL[1] = `CREATE ROLE ${user} WITH LOGIN SUPERUSER INHERIT CREATEDB CREATEROLE NOREPLICATION PASSWORD '${password}';`;
					arraySQL[2] = `INSERT INTO public.d_uconfig("user", "lang", "org") VALUES ('${user}','${lang}','${orgid}')`
					
				    }

				    arraySQL.forEach(function(el){
					db.query(el, function(r){
					    fn.c(r)
					})
				    });

				    let udatabase = req.session.up.udatabase;  
				    let tables = "s_rol"
				    let uhost = properties.get('udatabase.host');
				    let uport = properties.get('udatabase.port');
				    
				    let urlm = `${uhost}${uport}`;
				    let arrayrol = '';
				    
				    //agregar el rol del usuario y demas cosas para que funcione el usuario
				    mongoclient.connect(urlm, {useUnifiedTopology: true}, function(err, db){
					
					let dbo = db.db(udatabase);
					//let dbn = db.db(nudatabase);
					
					dbo.collection(tables).find().toArray(function(err, resltd) {

					    fn.c('resultado de consulta de s_rol')
					    fn.c(resltd)
					    //create array to insert user with all rol records in db master
					    let numr = resltd.length
					    
					    for(let i=0;i<numr;i++){
						let coma = ","
						
						if (i+1==numr){
						    coma = ""
						}

						arrayrol += "\""+resltd[i].name+"\"" + coma
					    }
					    
					    let jsonInsert = `{"rol":[${arrayrol}], "user":"${user}"}`

					    fn.c('jsoninsert')
					    fn.c(jsonInsert)
					    
					    let jsonp = JSON.parse(jsonInsert)
					    let colins = "d_userui"
					    
					    dbo.collection(colins).insertOne(jsonp, (err, result) => {
						if (err){
						    fn.c(`error on insert ${jsonInsert}`);
						}else{
						    let tableins = "s_user"
						    let jsonInsertU = `{"email":"${email}", "user":"${user}", "password":"${password}", "tipo":"${type}", "estado":"activo"}`
						    let jsonpU = JSON.parse(jsonInsertU)
						    
						    dbo.collection(tableins).insertOne(jsonpU, (err, result) => {
							if (err){
							    fn.c(`error on insert ${jsonInsert}`);
							}else{
							    let neworg = "";
							    res.send('{"available":"1", "m":"the account has been inserted succesfuly"}');
							    fn.c(`record inserted ${jsonInsert}`);
							}
						    });
						    
						}
					    });
					});
				    });

				}catch(e){
				    fn.c(e)
				}
			    }
			})
		    }else{
			res.send('{"error":"1", "m":"the user does not recognize"}');
		    }
		}else{
		    fn.c('entra a oper not like activate')
		}
	    }catch(e){
		fn.c(e)
	    }
	}else{
	    res.redirect('/ilogin.html?v=false&u=invalid');
	}
    }catch(er){
	fn.c(er)
    }
});

//Search agenda meets
app.post('/enablemods', function(req, res){
    const pathname = url.parse(req.url).pathname;
    fn.c('post method:'+pathname);

    try{
        //let orgid = req.session.up.orgid
	let orgid = req.body.orgid;
	
        //esta logueado sino enviar al login
        if(orgid > 0){
	    fn.c(`entra al orgid ${orgid} enablemods:568`);
	    db.initDefault();
	    //logueo correctamente a la base de datos
	    try{
		//body login function
		const confirmsql = `select value from d_param where org='${orgid}' and param='database'`;
		
		db.query(confirmsql, function(r){
		    fn.c(`entra la consulta postgres  ${confirmsql} enablemods:576`);
		    
		    if(r.rows.length>0){
			fn.c(`entra a resultados de la consulta postgres  ${confirmsql} enablemods:576`);
			
			let udatabase = r.rows[0].value
			
			fn.v(req.session, res);
			
			let uhost = properties.get('udatabase.host');
			let uport = properties.get('udatabase.port');
			//let udatabase = req.session.up.udatabase;
			let urlm = `${uhost}${uport}`;
			
			//var datefin = req.body.datefin;
			
			let table = 's_menu';
			mongoclient.connect(urlm, {useUnifiedTopology: true}, function(err, db) {
			    
			    fn.c(`entra a mongoclient.connect  ${urlm} enablemods:595`);
			    
			    if (err) throw err;
			    const dbo = db.db(udatabase);
			    
			    req.body.forEach(function(item, index){
				
				fn.c(`entra a iteracion foreach ${item} ${index} enablemods:602`);
				
				if(req.body.item !== "on"){
				    
				    fn.c(`entra a iteracion foreach item= on ${item} ${index} enablemods:606`);
				    
				    dbo.collection(table).find({id:item}).toArray(function(err, result) {
					
					if (err) throw err;
					
					//remove record by id
					try{
					    fn.c(`entra a iteracion foreach item= on ${table} ${item} ${index} enablemods:614`);
					    
					    let idrecord = result[0]._id;
					    let returns = dbo.collection(table).deleteOne({_id:new mongodb.ObjectID(idrecord)}, (err, collection)=>{
					    })
					    
					}catch(e){
					    fn.c(e);
					}
				    });
				};
			    });
			    res.send(`{"e":"1", "m":"the modules collection has been updated"}`);
			});
		    }else{
			res.send(`{"e":"1", "m":"the database parameter has not been found"}`);
		    }
		});
	    }catch(e){
		fn.c(e)
	    }
	}else{
	    res.redirect('/ilogin.html?v=false&u=invalid');
	}
    }catch(er){
        fn.c(er)
	res.send('{"e":"1"}');
    }
});

/**
@description: user verification before creating
*/
app.post('/checkuser', function(req, res){

    const pathname = url.parse(req.url).pathname;
    fn.c('entra al confirm: '+pathname);

    let user = req.body.user;
    
    try{

	db.initDefault();
	//logueo correctamente a la base de datos
	try{
	    
	    //body login function
	    if(user){
		const verifysql = `SELECT 1 FROM pg_roles WHERE rolname='${user}'`;
		
		db.query(verifysql, function(r){
		    fn.c(r)
		    
		    if (r.rowCount > 0){
			res.send('{"available":"0", "m":"the account already exists"}');
		    }else{
			res.send('{"available":"1", "m":"the account does not exists"}');
		    }
		    
		},function(r){
		    res.send('{"e":"1", "m":"${r}"}');
		})
	    }else{
		res.send('{"ok":"1", "m":"no se reconoce el orgid"}');
	    }
	    
	}catch(e){
	    fn.c(e)
	}
    }catch(er){
	fn.c(er)
    }
});

/**
@description: company verification before creating
*/
app.post('/checkcompany', function(req, res){

    const pathname = url.parse(req.url).pathname;
    fn.c('entra al confirm: '+pathname);

    let company = req.body.company;
    
    try{
	
	db.initDefault();
	//logueo correctamente a la base de datos
	try{
	    
	    //body login function
	    if(company){
		const verifysql = `SELECT 1 FROM s_system WHERE org='${company}'`;
		
		db.query(verifysql, function(r){
		    fn.c(r)
		    
		    if (r.rowCount > 0){
			res.send('{"available":"0", "m":"the account already exists"}');
		    }else{
			res.send('{"available":"1", "m":"the account does not exists"}');
		    }
		    
		},function(r){
		    res.send('{"e":"1", "m":"${r}"}');
		})
	    }else{
		res.send('{"ok":"1", "m":"no se reconoce el company"}');
	    }
	    
	}catch(e){
	    fn.c(e)
	}
    }catch(er){
	fn.c(er)
    }
});

/**
@description: user email verification before creating
*/
app.post('/checkemail', function(req, res){

    const pathname = url.parse(req.url).pathname;
    fn.c('entra al confirm: '+pathname);

    let email = req.body.email;
    
    try{
	
	db.initDefault();
	//logueo correctamente a la base de datos
	try{
	    
	    //body login function
	    if(email){
		const verifysql = `SELECT 1 FROM s_system WHERE email='${email}'`;
		
		db.query(verifysql, function(r){
		    fn.c(r)
		    
		    if (r.rowCount > 0){
			res.send('{"available":"0", "m":"the account already exists"}');
		    }else{
			res.send('{"available":"1", "m":"the account does not exists"}');
		    }
		    
		},function(r){
		    res.send('{"e":"1", "m":"${r}"}');
		})
	    }else{
		res.send('{"ok":"1", "m":"no se reconoce el email"}');
	    }
	    
	}catch(e){
	    fn.c(e)
	}
    }catch(er){
	fn.c(er)
    }
});

/**
@description: user email verification before creating
*/
app.post('/checknit', function(req, res){

    const pathname = url.parse(req.url).pathname;
    fn.c('entra al confirm: '+pathname);

    let nit = req.body.nit;
    
    try{
	
	db.initDefault();
	//logueo correctamente a la base de datos
	try{
	    
	    //body login function
	    if(nit){
		const verifysql = `SELECT 1 FROM s_system WHERE nit='${nit}'`;
		
		db.query(verifysql, function(r){
		    fn.c(r)
		    
		    if (r.rowCount > 0){
			res.send('{"available":"0", "m":"the account already exists"}');
		    }else{
			res.send('{"available":"1", "m":"the account does not exists"}');
		    }
		    
		},function(r){
		    res.send('{"e":"1", "m":"${r}"}');
		})
	    }else{
		res.send('{"ok":"1", "m":"no se reconoce el email"}');
	    }
	    
	}catch(e){
	    fn.c(e)
	}
    }catch(er){
	fn.c(er)
    }
});


/**
 @description: Application registry creation user and database creation and replicate the mongodb database
*/
app.post('/registry', function(req, res){
    
    const pathname = url.parse(req.url).pathname;
    fn.c('entra al registry: '+pathname);
    
    let languaje = req.body.languaje;
    let nit = req.body.nit;
    let company = req.body.company;
    let representantelegal = req.body.representantelegal;
    let email = req.body.email;
    let usuario = req.body.usuario;
    let password0 = req.body.password0;
    
    try{
	try{
	    fn.cl();
	    db.initDefault();
	    registroExitoso = false;
	    //logueo correctamente a la base de datos
	    const sqlp = `select id from s_system where nit = '${nit}' or org = '${company}' or email='${email}'`;

	    db.query(sqlp, function(r){
		//the record already exists
		if (r.rows.length > 0){
		    //existeReg=true;
		    let lnb = new Error().stack;
		    let msg = `{"e":"1", "m":"the record already exists please follow the <a href='recover.html'>recover</a> option if the credentials has ben forgotten nit:${nit}, company:${company}", "em":"${r}", "l":"${lnb}"}`;
		    
		    fn.c(msg);
		    res.send(msg);
		    
		//the record does not exists    
		}else if(r.rows.length==0){

		    try{
			//by login function
			let createusersql = `create role ${usuario} login superuser password '${password0}'`;
			let neworg = "";
			let maxuser = 0;

			db.query(createusersql, function(r){

			    fn.c('user creation success\n');
			    fn.c(r);
			    
			    //5 Licenses
			    let deffaccount = '5L';

			    //define all account options
			    switch(deffaccount){
			    case "5L":
				maxuser = 5;
				break;
			    }

			    try{
				
				let hostdb = properties.get('database.host');
				let portdb = properties.get('database.port');
				let database = properties.get('database.database');
				let user = properties.get('recover.user');
				let passw = properties.get('recover.password');
				let conf0 = properties.get('recover.host0');
				let conf1 = properties.get('recover.host1');
				let uhost = properties.get('udatabase.host');
				let host_c = properties.get('udatabase.host_c');
				let uport = properties.get('udatabase.port');
				let upath = properties.get('paths.backupl');
				let inspath = properties.get('paths.instpath');
				let utable = properties.get('recover.table');
				let ucriterial = properties.get('recover.criterial');
				let urlm = `${uhost}${uport}`;
				
				let dat = new Date;
				let datm = dat.getTime();
				let hashDb = crypto.createHmac('sha256', datm.toString()).update('hashDB').digest('hex');		    

				let sentence1 = `insert into public.s_system (version, token, org, nuser, maxuser, active, nit, email, fecharegistro) values ('${version}', '${hashDb}', '${company}', '0', '${maxuser}', false, '${nit}', '${email}', NOW()) returning id`;
				let orgid = 0;
				
				db.query(sentence1, function(rc){

				    orgid = rc.rows[0].id;

				    let udatabase = properties.get('udatabase.database');
				    let nudatabase = udatabase+orgid;
				    
				    //insert parameters section
				    let arrayS = [];
				    
				    arrayS.push(`insert into public.d_uconfig("user", "lang", "org") VALUES ('${usuario}','${languaje}','${orgid}')`);
				    arrayS.push(`insert into public.d_param("org","param","value") VALUES (${orgid},'database','${nudatabase}')`);
				    arrayS.push(`insert into public.d_param("org","param","value") VALUES (${orgid},'host','${host_c}')`);
				    arrayS.push(`insert into public.d_param("org","param","value") VALUES (${orgid},'port',${uport})`);
				    
				    let i = arrayS.length;

				    for(j=0;j<i;j++){
					fn.c(arrayS[j]);
					db.query(arrayS[j], function(rc){
					    //fn.c(`${arrayS[j]} l256 ___________________________________________________________________`);
					    //fn.c(rc);
					}, function(r){
					    let lnb = new Error().stack
					    let msg = `{"e":"1", "m":"the insert has failed ${arrayS[j]}", "em":"${r}", "l":"${lnb}"}`;
					    fn.c(msg);
					    res.send(msg);
					})
				    }

				    try{
					//duplicate mongodb db
					mongoclient.connect(urlm, {useUnifiedTopology: true}, function(err, db){
					    let dbo = db.db(udatabase);
					    let dbn = db.db(nudatabase);

					    dbo.listCollections().toArray(function(err, col){
						
						let i=col.length;

						for(j=0;j<i;j++){
						    
						    let collect = col[j].name;
						    
						    fn.c(`creating collection: ${collect}`);
						    dbn.createCollection(collect);
						    dbo.collection(collect).find().sort({"order":1}).toArray(function(err, result) {

							try{
							    //copy static records collections with prefix s_
							    if(collect.startsWith("s_") || collect.startsWith("d_priv")){
								if(!collect.startsWith("s_user") || collect.startsWith("d_priv")){
								    let k = result.length;
								    
								    for(l=0;l<k;l++){
									
									let jsonInsert = result[l];

									try{
									    dbn.collection(collect).insertOne(jsonInsert, (err, result) => {
										if (err){
										    fn.c("error on insert" );
										    fn.c(jsonInsert)
										}else{
										    fn.c("record inserted")
										    fn.c(jsonInsert)
										}
									    });
									}catch(e){
									    fn.c(e);
									}
								    }
								}
							    }
							    
							    // codigo para creacion de indices en todos los collection
							    let numr = 1
							    let arrayProps = []
							    let props = ''
							    
							    for(let ji=0;ji<numr;ji++){
								fn.c(result[ji])
								let item = result[ji]
								for (const property in item) {
								    arrayProps.push(property)
								}
							    }

							    fn.c('comentarios')
							    fn.c(arrayProps)
							    let ij = arrayProps.length
							    
							    for(ijk=0;ijk<ij;ijk++){
								let coma = ","
								if(ijk+1==ij){
								    coma = ""
								}
								
								props += `"${arrayProps[ijk]}":"1" ${coma}`
							    }
							    
							    fn.c(`props:${props}`)
							    
							    const propsjs = `{${props}}`
							    
							    try{
								fn.c(`props to create index ${props}`)
								let jsonpU = JSON.parse(propsjs)
								
								//dbn.collection(collect).createIndex(jsonpU, { default_language: "spanish" }, {name:"index_text"}, {content:"text"});
								dbn.collection(collect).createIndex({ "$**" : 1 });
							    }catch(er){
								fn.c(er)
							    }
							    
							}catch(e){
							    fn.c(e);
							}
						    });

						    /*
						    dbo.collection(collect).find().toArray(function(err,resltd){
						    })
						    */
						}
					    });
					});
					
					let urlconfirm = conf0+`:${port}`+conf1+`?orgid=${orgid}`;
					let urllogin = conf0+`:${port}/login`;
					let resp = fn.sendMail(email, `Activation message Minghos App ${company}`, `the company ${company} has been signed up on Minghos, to activate user/password ${usuario} please follow this url: <a href='${urlconfirm}'>${urlconfirm}</a> thanks:Minghos team`, db);
					
					res.send(`{"ok":"1", "m":"please review the email account and follow the <a href='${urllogin}'>link</a> to activate user", "remail":"${resp}"}`);
					
				    }catch(er){
					res.send(`{"e":"1", "m":"${er}"}`);
				    }
				    
				}, function(r){
				    let lnb = new Error().stack;
				    let msg = `{"e":"1", "m":"the insert has failed ${sentence1}", "em":"${r}", "l":"${lnb}"}`;
				    fn.c(msg);
				    res.send(msg);
				});
			    }catch(e){
				res.send(`{"e":"1", "m":"${e}"}`);
				res.redirect('/index.html?v=false&u='+usuario);
				fn.c(e);
			    }
			},function(r){
			    //enviar mensaje al frontend porque la creacion del usuario ha fallado, seguramente porque el usuario ingresado ya existe
			    let lnb = new Error().stack;
			    let msg = `{"e":"1", "m":"the insert has failed: ${createusersql}", "em":"${r}", "l":"${lnb}"}`;
			    fn.c(msg);
			    res.send(msg);
			});
			//responder cuando el registro existe en base de datos    
			
		    }catch(e){
			res.send(`{"e":"1", "m":"${e}"}`);
			res.redirect('/index.html?v=false&u='+usuario);
			fn.c(e);
		    }
		}
	    }, function(r){
		let lnb = new Error().stack;
		let msg = `{"e":"1", "m":"the query has failed ${sqlp}", "em":"${r}", "l":"${lnb}"}`;
		fn.c(msg);
		res.send(msg);
	    })
	}catch(er){
	    res.send(`{"e":"1", "m":"${er}"}`);
	    fn.c('Error trying to postgres connect line (180):');
	    fn.e(er);
	}
    }catch(e){
	fn.c('Error trying to postgres connect line (184):' + e.toString());
	fn.e(e);
	res.send(`{"e":"1", "m":"${e}"}`);
    }
});

//testing insert thousand records in postgres 
app.post('/addrecordpg', function(req, res){

    try{
	try{
	    //primero preguntar por la sesion iniciada
	    let orgid = req.session.up.orgid

	    //esta logueado sino enviar al login
	    if(orgid>0){

		fn.v(req.session, res);
		const pathname = url.parse(req.url).pathname;
		fn.c('entra al addrecordpg: '+pathname);

		!!req.body.collection? collection=req.body.collection:collection="";
		!!req.body.jsonstring? jsonstring=req.body.jsonstring:jsonstring="";

		const j = JSON.parse(jsonstring);

		let inserts = "INSERT INTO "+collection;
		let iter = 0;
		let l = Object.keys(j).length;
		let fields = " (";
		let values = " (";
		
		for (let [key, value] of Object.entries(j)) {
		    
		    let coma = ",";
		    
		    if(iter==(l-1)){
			coma="";
		    }

		    let parentesis = "";
		    
		    if(iter==(l-1)){
			parentesis=")";
		    }

		    fields += key+coma+parentesis;
		    values += "'" + value+"'"+coma+parentesis;
		    iter++;
		}

		inserts += fields + " VALUES " + values;

		try{
		    db.query(inserts,
			     function(result){
				 //wp.createWebPage(res,'form1')
				 fn.c(`the insert was successfull`);
				 res.send(result)
			     },
			     function(e){
				 fn.c(`the insert has failed ${e}`)
				 res.send(e)
			     }
			    );
		}catch(e){
		    //res.redirect('/index.html?v=false&u='+user+'&p='+passw)
		    fn.c(e);
		}
	    }else{
		res.redirect('/ilogin.html?v=false&u=invalid'); 
	    }
	}catch(e){
	    fn.c(e);
	}
    }catch(e){
	fn.c('Error trying to postgres connect line (184):' + e.toString());
	res.send('{"e":"1"}');
    }
});

//testing insert thousand records in postgres 
app.post('/addrecordprc', function(req, res){

    try{

	try{
	    
            //primero preguntar por la sesion iniciada
            let orgid = req.session.up.orgid
            
            //esta logueado sino enviar al login                                                                                                                                                               
            if(orgid>0){
		
		fn.v(req.session, res);
		const pathname = url.parse(req.url).pathname;
		fn.c('entra al addrecordpg: '+pathname);
		
		!!req.body.collection? collection=req.body.collection:collection="";
		!!req.body.proceso? proceso=req.body.proceso:proceso="";
		!!req.body.etapas? etapas=req.body.etapas:etapas="";
		
		const j = `{"proceso":"${proceso}", "etapas":"${etapas}"}`;
		
		let inserts = "INSERT INTO "+collection;
		//var iter = 0;
		//var l = Object.keys(j).length
		let fields = " (";
		let values = " (";
		
		inserts += `${fields} proceso) VALUES ${values} '${j}') `; 
		
		try{
		    db.query(inserts,
			     function(result){
				 //wp.createWebPage(res,'form1')
				 fn.c(`the insert was successfull`);
				 res.send(result)
			     },
			     function(e){
				 fn.c(`the insert has failed ${e}`)
				 res.send(e)
			     }
			    );
		}catch(e){
		    //res.redirect('/index.html?v=false&u='+user+'&p='+passw)
		    fn.c(e);
		}
	    }else{
		res.redirect('/ilogin.html?v=false&u=invalid');
	    }
	}catch(er){
            fn.c(er)
        } 
    }catch(e){
	fn.c('Error trying to postgres connect line (184):' + e.toString());
	res.send('{"e":"1"}');
    }
});

//Application login and form structure creation
app.post('/recover', function(req, res){

    //use default user password to body the database and send to proper email
    try{
	//RDBMS properties
	const host = properties.get('database.host');
	const port = properties.get('database.port');
	const database = properties.get('database.database');
	const user = properties.get('recover.user');
	const passw = properties.get('recover.password');
	const utable = properties.get('recover.table');
	const ucriterial = properties.get('recover.criterial');
	const uhost = properties.get('udatabase.host');
	const uport = properties.get('udatabase.port');
	const udatabase = properties.get('udatabase.database');
	const urlm = `${uhost}${uport}`;
	
	try{
	    try{

		//db.initDefault();

		const valuesrch = req.body.email;
		
		if (valuesrch == ""){
		    busqueda = "";
		}else{
		    busqueda = JSON.parse(`{\"${ucriterial}\":\"${valuesrch}\"}`);
		}

		mongoclient.connect(urlm, {useUnifiedTopology: true}, function(err, dbs){

		    if (err) throw err;
		    const dbo = dbs.db(udatabase);
		    
		    dbo.collection(utable).find(busqueda).toArray(function(err, result) {
			
			if (err) throw err;
			
			
			const numl = result.length;
			let mrespuesta = "";
			
			if (numl > 0){
			    
			    let emailto = result[0].email;
			    let passw = result[0].password;
			    let suser = result[0].user;
			    
			    let date = new Date();
			    let timestamp = date.getTime();
			    
			    let resp = fn.sendMail(emailto, `${nameApp}: Recover email message ${timestamp}`, `${nameApp} the user/password asociated to account is:  ${suser}/${passw}`, db);
			    //cambiar textos a funciones de carga de traducciones del lado del servidor
			    //res.send(resp);
			    res.redirect('/index.html?semail='+emailto);

			}else{

			    //cambiar a carga de traducciones
			    mrespuesta = "There is no account related to this email";
			    res.redirect('/index.html?vemail=false');
			}
			
			fn.c(numl);
			db.close();
		    });
		});
	    }catch(Error){
		fn.c(Error);
	    }
	}catch(er){
	    fn.c('Error trying to postgres connect line (180):' + er.toString());
	}
    }catch(e){
	fn.c('Error trying to postgres connect line (184):' + e.toString());
	res.send('{"e":"1"}');
    }
});

//Search agenda meets
app.post('/agendabymonth', function(req, res){
    const pathname = url.parse(req.url).pathname;
    fn.c('get method:'+pathname);

    try{
	try{
            //primero preguntar por la sesion iniciada
            let orgid = req.session.up.orgid

            //esta logueado sino enviar al login
            if(orgid>0){
		
		fn.v(req.session, res);

		let uhost = properties.get('udatabase.host');
		let uport = properties.get('udatabase.port');
		let udatabase = req.session.up.udatabase;
		let urlm = `${uhost}${uport}`;

		let table = req.body.table;
		let dateini = req.body.dateini;
		let datefin = req.body.datefin;

		//truncate dates to skip time
		let arrDateIni = dateini.split('T');
		let arrDateFin = datefin.split('T');
		
		let srch = {
		    fechacita: {
			$gte:arrDateIni[0],
			$lte:arrDateFin[0],
		    }
		}

		fn.cl();
		fn.c(srch);
		
		mongoclient.connect(urlm, {useUnifiedTopology: true}, function(err, db) {
		    
		    if (err) throw err;
		    const dbo = db.db(udatabase);

		    if (!!table){
			dbo.collection(table).find(srch).sort({"horacita":1}).toArray(function(err, result) {
			    
			    if (err) throw err;
			    res.send(result);
			    db.close();
			});
		    }
		});
	    }else{
		res.redirect('/ilogin.html?v=false&u=invalid');
	    }
	}catch(er){
            fn.c(er)
	}
	
    }catch(Error){
	fn.c(Error);
	res.send('{"e":"1"}');
    }	    
});

let maxconn = 100;
let arrMPend = [];
//chat requests engine
app.post('/cre', function(req, res){
    const pathname = url.parse(req.url).pathname;
    fn.c('get method:'+pathname);

    try{
	try{
            //primero preguntar por la sesion iniciada
            let orgid = req.session.up.orgid
	    
            //esta logueado sino enviar al login
            if(orgid>0){

		fn.v(req.session, res);

		let uhost = properties.get('udatabase.host');
		let uport = properties.get('udatabase.port');
		let udatabase = req.session.up.udatabase;
		let urlm = `${uhost}${uport}`;
		
		//num message
		let nm = req.body.numess;
		
		if (nm){
		    busqueda= JSON.parse("{\"id\": {\"$gt\":\""+nm+"\"");
		}

		mongoclient.connect(urlm, {useUnifiedTopology: true}, function(err, db) {
		    
		    if (err) throw err;
		    const dbo = db.db(udatabase);

		    if (!!table){
			dbo.collection(table).find(busqueda).toArray(function(err, result) {

			    if(result.row.length==0){
				
				if (err) throw err;
				res.send(result);

				arrMPend.push(res);
			    }else{
				let i = arrMPend.length;
				
				for(j=0;i<=i;j++){
				    arrMPend[i].send(result);
				}
			    }
			});
		    }
		});
	    }else{
		res.redirect('/ilogin.html?v=false&u=invalid');
	    }
	}catch(er){
            fn.c(er)
	}
    }catch(Error){
	fn.c(Error);
	res.send('{"e":"1"}');
    }	    
});


//full text search witout using criterial for searching, need to create the text index previously on the collection
app.post('/ftsearch', function(req, res){
    const pathname = url.parse(req.url).pathname;
    fn.c('get method:'+pathname);

    try{
	try{
	    //primero preguntar por la sesion iniciada
            let orgid = req.session.up.orgid
	    
            //esta logueado sino enviar al login
            if(orgid>0){

		fn.v(req.session, res);

		let uhost = properties.get('udatabase.host');
		let uport = properties.get('udatabase.port');
		let udatabase = req.session.up.udatabase;
		let urlm = `${uhost}${uport}`;

		fn.c('parametros');
		fn.c(uhost);
		fn.c(uport);
		fn.c(udatabase);
		
		const table = req.body.table;
		const valuesrch = req.body.value;
		const criterial = req.body.criterial
		let busqueda = "";
		
		if (!!valuesrch){
		    if(!!criterial){
			if(criterial=='_id'){
			    busqueda = {_id:new mongodb.ObjectID(valuesrch)};
			}else{
			    busqueda = JSON.parse("{\""+criterial+"\":\""+valuesrch+"\"}");
			}
		    }else{
			busqueda = { $text: { $search : valuesrch}};
		    }
		}else{
		    busqueda = "";
		}

		mongoclient.connect(urlm,{useUnifiedTopology: true}, function(err, db) {
		    
		    const dbo = db.db(udatabase);
		    
		    if (!!table){
			dbo.collection(table).find(busqueda).toArray(function(err, result) {
			    
			    if (err){
				fn.c(err);
				res.send(`{"txte":"${err}"}`);
			    }else{
				res.send(result);
				db.close();
			    }
			});
		    }
		});
	    }else{
		res.redirect('/ilogin.html?v=false&u=invalid');
	    }
	}catch(er){
            fn.c(er)
	}	
    }catch(Error){
	fn.c(Error);
	res.send('{"e":"1"}');
    }	    
});

//Search request
app.post('/search', function(req, res){
    const pathname = url.parse(req.url).pathname;
    fn.c(`post method: ${pathname}`);

    try{
	try{
	    //primero preguntar por la sesion iniciada
            let orgid = req.session.up.orgid
	    
            //esta logueado sino enviar al login
            if(orgid>0){

		fn.v(req.session, res);

		let uhost = properties.get('udatabase.host');
		let uport = properties.get('udatabase.port');
		let udatabase = req.session.up.udatabase;
		let urlm = `${uhost}${uport}`;

		fn.c('parametros');
		fn.c(uhost);
		fn.c(uport);
		fn.c(udatabase);
		
		const table = req.body.table;
		const valuesrch = req.body.value;
		const criterial = req.body.criterial;
		let busqueda = "";
		
		if (!!valuesrch){
		    if(criterial=='_id'){
			busqueda = {_id:new mongodb.ObjectID(valuesrch)};
		    }else{
			busqueda = JSON.parse("{\""+criterial+"\":\""+valuesrch+"\"}");
		    }
		}else{
		    busqueda = "";
		}

		mongoclient.connect(urlm, {useUnifiedTopology: true}, function(err, db) {
		    if (err) throw err;
		    const dbo = db.db(udatabase);
		    
		    if (!!table){
			dbo.collection(table).find(busqueda).toArray(function(err, result) {
			    
			    if (err) throw err;
			    res.send(result);
			    db.close();
			});
		    }
		});
	    }else{
		res.redirect('/ilogin.html?v=false&u=invalid');
	    }
	}catch(er){
            fn.c(er)
	}
    }catch(Error){
	fn.c(Error);
	res.send('{"e":"1"}');
    }	    
});

//Send comunication request
app.post('/send', function(req, res){
    const pathname = url.parse(req.url).pathname;

    try{
	try{
	    //primero preguntar por la sesion iniciada
            let orgid = req.session.up.orgid
	    
            //esta logueado sino enviar al login
            if(orgid>0){

		fn.v(req.session, res);

		let uhost = properties.get('udatabase.host');
		let uport = properties.get('udatabase.port');
		let udatabase = req.session.up.udatabase;
		let urlm = `${uhost}${uport}`;
		//collections for mongodb send sms subsystem
		const c_system = "s_system";
		const c_comunication = "s_comunication";
		const c_person = "s_person";


		mongoclient.connect(urlm,{useUnifiedTopology: true}, function(err, db) {

		    if (err) throw err;
		    
		    const dbo = db.db(udatabase);
		    let typedoc;
		    let groupf;
		    let messagecom;
		    let accountSid; 
		    let authToken;
		    let fromNumber;
		    
		    !!req.body.id? iddoc=req.body.id:iddoc="";
		    !!req.body.type? typedoc=req.body.type:typedoc="";
		    !!req.body.group? groupf=req.body.group:groupf="";	    

		    try{
			
			switch(typedoc){
			case "whatsapp":   
			case "sms":
			    fn.c("entra a sms l277");
			    
			    //search auth code y token
			    dbo.collection(c_system).find().toArray(function(err, resultat){
				accountSid = resultat[0].accountsid;
				authToken = resultat[0].authtoken;
				fromNumber = resultat[0].fromnumber;
			    });

			    //search the comunication text
			    dbo.collection(c_comunication).find({_id:new mongodb.ObjectID(iddoc)}).toArray(function(err, resultcol){
				messagecom = resultcol[0].comunicado;
			    });
			    
			    let busq = JSON.parse("{\"grupo\":\""+groupf+"\"}");
			    fn.c(busq);    
			    dbo.collection(c_person).find(busq).toArray(function(err, result) {

				if (err) throw err;

				fn.c("entra a buscar l296");
				
				if (accountSid && authToken){

				    fn.c("entra a accountsid y authtoken");
				    fn.c(result);
				    
				    let client = require('twilio')(accountSid, authToken);    
				    let lenarr = result.length;    

				    if (typedoc=="whatsapp"){
					fromNumber = "whatsapp:"+fromNumber;
				    }
				    
				    result.forEach(function(element){

					if (typedoc=="whatsapp"){
					    element.celular = "whatsapp:"+element.celular;
					}
					
					client.messages.create({
					    body:messagecom,
					    to: element.celular,
					    from:fromNumber
					}).then((message) => console.log("response from twilio:"+element.celular +" "+ message.sid));
				    });
				}else{
				    fn.c("accountSid and authToken not set correctly"); 
				}
			    });

			    break;
			case "email":

			    let properties = fn.loadProperties('./conf/conf.properties');
			    let nodemailer = require('nodemailer');
			    const host = properties.get('conf.email.host');
			    const port = properties.get('conf.email.port');
			    const secure = properties.get('conf.email.secure');
			    const requiretls = properties.get('conf.email.requiretls');
			    const email= properties.get('conf.email.from');
			    const password= properties.get('conf.email.password');
			    let arrayResponse = new Array();
			    
			    let transporter = nodemailer.createTransport({
				host: host,
				port: port,
				secure: secure,
				requireTLS: requiretls,
				auth: {
				    user: email,
				    pass: password
				}
			    });

			    !!req.body.typec? typec=req.body.typec:typec="";
			    !!req.body.group? group=req.body.group:group="";
			    !!req.body.comunicado? comunicado=req.body.comunicado:comunicado="";
			    !!req.body.titulo? titulo=req.body.titulo:titulo="";
			    
			    let busqu = JSON.parse("{\"grupo\":\""+group+"\"}");
			    dbo.collection(typec).find(busqu).toArray(function(err, resultcol){

				let numl = resultcol.length;
				let emailto;

				for(let i=0;i<numl;i++){
				    
				    emailto = resultcol[i].email

				    fn.c(emailto);
				    
    				    const mailOptions = {
					from: email, // sender address
					to: emailto, // list of receivers
					subject: titulo, // Subject line
					html: comunicado// plain text body
				    };

				    fn.c(mailOptions);
				    
				    transporter.sendMail(mailOptions, function (err, info) {
					fn.c("envio de email"+emailto);
					fn.c(err);
					fn.c(info);
					
					arrayResponse[i]=info
				    });
				}
			    });
			    res.send(arrayResponse);
			    break;
			}
		    }catch(e){
			fn.c(e);
		    }
		});
	    }else{
		res.redirect('/ilogin.html?v=false&u=invalid');
	    }
	}catch(er){
            fn.c(er)
	}		
    }catch(Error){
	fn.c(Error);
	res.send('{"e":"1"}');
    }	    
});

//Delete record
app.post('/delete', function(req, res){
    const pathname = url.parse(req.url).pathname;
    
    try{
	try{
	    //primero preguntar por la sesion iniciada
            let orgid = req.session.up.orgid
	    
            //esta logueado sino enviar al login
            if(orgid>0){

		fn.v(req.session, res);

		let uhost = properties.get('udatabase.host');
		let uport = properties.get('udatabase.port');
		let udatabase = req.session.up.udatabase;
		let urlm = `${uhost}${uport}`;

		mongoclient.connect(urlm, {useUnifiedTopology: true}, function(err, db) {

		    if (err) throw err;
		    const dbo = db.db(udatabase);
		    let idrecord;
		    let tablef;
		    
		    !!req.body.id? idrecord=req.body.id:idrecord="";
		    !!req.body.table? tablef=req.body.table:tablef="";	    

		    fn.c('idrecord:'+idrecord);
		    fn.c(tablef);
		    
		    //remove record by id
		    try{
			let returns = dbo.collection(tablef).deleteOne({_id:new mongodb.ObjectID(idrecord)}, (err, collection)=>{
			    if(err){
				res.send(err);
			    }
			    
			    res.send(collection.result);
			})
			
			fn.c(returns);
			
		    }catch(e){
			fn.c(e);
		    }

		});
	    }else{
		res.redirect('/ilogin.html?v=false&u=invalid');
	    }
	}catch(er){
            fn.c(er)
	}
    }catch(Error){
	fn.c(Error);
	res.send('{"e":"1"}');
    }	    
});

//System Information
app.post('/system', function(req, res){
    const pathname = url.parse(req.url).pathname;
    const urlws = properties.get('app.wsurl');
    const cwsport = properties.get('app.cwsport');
    
    try{
	try{
	    //primero preguntar por la sesion iniciada
            let orgid = req.session.up.orgid
	    
            //esta logueado sino enviar al login
            if(orgid>0){

		fn.v(req.session, res);

		let uhost = properties.get('udatabase.host');
		let uport = properties.get('udatabase.port');
		let udatabase = req.session.up.udatabase;
		let urlm = `${uhost}${uport}`;

		mongoclient.connect(urlm,{useUnifiedTopology: true}, function(err, db) {

		    if (err) throw err;

		    const dbo = db.db(udatabase);

		    const col2 = 'd_userui';
		    let objsearch2 = {user:req.session.up.user};
		    
		    dbo.collection(col2).find(objsearch2).toArray(function(err, rslt) {
			if (err) throw err;

			fn.c(rslt);
			fn.c(objsearch2);
			fn.c('d_userui-------------------------------------------------------------------------------------------');
			
			const col3 = 'd_privilege';

			//use the first assigned rol use for default
			let rol = rslt[0].rol[0];
			let dLUser = rslt[0].dL;
			let objsearch3 = {rol:rol};

			dbo.collection(col3).find(objsearch3).toArray(function(err, result) {
			    if (err) throw err;
			    
			    const obj = {
				nameapp:nameApp,
				version:version,
				user:req.session.up.user,
				rol:rol,
				dLUser:dLUser,
				privArray:result[0].priv,
				urlws:urlws,
				cwsport:cwsport
			    };

			    res.send(obj);
			    
			});
		    });
		});
	    }else{
		res.redirect('/ilogin.html?v=false&u=invalid');
	    }
	}catch(er){
            fn.c(er)
	}
    }catch(Error){
	fn.c(Error);
	res.send('{"e":"1"}');
    }	    
});

//Loadform request
app.post('/savetransfile', function(req, res){

    //var pathname = url.parse(req.url).pathname;
    fn.c('entra al procesamiento del save transfile...');
    
    try{
	try{
	    let inspath = properties.get('paths.instpath');
	    //primero preguntar por la sesion iniciada
            let orgid = req.session.up.orgid
            //esta logueado sino enviar al login
            if(orgid>0){

		fn.v(req.session, res);

		let nudatabase = req.session.up.udatabase;

		let translfile = `${nudatabase}.js`
		const dest =  `${inspath}/translations/${translfile}`

		let textrans = ""
		!!req.body.text? textrans=decodeURIComponent(req.body.text):textrans="";
		
		fs.writeFile(dest, textrans, function (err) {
		    if (err){
			fn.c(err)
		    }else{//guarda correctamente el archivo
			res.send('{"ok":"1", "m":"the translation file has been saved successfully, please reload the application"}');
		    };
		});
	    }else{
		res.redirect('/ilogin.html?v=false&u=invalid');
	    }
	}catch(er){
            fn.c(er)
	}
    }catch(E){
	fn.c(E);
	res.send('{"e":"1"}');
    }	    
});

//Loadform request
app.post('/transfile', function(req, res){

    //var pathname = url.parse(req.url).pathname;
    fn.c('entra al procesamiento del loadcollection...');
    
    try{
	try{
	    let inspath = properties.get('paths.instpath');
	    //primero preguntar por la sesion iniciada
            let orgid = req.session.up.orgid
            //esta logueado sino enviar al login
            if(orgid>0){

		fn.v(req.session, res);

		let nudatabase = req.session.up.udatabase;

		let translfile = `${nudatabase}.js`
		const dest =  `${inspath}/translations/${translfile}`
			    
		//serch file with same name as udatabase
		fs.readFile(dest, 'utf8' , (err, data) => {
		    if (err) {
			fn.c(err)
		    }else{
			res.send(data);
		    }
		})
	    }else{
		res.redirect('/ilogin.html?v=false&u=invalid');
	    }
	}catch(er){
            fn.c(er)
	}
    }catch(E){
	fn.c(E);
	res.send('{"e":"1"}');
    }	    
});

//Loadform request
app.post('/loadcollection', function(req, res){

    //var pathname = url.parse(req.url).pathname;
    fn.c('entra al procesamiento del loadcollection...');
    
    try{
	try{
	    //primero preguntar por la sesion iniciada
            let orgid = req.session.up.orgid
	    
            //esta logueado sino enviar al login
            if(orgid>0){

		fn.v(req.session, res);

		const uhost = properties.get('udatabase.host');
		const uport = properties.get('udatabase.port');
		let udatabase = req.session.up.udatabase;
		let urlm = `${uhost}${uport}`;
		
		const pathname = url.parse(req.url).pathname;

		mongoclient.connect(urlm,{useUnifiedTopology: true}, function(err, db) {

		    if (err) throw err;
		    const dbo = db.db(udatabase);
		    let collectionName;
		    let conditions;

		    try{
			fn.c('req.body');
			fn.c(req.body);
			
			!!req.body.collection? collectionName=req.body.collection:collectionName="";
			!!req.body.conditions? conditions=req.body.conditions:conditions="{}";
			conditions = JSON.parse(conditions);

		    }catch(e){
			fn.c(conditions);
		    }

		    fn.c('conditions:');
		    fn.c(conditions);
		    
		    //pass to array all collection and return as array to http request
		    dbo.collection(collectionName).find(conditions).toArray(function(err, result) {
			//dbo.collection(collectionName).find(c).toArray(function(err, result) {
			if (err) throw err;
			res.send(result);
			db.close();
		    });
		});
	    }else{
		res.redirect('/ilogin.html?v=false&u=invalid');
	    }
	}catch(er){
            fn.c(er)
	}
    }catch(E){
	fn.c(E);
	res.send('{"e":"1"}');
    }	    
});

//Loadform request
app.post('/senditem', function(req, res){
    const pathname = url.parse(req.url).pathname;
    
    try{
	try{
	    let orgid = req.session.up.orgid
	    
            //esta logueado sino enviar al login
            if(orgid>0){

		fn.v(req.session, res);

		let uhost = properties.get('udatabase.host');
		let uport = properties.get('udatabase.port');
		let udatabase = req.session.up.udatabase;
		let urlm = `${uhost}${uport}`;

		mongoclient.connect(urlm,{useUnifiedTopology: true}, function(err, db) {

		    if (err) throw err;
		    const dbo = db.db(udatabase);
		    let collectionid;
		    let options;
		    let criteria = "";
		    let update = "";
		    
		    !!req.body._id? _id=req.body._id : _id="";
		    !!req.body.tipo? tipo=req.body.tipo : tipoidproceso="";
    		    !!req.body.nombre? nombre=req.body.nombre : nombre="";
		    !!req.body.responsable? responsable=req.body.responsable.split(",") : reponsable=[""];
    		    !!req.body.conexiones? conexiones=req.body.conexiones.split(",") : conexiones=[""];
    		    !!req.body.id? id=req.body.id : id="";
		    !!req.body.link? link=req.body.link : link="";

		    const objins = {
			"tipo" : tipo,
			"nombre" : nombre,
			"responsable" : responsable, 
			"id" : id,
			"conexiones" : conexiones,
			"link" : link
		    };

		    const objsearch = {_id:new mongodb.ObjectID(_id)};

		    dbo.collection("d_process").find(objsearch).toArray(function(err, result) {
			if (err) throw err;

			//get last id inserted
			let objr = result[0];

			//iterate.push(objins);
			objr.etapas.splice(id,0,objins);

			fn.c(objr.etapas);
			//actualizar el id de aqui en adelante
			fn.c(id + ':'+objr.etapas.length);
			
			for(let i = id;i < objr.etapas.length;i++){
			    objr.etapas[i].id = i;
			}
			
			fn.c(objr);
			
			const updt = { $set: {"etapas" : objr.etapas } };
			dbo.collection("d_process").updateOne(objsearch, updt);

			res.send('{"updated":"true"}');
			db.close();
			
		    });
		});
	    }else{
		res.redirect('/ilogin.html?v=false&u=invalid');
	    }
	}catch(er){
            fn.c(er)
	}
    }catch(Error){
	fn.c(Error);
	res.send('{"e":"1"}');
    }	    
});

app.post('/remitem', function(req, res){
    const pathname = url.parse(req.url).pathname;
    
    try{
	try{
	    let orgid = req.session.up.orgid
	    
            //esta logueado sino enviar al login
            if(orgid>0){

		fn.v(req.session, res);

		let uhost = properties.get('udatabase.host');
		let uport = properties.get('udatabase.port');
		let udatabase = req.session.up.udatabase;
		let urlm = `${uhost}${uport}`;

		mongoclient.connect(urlm,{useUnifiedTopology: true}, function(err, db) {

		    if (err) throw err;
		    const dbo = db.db(udatabase);
		    let idproc;
		    let id;
		    
		    !!req.body._id? _id=req.body._id : _id="";
    		    !!req.body.id? id=req.body.id : id="";

		    const objsearch = {_id:new mongodb.ObjectID(_id)};
		    
		    dbo.collection("d_process").find(objsearch).toArray(function(err, result) {
			if (err) throw err;

			fn.c('backend1');
			fn.c(result[0]);
			//get last id inserted
			let objr = result[0];

			//iterate.push(objins);
			objr.etapas.splice(id,1);

			fn.c(objr.etapas);
			//actualizar el id de aqui en adelante
			fn.c(id + ':'+objr.etapas.length);
			
			for(let i = id;i < objr.etapas.length;i++){
			    objr.etapas[i].id = i;
			}
			
			//var criteria = {idproceso:idproceso};
			const updt = { $set: {"etapas" : objr.etapas } };
			dbo.collection("d_process").updateOne(objsearch, updt);

			res.send('{"updated":"true"}');
			db.close();
		    });
		});
	    }else{
		res.redirect('/ilogin.html?v=false&u=invalid');
	    }
	}catch(er){
            fn.c(er)
	}	
    }catch(Error){
	fn.c(Error);
	res.send('{"e":"1"}');
    }  
});

//Loadform request
app.post('/loadform', function(req, res){
    const pathname = url.parse(req.url).pathname;
    
    try{
	try{
	    let orgid = req.session.up.orgid
	    
            //esta logueado sino enviar al login
            if(orgid>0){

		fn.v(req.session, res);

		let uhost = properties.get('udatabase.host');
		let uport = properties.get('udatabase.port');
		let udatabase = req.session.up.udatabase;
		let urlm = `${uhost}${uport}`;

		mongoclient.connect(urlm, {useUnifiedTopology: true}, function(err, db) {

		    if (err) throw err;
		    
		    const dbo = db.db(udatabase);
		    let idform;
		    let langf;
		    
		    !!req.body.id? idform=req.body.id:idform="";
		    
		    fn.c('idform:'+idform);

		    dbo.collection("s_form").find({id:idform}).toArray(function(err, result) {
			if (err) throw err;
			res.send(result);
			db.close();
		    });
		});
	    }else{
	       res.redirect('/ilogin.html?v=false&u=invalid');
	   }
	}catch(er){
            fn.c(er)
	}	
    }catch(Error){
	fn.c(Error);
	res.send('{"e":"1"}');
    }	    
});

//Loadmenu request
app.post('/loadmenu', function(req, res){
    const pathname = url.parse(req.url).pathname;
    fn.c(`post:${pathname}`);
    
    try{
	
	try{
	    let orgid = req.session.up.orgid
	    
            //esta logueado sino enviar al login
            if(orgid>0){

		fn.v(req.session, res);

		const uhost = properties.get('udatabase.host');
		const uport = properties.get('udatabase.port');
		const udatabase = req.session.up.udatabase;
		const urlm = `${uhost}${uport}`;
		
		const panelid = req.body.panelid;
		const langs = req.body.lang;

		fn.c("langs:"+langs)
		fn.c('urlm:'+urlm)
		fn.c("panelid:"+panelid)

		
		fn.c(`variable urlm ${urlm} database ${udatabase}`)
		
		mongoclient.connect(urlm, {useUnifiedTopology: true}, function(err, db) {
		    if (err) throw err;

		    const dbo = db.db(udatabase);
		    dbo.collection("s_menu").find({name:panelid, lang:langs}).sort({"order":1}).toArray(function(err, result) {

			if (err) throw er;
			res.send(result);
			db.close();
		    });
		});
	    }else{
		res.redirect('/ilogin.html?v=false&u=invalid');
	    }
	}catch(er){
            fn.c(er)
	}
    }catch(Error){
	fn.c(Error);
	res.send('{"e":"1"}');
    }	    
});

//Exit request
app.post('/exit', function(req, res){
    const pathname = url.parse(req.url).pathname;
    fn.cl();
    fn.c(`post:${pathname}...`);
    
    try{

	try{
	    let orgid = req.session.up.orgid
	    
            //esta logueado sino enviar al login
            if(orgid>0){

		let uhost = properties.get('udatabase.host');
		let uport = properties.get('udatabase.port');
		let orgid = req.session.up.orgid;
		let urlm = `${uhost}${uport}`;
		
		//send the update sentence to db to set minus one user to customer
		const q = `select maxuser, nuser from public.s_system where id='${orgid}'`;

		db.query(q, function(r){

		    fn.c(r.rows)
		    
		    let mu = r.rows[0].maxuser;
		    let cu = r.rows[0].nuser;
		    let nu = cu - 1;
		    
		    if (cu <= mu){
			const q = `update public.s_system set nuser='${nu}' where id='${orgid}'`
			db.query(q, function(r){

			    req.session.destroy(function(err){

				fn.c('sesion finalizada correctamente...');

				numUser--;
				
				orgid = 0;
				isloguser = false;

				res.send(r);
			    })
			})
		    }else{
			fn.c('entra al else y no libera la licencia');
		    }
		})
	    }else{
		res.redirect('/ilogin.html?v=false&u=invalid');
	    }
	}catch(er){
            fn.c(er)
	}
    }catch(Error){
	res.send('{"e":"2"}');
	fn.c(Error);
    }
});

//add new process to mongodb
app.post('/addrecordmongo', function(req, res){
    const pathname = url.parse(req.url).pathname;

    try{
	try{
	    let orgid = req.session.up.orgid
	    
            //esta logueado sino enviar al login
            if(orgid>0){

		fn.v(req.session, res);

		let uhost = properties.get('udatabase.host');
		let uport = properties.get('udatabase.port');
		let udatabase = req.session.up.udatabase;
		let urlm = `${uhost}${uport}`;

		mongoclient.connect(urlm, {useUnifiedTopology: true}, function(err, db) {

		    if (err) throw err;
		    const dbo = db.db(udatabase);
		    let idrec;
		    let langf;
		    
		    !!req.body.collection? collection=req.body.collection:collection="";
    		    !!req.body.jsonstring? jsonstring=req.body.jsonstring:jsonstring="";

		    const jsonInsert = JSON.parse(jsonstring);

		    if (jsonInsert && collection){

			fn.c("inserting a new record: "+ jsonstring);
			//insert new record
			try{
			    dbo.collection(collection).insertOne(jsonInsert, (err, result) => {
				if (err){
				    res.send({
					'error':'AN error has ocurred'
				    });
				    
				}else{
				    res.send(result.ops[0]);
				}
			    });
			}catch(e){
			    fn.c(e);
			}
			
			//update e22xisting record	
		    }else{
			const jsonUpdate ={_id:new mongodb.ObjectID(idrec)}
			fn.c("Entra a actualizar registro");

			try{
			    //remove _id property in order to update based on the body sentence
			    delete jsonInsert._id;
			    //add _id value

			    fn.c("jsonUpdate");
			    fn.c(jsonUpdate);
			    
			    fn.c("jsonInsert");
			    fn.c(jsonInsert);
			    
			    dbo.collection(collection).updateOne(jsonUpdate, {$set: jsonInsert});
			    
			}catch(e){
			    fn.c(e);
			}
		    }
		});
	    }else{
		res.redirect('/ilogin.html?v=false&u=invalid');
	    }
	}catch(er){
            fn.c(er)
	}
    }catch(Error){
	fn.c(Error);
	res.send('{"e":"1"}');
    }	    
});

//Saveform request
app.post('/saveform', function(req, res){
    const pathname = url.parse(req.url).pathname;
    
    try{
	try{
	    let orgid = req.session.up.orgid
	    
            //esta logueado sino enviar al login
            if(orgid>0){
		
		fn.v(req.session, res);

		let uhost = properties.get('udatabase.host');
		let uport = properties.get('udatabase.port');
		let udatabase = req.session.up.udatabase;
		let urlm = `${uhost}${uport}`;

		mongoclient.connect(urlm, {useNewUrlParser:true}, function(err, db) {

		    if (err) throw err;
		    const dbo = db.db(udatabase);
		    let idrec;

		    !!req.body._id? idrec=req.body._id:idrec="";
		    !!req.body.collection? collection=req.body.collection:collection="";
    		    !!req.body.jsonString? jsonString=decodeURIComponent(req.body.jsonString):jsonString="";
		    
		    let jsonInsert="";
		    
		    try{
			fn.c('jsonString app.js:2377');
			fn.c(jsonString);
			fn.c(`idrec:${idrec}`)
			
			jsonInsert = JSON.parse(jsonString);
			
		    }catch(e){
			fn.c('se causa un error al ejecutar parse del jsonString app.js:2364 ${e}----------------------------------')
			fn.c(e);
		    }

		    if (idrec===""){
			fn.c("Entra a nuevo registro");
			
			//insert new record
			try{
			    dbo.collection(collection).find(jsonInsert).toArray(function(err, result) {
				if (err) throw err;

				fn.c('result busqueda previa a ingreso')
				fn.c(result);

				//existe un duplicado del registro que se pretende ingresar
				if(result.length > 0){
				    res.send('{"e":"3", "m":"the record you are trying to insert already exists, please edit the fields"}');
				}else{
				    dbo.collection(collection).insertOne(jsonInsert, (err, result) => {
					if (err){
					    res.send({
						'error':`'an error has ocurred ${err}'`
					    });
					}else{
					    res.send(result.ops[0]);
					}
				    });
				}
			    });		    
			}catch(e){
			    fn.c(e);
			}

		    }else{
			fn.c("Entra a actualizar registro");
			
			try{
			    //update existing record	
			    const jsonUpdate ={_id:new mongodb.ObjectID(idrec)}
			    //remove _id property in order to update based on the body sentence
			    delete jsonInsert._id;
			    //add _id value

			    fn.c("jsonUpdate");
			    fn.c(jsonUpdate);
			    
			    fn.c("jsonInsert");
			    fn.c(jsonInsert);
			    
			    let r = dbo.collection(collection).updateOne(jsonUpdate, {$set: jsonInsert});

			    res.send(r);
			    
			}catch(e){
			    fn.c(e);
			}
		    }
		});
	    }else{
		res.send('{"e":"1", "m":"the session has been invalidated or finish please login again"}');
	    }
	}catch(er){
            fn.c(er)
	}
    }catch(Error){
	fn.c(Error);
	res.send('{"e":"1"}');
    }	    
});

//response translation with dbname translation customized file
app.get('/translations/translation.js', function(req, res){

    try{
	fn.c('entra a cargar translations')
	
	const pathname = url.parse(req.url).pathname;
	fn.c('post method:'+pathname);
	let orgid = req.session.up.orgid
	
        //esta logueado sino enviar al login
        if(orgid>0){
	    let dbname = req.session.up.udatabase
	    fn.c(`entra a orgid mayor que cero para translations...${dbname}`)
	    res.sendFile(__dirname + `/translations/${dbname}.js`);
	}
    }catch(er){
	res.sendFile(__dirname + '/translations/minghos.js');
	fn.c(er)
    }
});

app.use('/js', express.static(__dirname + '/js'));

app.use('/socket.io.js', express.static(__dirname + '/socket.io.js'));

app.use('/css', express.static(__dirname + '/css'));

//app.use('/translations', express.static(__dirname + '/translations'));

app.use('/jasmine', express.static(__dirname + '/jasmine'));

app.use('/images', express.static(__dirname + '/images'));

app.use('/pdf', express.static(__dirname + '/pdf'));

app.get('/indexc.html', function(req, res){
    const pathname = url.parse(req.url).pathname;
    fn.c('post method:'+pathname);
    res.sendFile(__dirname + '/indexc.html');
});

app.get('/ilogin.html', function(req, res){
    const pathname = url.parse(req.url).pathname;
    fn.c('post method:'+pathname);
    res.sendFile(__dirname + '/ilogin.html');
});

app.get('/recover.html', function(req, res){
    const pathname = url.parse(req.url).pathname;
    fn.c('post method:'+pathname);
    res.sendFile(__dirname + '/recover.html');
});

app.get('/development.html', function(req, res){
    const pathname = url.parse(req.url).pathname;
    fn.c('post method:'+pathname);
    res.sendFile(__dirname + '/development.html');
});

app.get('*', function(req, res){
    const pathname = url.parse(req.url).pathname;
    fn.c('post method:'+pathname);
    res.sendFile(__dirname + '/index.html');
});

//Favicon request
app.get('favicon.ico', function(req, res){
    res.sendFile(__dirname + '/images/favicon.ico');
});

app.listen(port, function(){
    fn.c(`${nameApp} listening on port: ${port}`);
})
