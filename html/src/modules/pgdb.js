/**
 *module to connect postgres using a pool
 *function parameters:
 *res:response object
 *collname: mongodb collection name
 */
const path = require('path');                                                                       const pathObj = path.parse(__filename);

const { Pool, Client } = require('pg')
const fn = require('../modules/functions.js')

fn.lM(pathObj)

let pathproperties =  __dirname + '/../conf/conf.properties'
let properties = fn.loadProperties(pathproperties)


let rdbms = properties.get('database.provider')
let host = properties.get('database.host')
let port = properties.get('database.port')
let database = properties.get('database.database')
let userdef = properties.get('database.user')
let passwordef = properties.get('database.password')
let idletimeoutmilis = properties.get('database.idletimeout')
let conntimeoutmilis = properties.get('database.conntimeout')
let max = properties.get('database.max')

let pool;

function init(user, passw){
    try{
	pool = new Pool({
	    host: host,
	    port: port,
	    user: user,
	    password: passw,
	    database:database,
	    //connectionString: DATABASE_URL,
	    ssl: false,
	    max: max,//20,
	    idleTimeoutMillis: idletimeoutmilis,//30000,
	    connectionTimeoutMillis: conntimeoutmilis,//2000
	});

	if(pool){
	    return true
	}else{
	    return false
	}
	
	fn.c(pool);
	
    }catch(e){
	fn.c(e)
    }
}

exports.init = init;

function initDefault(){
    let conCreated = false
    
    try{
	
	pool = new Pool({
	    host: host,
	    port: port,
	    user: userdef,
	    password: passwordef,
	    database:database,
	    ssl: false,
	    max: 20,
	    idleTimeoutMillis: 30000,
	    connectionTimeoutMillis: 2000
	});
	
	if (pool){
	    conCreated=true
	}
    }catch(e){
	fn.c(e)
    }
    
    return conCreated
}

exports.initDefault = initDefault;

exports.queryl = function(querystr, callback, callback1 = () => fn.c('segunda funcion opcional archivo pgdb.js linea 89')){
    
    pool.query(querystr, (err, reslt) => {
	try{
	    if(err){
		//fn.c(err)
		callback1()
	    }else{
		//console.log(err, reslt)
		callback(reslt)
	    }
	}catch(e){
	    callback1()
	    fn.c(e)
	}finally{
	    //pasar el cierre del pool para cuando se termine la sesion
	    //() => pool.end()
	}
    });
}

exports.close=function(){
    try{
	pool.end();
    }catch(e){
	fn.c(e)
    }
}

exports.query = function(querystr, callback, callback1 = () => fn.c('segunda funcion opcional archivo pgdb.js linea 118')){
    
    fn.c(querystr);
    
    pool.query(querystr, (err, reslt) => {
	try{
	    if(err){
		fn.c(err)
		callback1(querystr+' '+err)
	    }else{
		//console.log(err, reslt)
		callback(reslt)
	    }
	}catch(e){
	    callback1(e)
	    fn.c(e)
	}finally{
	    () => pool.end()
	}
    });
}
