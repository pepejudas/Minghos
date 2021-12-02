/****************************************
 *module to create a web page loading from mongodb s_form collection
 */
const path = require('path');
var pathObj = path.parse(__filename);
const fn = require('./functions.js');

var MongoClient
var udatabase
var uhost
var uport

fn.lM(pathObj)

function setParams(mc, db, h, p){
    MongoClient=mc
    udatabase=db
    uhost=h
    uport=p
}

function createWebPage(res, formname, lang){
    try{

	let urlm = `mongodb://${uhost}:${uport}/`;

	fn.c(`creating web page... connecting to mongodb ${urlm}`)
	
	MongoClient.connect(urlm,  {useNuewUrlParser:true}, function(err, db) {

	    fn.c('entra a coneccion de base de datos')
	    
	    if (err) throw err;
	    var dbo = db.db(udatabase);
	    dbo.collection("s_form").find({name:formname}).sort({"order":1}).toArray(function(err, result) {
		fn.c('entra a la busqueda de registro form')

		if (err) throw err;

		fn.c(result[0])

		//html tag and title
		var htmlPage = "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Strict//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd\"><html><link rel=\"icon\" href=\"images/favicon.ico\"><title>"+result[0].title+"</title>"
		//defining the lang variable to load all page
		htmlPage += `<script>var dL = '${lang}'</script>`;
		
		//script up iteration
		var scriptlen = result[0].script_up.length

		for(i=0;i<scriptlen;i++){
		    htmlPage += "<script src='"+result[0].script_up[i].s+"'></script>";
		}
		var cssl = result[0].css.length;
		//css
		for(i=0;i<cssl;i++){
		    htmlPage += "<link href='"+result[0].css[i]+"' rel='stylesheet'/>";
		}

		//sidebar
		if (result[0].sidebar){
		    htmlPage += result[0].sidebar
		}

		//right sidebar
		if (result[0].rsidebar){
		    htmlPage += result[0].rsidebar
		}

		//html body
		htmlPage += result[0].body
		
		var scrlen = result[0].script_do.length;
		//script down iteration
		for(i=0;i<scrlen;i++){
		    htmlPage += "<script src='"+result[0].script_do[i].s+"'></script>";
		}

		htmlPage += "</html>";

		fn.c(htmlPage);
		
		res.send(htmlPage);
		db.close();
	    });
	});
	
    }catch(Error){
	fn.c(Error);
    }
}

exports.createWebPage=createWebPage
exports.setParams=setParams
