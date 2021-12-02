/** Minghos frontend framework
    @author: Neoblaster

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

*/
//language set on html
//variable to set languaje en=english, es:spanish, fr:french, pr:portuguese, default:es
//var dL = 'es';

const f = {
    //framework Version
    version:'0.0.1',
    //default languaje en=english, es:spanish, fr:french, pr:portuguese
    //dL:'es',
    //debug mode for print errors on console
    debugMode:true,
    //store form Fields array
    fA:new Array(),
    //store type deploy
    tD:'',
    //array to store documentation from functions
    docF:new Array(),
    /**
       @name: genJSDoc
       @description: funcion para generar el JSDoc analizando el texto encima de las funciones con una tecnica parecida a la utilizada en la traduccion de la aplicacion, falta terminar la funcion y hacer el parsing de los parametros para identificar cada uno, tambien de generar el html con el formato final definido, por ahora genera la informacion dentro de los comentarios como por ejemplo los de esta funcion y las etiquetas de tipo @description, @param, @return, la tarea de generar un documento de tipo html queda posteriormente utilizando esta funcion como base
       @return: none
    **/
    genJSDoc:function(func='none'){
	var arrayComFunc = new Array();
	
	f.readTextFile("js/frameworkm.js", function(texto){

	    let regexp1 = /\/\*\*/g;
	    let regexp2 = /\*\*\//g;

	    var array1 = [...texto.matchAll(regexp1)];
            var array2 =  [...texto.matchAll(regexp2)];
	    
	    var i=0;
            var maxItera = array1.length;
            var numf = 0;
	    
            for(i=0;i<maxItera;i++){
		
		try{
                    var pal = texto.substring(array1[i].index+3,array2[i].index);
                    try{
			if(func =='none'){
			    numf++;
			    arrayComFunc[i]=pal;
			    f.c(arrayComFunc[i]);
			}else if(pal.includes('@name: '+func)){
			    numf++;
			    f.c(pal);
			}
                    }catch(e){
                        if(i==0){
                            f.c(f.lE('Error parsing function:' + pal));
			}
                    }
		}catch(e){
		    f.c(e);
		}
	    }
	    f.c('Total number of functions parsed:'+numf);
	});
    },
    /**
       @name: readTextFile
       @description: funcion para consultar el documento
       @param: file, archivo a consultar
       @param: callback, funcion que llama al final
       @return: none
    **/
    readTextFile:function(file, callback) {
	var rawFile = new XMLHttpRequest();
	rawFile.overrideMimeType("application/json");
	rawFile.open("GET", file, true);
	rawFile.onreadystatechange = function() {
            if (rawFile.readyState === 4 && rawFile.status == "200") {
		callback(rawFile.responseText);
            }
	}
	rawFile.send(null);
    },
    /**
       @name: lT
       @description: function to load translations from arrays depends on selected languaje
       @param: key, used to load the translation, could be could be es=spanish, en=english, fr=french, pr=portuguese
       @return: transl with value translated to default languaje
     **/
    lT:function(key){
	var transl = "";

	try{
	    var tvalue = JSON.parse("lang_"+dL+"."+key);
	    transl = tvalue;
	}catch(Error){
	    f.c('translation not found set as key:'+ key);
	    transl = key;
	}
	//console.log(tvalue);
	return transl;	
    },
    /**
       @name: lT
       @description: loadTranslation from errorArray itemized by letter by javsacript constraint
       @param: key, used to load the translation, could be could be es=spanish, en=english, fr=french, pr=portuguese
       @return: transl with value translated to default languaje
     **/
    lE:function(key){

	var transl = "";

	try{
	    var tvalue = JSON.parse("lang_err_"+dL+"."+key);
	    transl = tvalue;
	}catch(Error){
	    f.c('translation not found set as key:'+ key);
	    transl = key;
	}
	//console.log(tvalue);
	return transl;
    },
    /**
       @name: iSML
       @description: Load JS Script dinamically
       @param: url, used to  select the js script
       @return: none, but load the script directly on the html document
     **/
    iMSL:function(url){
	f.c('trying to loading...'+url)
	var isL = false
	var scripts = f.gt('script');
	for (var i = scripts.length; i--;) {
	    let s = scripts[i].src
	    let sar = s.split(url)
	    let lensar = sar.length
	    
	    if (lensar > 1){
		isL = true
		break;
	    }
	}
	
	if(isL){
	    f.c('script: '+url+' Already Loaded')
	}else{
	    f.c('script: '+url+' Need to be loaded')
	}
	
	return isL;
    },
    /**
       @name:p
       @description:
     */
    p:function(str) {
	return Function(`'use strict'; return (${str})`)()
    },
    sOL:function(arrayFn){
	for(var i=0;i<arrayFn.length;i++){
		try{
		    try{
			var fnstring = arrayFn[i]
			f.p(fnstring)
		    }catch(e){
			f.c(e)
		    }
		}catch(e){
		    f.c(e)
		}
	}
    },
    lIniM:function(inits){
	try{
	    let l = inits.length
	    for(var i =0;i<l;i++){
		try{
		    f.p(inits[i])
		}catch(e){
		    f.c(e)
		}
	    }
	}catch(e){
	    f.c(e)
	}
    },
    /**
       @description: send notification manually
    */
    notF:function(id){
	
	let sendjson = `{"oper":"notify", id":"${id}"`;
	
	    f.c('jsonString print after esc');
	    f.c(jsonString);

	    f.r({url:'notify', params:sendjson})
		.then(r => {
		    try{
			
			var p = JSON.parse(r.target.responseText)
			var htmladd = "";
			var data = p.data[0];

			f.c('entra a data de response');
			f.c(p);

			//if response in not null
			if (!!data){
			    //hay un error de la base de datos

			    /*
			      if(data.e==1){
			      f.c(data.m);
			      }else{
			      if (!f.lFa){
			      var html = f.lF(p.data[0]);
			      f.lFa = true;
			      }
			      }
			    */
			}
		    }catch(e){
			f.c(e)
		    }
		}).catch(e=>{
		    f.c('entra al catch del save form');
		    f.c(e)
		})
    },
    /**
       @description: function to update field
    */
    upF:function(id, coll, field, value){
	let jsonString = `{\"${field}\":\"${value}\"}`

	jsonString=encodeURIComponent(jsonString);
	
	let sendjson = `{"id":"${id}","collection":"d_meet","jsonString":"${jsonString}"}`;
	
	    f.c('jsonString print after esc');
	    f.c(jsonString);

	    f.r({url:'saveform', params:sendjson})
		.then(r => {
		    try{
			
			var p = JSON.parse(r.target.responseText)
			var htmladd = "";
			var data = p.data[0];

			f.c('entra a data de response');
			f.c(p);

			//if response in not null
			if (!!data){
			    //hay un error de la base de datos

			    /*
			      if(data.e==1){
			      f.c(data.m);
			      }else{
			      if (!f.lFa){
			      var html = f.lF(p.data[0]);
			      f.lFa = true;
			      }
			      }
			    */
			}
		    }catch(e){
			f.c(e)
		    }
		}).catch(e=>{
		    f.c('entra al catch del save form');
		    f.c(e)
		})
    },
    /**
	  @name: sv 
	  @description: search in form dinamically
	  @param: collprinc used to set the collection to search
	  @param: txts used to set the text to search
	  @param: criterial used to set the field to search the text
	  @return: none, but load the script directly on the html document
     **/
    sv:function(formid){

	var xform = f.g(formid);
	var inputElements = xform.querySelectorAll("input, select, checkbox, textarea")
	var idrec;

	//validate form using type-val property
	if (f.v(inputElements)){
	    
	    try{
		idrec =f.g("_id").value;
	    }catch(Error){
		f.c(Error);
	    }

	    //f.c(inputElements);
	    jsonString = ""

	    var numel = inputElements.length;
	    var opentag = false;
	    
	    for(i=0;i<numel;i++){   

		//handle when the id property has null value when is new record.
		f.c('campo:'+inputElements[i].name);
		var campo = inputElements[i].name;
		
		if (campo == "_id" || campo == "" || campo == "first" || campo == "previous" || campo == "next" || campo == "last" || campo == "save" || campo == "textsearch" || campo == "search"){
		    continue;
		}else{
		    if(inputElements[i].type=="checkbox"){
			if(inputElements[i].checked){
			    jsonStringV = "\""+inputElements[i].name+"\":\"1\"";
			}else{
			    jsonStringV = "\""+inputElements[i].name+"\":\"\"";
			}
		    }else{
			jsonStringV = "\""+inputElements[i].name+"\":\""+inputElements[i].value+"\"";
		    }
		}

		f.c(inputElements[i]);
		
		if (!opentag){
		    jsonString = "{"+jsonStringV+",";
		    opentag=true;
		}else if(i+1 == inputElements.length){
		    jsonString += jsonStringV+"}"
		}else{
		    jsonString += jsonStringV + ","
		}

		f.c('jsonString print');
		f.c(jsonString);

	    }

	    jsonString=encodeURIComponent(jsonString);

	    let sendjson = `{"_id":"${idrec}","collection":"${collPrinc}","jsonString":"${jsonString}"}`;
	    //let sendjson = "++++";//{id:\"+\"}";

	    f.c('jsonString print after esc');
	    f.c(jsonString);

	    f.r({url:'saveform', params:sendjson})
		.then(r => {
		    try{
			
			var p = JSON.parse(r.target.responseText)
			var htmladd = "";
			var data = p.data[0];

			f.c('entra a data de response');
			f.c(p);
			
			//if response in not null
			if (!!data){
			    //hay un error de la base de datos
			    
			    if(data.e==1){
				f.c(data.m);
			    }else{
				if (!f.lFa){
				    var html = f.lF(p.data[0]);
				    f.lFa = true;
				}
			    }
			}
		    }catch(e){
			f.c(e)
		    }
		}).catch(e=>{
		    f.c('entra al catch del save form');
		    f.c(e)
		})
	}
    },
    /**
       @name: actU
       @description: function to activate user, request to backend to activate user
     */
    actU:function(id, user, password, email, lang, type, okcallback){

	let jsonString = `{\"id\":\"${id}\",\"user\":\"${user}\",\"password\":\"${password}\",\"email\":\"${email}\",\"type\":\"${type}\",\"lang\":\"${lang}\"}`

	jsonString=encodeURIComponent(jsonString);
	
	let sendjson = `{"oper":"activate","jsonString":"${jsonString}"}`;
	
	f.r({url:'adminusers', params:sendjson})
	    .then(r => {
		try{
		    
		    f.c('responsetext');
		    f.c(r.target.responseText);
		    
		    var p = JSON.parse(r.target.responseText);

		    f.c(decodeURIComponent(r.target.responseText));

		    if(p.ok==1){
			okcallback()
		    }
		    //funcion para limpiar el formulario actual
		    //f.clF();
		    
		}catch(e){
		    f.c(e)
		}
	    }).catch(e=>{
		f.c(e)
	    })
    },
    sFl:function(textoarchivo, callback){

	jsonString=encodeURIComponent(textoarchivo);
	
	let sendjson = `{"text":"${jsonString}"}`;

	f.r({url:'savetransfile', params:sendjson})
	    .then(r => {
		try{
		    
		    f.c('responsetext');
		    f.c(r.target.responseText);
		    
		    var p = JSON.parse(r.target.responseText);

		    if(p.ok==1){
			callback()
		    }
		}catch(er){
		    f.c(er)
		}
	    });
    },
    /**
       @name: iArr
       @description: function to iterate array and set as string
       @param: array
       @return: array as json string
     **/
    iArr:function(array){
	let jsonstring = JSON.stringify(array)
	return jsonstring;
    },
    /**
	  @name: s 
	  @description: search in form dinamically
	  @param: collprinc used to set the collection to search
	  @param: txts used to set the text to search
	  @return: none, but load the script directly on the html document
    **/
    s:function(collPrinc, txts, crit){
	f.r({url:'ftsearch', params:`{"table":"${collPrinc}", "value":"${txts}", "criterial":"${crit}"}`})
	    .then(r => {
		try{
		    
		    f.c('responsetext');
		    f.c(r.target.responseText);
		    
		    var p = JSON.parse(r.target.responseText);

		    f.c('responsetextdecoded');
		    f.c(decodeURIComponent(r.target.responseText));
		    
		    f.clF();
		    
		    //iterate form components to var htmladd;
		    var htmladd = "";
		    dataArray = p;
		    lenghtArray = dataArray.length
		    currentRecord = 0;		
		    //var data = dataArray[currentRecord];
		    f.lD(dataArray[currentRecord]);
		    //funcion para mostrar el numero de registro en pantalla
		    f.lRN(1, lenghtArray, 'recounter');
		    
		}catch(e){
		    f.c(e)
		}
	    }).catch(e=>{
		f.c(e)
	    })
    },
    /**
       @name: dLS
       @description: function to create js scripts dinamically, loading the code and excecuting the initialization method if required
       @param: scr json object with s and i property 
       @return: none
    **/
    dLS:function(scr) {
	let url = scr.s

	let inits = []
	let l = 0
	
	try{
	    inits=scr.i
	    if(inits){
		l=inits.length
	    }
	}catch(e){
	    f.c(e)
	}
	
	if(!f.iMSL(url)){
	    var script = document.createElement("script"); //Make a script DOM node
	    script.src = url; //Set it's src to the provided URL
	    /*script.type = 'text/javascript';*/
	    document.head.appendChild(script); //Add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)
	    
	    if(l>0){
		script.onload=function(){
		    //call to initialize method if required
		    f.lIniM(inits)
		}
	    }
	}else{
	    f.c('entra a inicializar funcion')
	    if(l>0){
		f.lIniM(inits)
	    }
	}
    },
    rdctl:function(){
	window.location.replace("index.html");
    },
    //function to exit the system and release the user licence
    exit:function(){
	f.r({"url":"exit"})
	    .then(r => {
		try{
		    var data = JSON.parse(r.target.responseText)
		    if(data.rowCount > 0){
		    	f.rdctl()
		    }
		}catch(e){
		    f.c(e)
		}
	    }).catch(e => {
		f.c(e)
	    })
    },
    //function to create script dinamically
    j:function(callback, params, url) {
	  f.r({"url":url, "params":params})
	    .then(r => {
		try{
		    var data = JSON.parse(r.target.responseText)
		    if(data){
			callback(data)
		    }
		}catch(e){
		    f.c(e)
		}
	    }).catch(e => {
		f.c(e)
	    })
    },
    classIterator:0,
    gridM:function(rows, cols, idcontainer){
	f.classIterator++;

	let classname = `grid_class_${f.classIterator}`

	f.g(idcontainer).className = classname
	let autocss = ""
	
	for(var i=0;i<cols;i++){
	    autocss+="auto "
	}
	
	document.styleSheets[0].insertRule(`#${classname}{display:grid;grid-template-columns:${autocss};}`, 0)
	
	for(var j=0;j<rows;j++){
	    f.g(idcontainer).innerHTML += "<div class='grid-item'>${j}</div>"
	}
	
    },
    /**
       @name: rTran
       @description: function to return an array of pairs i:number of character begins property, fn:number of character ends property
       @param: texto, should contain all text
    **/
    rTran:function(texto){
	try{
	    //get default languaje translation array
	    var obj = 'lang_'+dL;

	    let regexp1 = /{{/g;
	    let regexp2 = /}}/g;
	    
	    var array1 = [...texto.matchAll(regexp1)];
	    var array2 =  [...texto.matchAll(regexp2)];

	    var i=0;
	    var maxItera = array1.length;
	    
	    for(i=0;i<maxItera;i++){

		if(i==0){
		    try{
			var pal = texto.substring(array1[i].index+2,array2[i].index);
			
			try{
			    var valprop = f.p('lang_'+dL+'.'+pal);
			}catch(e){
			    if(i==0){
				f.c(f.lE('Error loading translation:' + pal));
			    }
			}
			
			texto = texto.replace('{{'+pal+'}}',valprop);
		    }catch(e){
			f.c(f.lE('d'));
		    }	
		}else{
		    texto = f.rTran(texto);    
		}
	    }
	}catch(e){
	    f.c(e);
	}finally{
	    return texto;
	}
    },
    /**
       @name: cTP
       @description: function to return an array of pairs i:number of character begins property, fn:number of character ends propertyfunction to iterate over json object in string format to convert to text to add to url post request
       @param: o, should be a json object string
    **/
    cTP:function(o){
	f.c(`cTP ${o}`)
	
	var text = ""
	try{
	    
	    let obj = JSON.parse(o)
	    if (obj){
		const k = Object.keys(obj)
		const v = Object.values(obj)
		
		let l = k.length
		let it = 0
		let s;
		
		for(let i = 0;i<l;i++){
		    i+1==l? s="":s="&"
		    text+=k[i]+'='+v[i]+s
		}
	    }
	}catch(e){
	    f.c(e)
	}finally{
	    return text
	}
    },
    sS:function(str){
	let st = str.replace(/[\""]/g, '\\"')
	return st
    },
    //ajax request: o = {url, params, exparams}
    //multipart parameter is used to send files or binary data but is a feature not tested yet 
    r:function(o, multipart=false, evalresponse=true){
	return new Promise(function(resolve, reject){
	    
	    try{
		var oReq = new XMLHttpRequest();

		oReq.addEventListener("error", function(e){
		    var m = f.lE('k') + ' ' + e.toString()
		    reject(m)
		});

		var e = null
		
		try{
		    if(o.exparams){
			e = o.exparams
		    }
		}catch(e){
		    
		}
		
		oReq.addEventListener("load", function(p){
		    f.c(p)
		    if(evalresponse){
			var data = JSON.parse(p.target.responseText)
			
			if(data.e=="1"){
			    f.exit()
			}else if(data.e=="2"){
			    f.rdctl()
			}else{
			    resolve(p)
			}
		    }else{
			resolve(p)
		    }
		})
		
		//always send as post to avoid send parameters without encode
		oReq.open('POST', o.url);
		
		//send header
		if(multipart){
		    oReq.setRequestHeader('Content-type', 'multipart/form-data; charset=UTF-8');
		}else{
		    oReq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=UTF-8')
		}
		
		oReq.setRequestHeader('X-Powered-By', 'Xsite');
		
		let p1 = null
		
		try{//try to load json object
		    try{
			p1 = JSON.parse(o.params)
			p1 = f.cTP(o.params)
		    }catch(e){
			if(o.params){
			    p1 = o.params
			    f.c('params loaded as string\n'+p1.toString())
			}
		    }
		}catch(e){
		    f.c('params loaded as null\n' + p1)
		}finally{
		    oReq.send(p1);
		}
	    }catch(e){
		reject(e)
	    }
	})
    },
    //function to load menu from mongodb menu collection
    lM:function(panelid){
	f.r({url:'loadmenu', params:`{"panelid":"${panelid}"}`})
	    .then(r => {
		try{
		    var p = JSON.parse(r.target.responseText)
		    if(p){
			var arrayLength = p.length;                                                                
			for (var i = 0; i < arrayLength; i++){
			    var textReplaced = f.rTran(p[i].html);
			    f.g(panelid).innerHTML += textReplaced;
			}
		    }
		}catch(e){
		    f.c(e)
		}
	    }).catch(e => {
		f.c(e)
	    })
    },
    //open tab function
    oT:function(tabName){
	var i;
	var x = document.getElementsByClassName("hidden");
        for (i = 0; i < x.length; i++) {
	    x[i].style.display = "none";
	}
	
	f.g(tabName).style.display = "block";
	f.lF(tabName);
    },
    //function to clear form
    clF:function(){
	
	var items = f.fA.length;
	f.c(items);
	f.c(f.fA);
	
	var i=0;
	
	for (i=0;i<items;i++) {

	    try{
		
		var property = f.fA[i];
		var el = JSON.parse(property);
		var idel = el.id;
		
		f.c('json field:'+property);
		f.c('propiedad:'+idel);
		
		if (idel){
		    if(idel=='foto'){
			var campo = f.g(idel);

			if(campo){
			    f.g(idel).src = 'images/svg/upload.svg';
			    //f.g(idel).height='20';
			}
		    }else{
			var campo = f.g(idel);

			if(campo){
			    f.g(idel).value = '';
			}
		    }
		}
		
	    }catch(E){
		f.c('error clearing value:'+property+":"+E);
	    }	    
	}
    },
    /**
       @name: w
       @description: function to send warning to console
       @param: s, to send the text message to console
     **/
    w:function(s){
	console.warn(s)
    },
    /**
       @name: gjv get json value
       @description: function to get json value from inputelements array
       @return: json with pairs name value
    **/
    gjv:function(inputEl){
	let ie = inputEl.length;
	let cont = 0;
	let jsons = "{"
	
	if(ie > 0){
	    inputEl.forEach(function(item, index){
		let coma = ",";
		if(cont+1==ie){
		    coma=""
		}
		jsons += `"${item.name}":"${item.value}"${coma}`
		cont+=1;
	    });
	    
	    jsons+="}";
	}
	return jsons;
    },
    //Show Data on Form
    sDF:function(data){
	for (var property in data) {
	    if (data.hasOwnProperty(property)) {
		
		let dato = data[property];

		try{
		    if (property != "save" && property != "search" && property != "textsearch" && property!=""){
			if(property=='foto' && !!dato){
			    f.g(property).src = dato;
			}else{
			    if(f.g(property).type === 'checkbox'){
				if(dato==="1"){
				    f.g(property).checked=true
				}else{
				    f.g(property).checked=false
				}
			    }else{
				f.g(property).value = dato;
			    }
			}
		    }else{
			f.g(property).value = '';
		    }
		}catch(Error){
		    f.c(`setting ${property}:${dato}, field was not found in form`);
		}	    
	    }
	}	
    },
    /**
       @name: c
       @description: function to log in console "c" variables
       @param: text or objecto log in console
       @param: istable used for log tables in this case should be true, by default false 
    **/
    c:function(variable, istable=false){
	if (f.debugMode){
	    try{
		if(variable){
		    if(!istable){
			console.log(variable);
		    }else{
			console.table(variable);
		    }
		}
	    }catch(e){
	    }
	}    
    },
    /**
       @name: v
       @description: function to validate form previous to submit and save on nodejs
       @param: should be json object, containing tvar property, for valid data types:
       alpha: alphabetic caracters without spaces
       alphaws: alphanetic caracters with spaces
       alphanum: alphanumeric caracters
       date: date field
       num: numeric caracters
       phone: numeric caracters with +
       password:Test for a strong password with this regex. The password must contain one lowercase letter, one uppercase letter, one number, and be at least 6 characters long.
       url: http://address like
       zip: zipcode validator
    **/
    v:function(inElem){
	var numel = inElem.length;
	//by default all form are validated
	var allValid = true;

	for(i=0;i<numel;i++){
	    var tval;
	    var tname;
	    var tfval;
	    var tfield;
	    var treq;
	    
	    try{
		//attibute number 2 is tval value
		tval = inElem[i].attributes[2].value;
		tname = inElem[i].name;
		tfval = inElem[i].value
		tfield = inElem[i];
		treq = inElem[i].attributes[5].value;
		
	    }catch(e){
		//f.c(e);
	    }
	    switch(tval){
		//alphabetic field	
	    case "alpha":
		if (treq=="true" || tfval.length > 0){
		    var re1 = new RegExp('^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+$');
		    valido = re1.test(tfval)
		    if (!valido)
			allValid=valido;
		    f.iVal(valido, tfield);
		    break;
		}
		// alphabetic with spaces	
	    case "alphaws":
		if (treq=="true" || tfval.length > 0){		
		    var re1 = new RegExp('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$');
		    valido = re1.test(tfval)
		    if (!valido)
			allValid=valido;
		    f.iVal(valido, tfield);
		}
		
		break;
		//alphanumeric field
	    case "alphanum":
		if (treq=="true" || tfval.length > 0){
		    var re1 = new RegExp('^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9]+$');
		    valido = re1.test(tfval)
		    if (!valido)
			allValid=valido;
		    f.iVal(valido, tfield);
		}
		break;
	    case "alphanumws":
		if (treq=="true" || tfval.length > 0){
		    var re1 = new RegExp('^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9 ]+$');
		    valido = re1.test(tfval)
		    if (!valido)
			allValid=valido;
		    f.iVal(valido, tfield);
		}
		break;
	    case "num":
		if (treq=="true" || tfval.length > 0){
		    var re1= new RegExp('^[0-9]+$');
		    valido = re1.test(tfval)
		    if (!valido)
			allValid=valido;
		    f.iVal(valido, tfield);
		}
		break;
	    case "phone":
		if (treq=="true" || tfval.length > 0){
		    var re1= new RegExp('^[+]?[0-9]+$');
		    valido = re1.test(tfval)
		    if (!valido)
			allValid=valido;
		    f.iVal(valido, tfield);
		}
		break;
	    case "email":
		if (treq=="true" || tfval.length > 0){
		    var re1= new RegExp('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$');
		    valido = re1.test(tfval)
		    if (!valido)
			allValid=valido;
		    f.iVal(valido, tfield);
		}
		break;
	    case "date":
		if (treq=="true" || tfval.length > 0){
		    //format yyyy-mm-dd
		    var re1= new RegExp('^(19|20)?[0-9]{2}[- /.](0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])$');
		    valido = re1.test(tfval)
		    if (!valido)
			allValid=valido;
		    f.iVal(valido, tfield);
		}
		break;
	    case "password":
		if (treq=="true" || tfval.length > 0){
		    var re1= new RegExp('(?=^.{6,}$)((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.*');
		    valido = re1.test(tfval)
		    if (!valido)
			allValid=valido;
		    f.iVal(valido, tfield);
		}
		break;
	    case "url":
		if (treq=="true" || tfval.length > 0){
		    var re1= new RegExp('^((http|https|ftp)://)?([[a-zA-Z0-9]\-\.])+(\.)([[a-zA-Z0-9]]){2,4}([[a-zA-Z0-9]/+=%&_\.~?\-]*)$');
		    valido = re1.test(tfval)
		    if (!valido)
			allValid=valido;
		    f.iVal(valido, tfield);
		}
		break;
	    case "zip":
	    	if (treq=="true" || tfval.length > 0){
		    var re1= new RegExp('^[0-9]{5}(?:-[0-9]{4})?$');
		    valido = re1.test(tfval)
		    if (!valido)
			allValid=valido;
		    f.iVal(valido, tfield);
		}
		break;
		//by default not validate field
	    default:
		break;
	    }
	}

	f.c("allValid:"+allValid);
	return allValid;	
    },
    //function to escape quotes
    esc:function(s){
	return s.replace(/"/g, '\\\"');
    },
    //function to validate field and set background color
    iVal:function(valid, field){

	f.c("valor:"+valid+" campo:"+field.name);
	f.c(field)
	
	if (!valid){
	    var idfield = field.id
	    var fieldun= f.g(idfield);
	    fieldun.style.backgroundColor = '#ff0000'
	    f.c(field);
	}else{
	    var idfield = field.id
	    var fieldun = f.g(idfield);
	    fieldun.style.backgroundColor = '#ccc'
	    f.c(field);
	}
	
    },
    //function to store formfields to clean after loading
    sF:function(){
    },
    //function to clean form
    cF:function(){
	f.c('entra a limpiar form_____________________________________'+f.fA.length);
	f.c(f.fA);

	for(i=0;i<f.fA.length;i++){
	    try{
		var campo = f.p(f.fA[i]);
		f.c(campo);
		
		var campom = f.g(campo.id);
		campom.value="";
		
		f.c('limpiado campo:'+campom);
	    }catch(er){
		f.c(er);
	    }
	}
    },
    //function to set the properties records numbers
    //Load Records Numbers
    lRN:function(actualRecord, totalRecords, htmlElement){
	el = f.g(htmlElement);
	el.innerHTML = '<span>'+actualRecord+' de '+totalRecords+'</span>'
    },
    //menu to hide menu option after click pressed
    shHM:function(div){
	f.g(div).style.display='none'
    },
    //function to show submenu when over event is fired
    shSM:function(idel){
	try{
	    var prop = f.g(idel).style.display;

	    if(prop=='inherit'){
		f.g(idel).style.display='none';
	    }else{
		f.g(idel).style.display='inherit';
	    }

	}catch(e){
	}
    },
    rmItem:function(item){
	f.g("billingitems").deleteRow(item);
    },
    //get elements by class
    gc:function(elementid){
	let doc;
	try{
	    doc = document.getElementsByClassName(elementid);
	}catch(e){
	    f.c(e)
	}
	
	return doc
    },
    //function to get element by id
    g:function(elementid){
	let doc;
	try{
	    doc = document.getElementById(elementid)
	}catch(e){
	    f.c(e)
	}
	
	return doc
    },
    //contGrid:0,
    //function to load Grid
    cG:function(div, columns, collectionName, sumContent=false){
	f.c('entra a cargar grids')
	f.r({url:'loadcollection', params:`collection=${collectionName}`})
	    .then(r => {
		try{
		    var data = JSON.parse(r.target.responseText)
		    var datal = data.length
		    var cols = columns.length
		    
		    try{
			f.contGrid++;
			
			let rule = `grid-container`
			//let valrule = "display:grid;grid-template-columns:"
			var coll = columns.length;
			
			htmlgrid=`<div id='grid-container-1'>`
			let cont = 0

			for(let j = cols * -1 ;j < datal; j++){
			    if(j < 0){
				htmlgrid+=`<div class='grid-item-1'>${columns[cont]}</div>`
			    }else{
				htmlgrid+=`<div class='grid-item-1'><input type="text" class="input1" value="${data[j]._id}"></div>`
				htmlgrid+=`<div class='grid-item-1'><input type="text" class="input2" value="${data[j].cantidad}"></div>`
				htmlgrid+=`<div class='grid-item-1'><input type="text" class="input3" value="${data[j].descripcion}"></div>`
				htmlgrid+=`<div class='grid-item-1'><input type="text" class="input4" value="${data[j].referencia}"></div>`
				htmlgrid+=`<div class='grid-item-1'><a href='#edit:"+i+"'><img src='images/svg/edit-interface-sign.svg' width='20px'></a></div>`
			    }
			    
			    cont++
			}

			htmlgrid+="</div>"
			
			if (!sumContent){
			    f.g(div).innerHTML=htmlgrid;
			}else{
			    f.g(div).innerHTML+=htmlgrid;
			}
		    }catch(e){
			f.c(e);
		    }
		}catch(e){
		    f.c(e)
		}
	    }).catch(e=>{
		f.c(e)
	    })
    },
    //function to load workflow
    cW:function(div){
	
    },
    //function to load Form data
    lD:function(data){
	if (!!data){
	    f.sDF(data);
	}
    },
    //open right menu
    closeNav:function(){
	f.g("mySidenav").style.width = "0";
	f.g("main").style.marginLeft= "0";
	document.body.style.backgroundColor = "white";
    },
    //close right menu
    openNav:function(){
	f.g("mySidenav").style.width = "250px";
	f.g("main").style.marginLeft = "250px";
	document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
    },
    //load PDF info container
    sPDF:function(container, sumContent){
	var contentPDF = "<span id='spanpdf'><embed src='pdf/a4.pdf#statusbar=1' type='application/pdf' width='500p' height='750px' /></span>";
	
	if(sumContent){
	    f.g(container).innerHTML += contentPDF;
	}else{
	    f.g(container).innerHTML = contentPDF;
	}
    },
    //loaded form already
    lFa:false,
    //load workflow function
    lWF:function(formdata){
	f.c('entra a lWF')
	//load menu section
	var menuf = formdata.menu;
	var menucontainer = formdata.menu_c;
	var typef = formdata.type;
	var numeroIteraciones = 0;
	
	if (!!menuf){
	    f.g(menucontainer).innerHTML = menuf;
	}

	//load toolbar section
	var toolbarf = formdata.toolbar;
	var toolbarcontainer = formdata.toolbar_c;
	var loadto = formdata.container;

	if (!!toolbarf){
	    f.g(toolbarcontainer).innerHTML = toolbarf;
	}

	try{
	    if (loadto){
		if(formdata.body){
		    var textt = f.rTran(formdata.body);
	    	    f.g(loadto).innerHTML = textt;
		}
	    }
	}catch(e){
	    f.c(e)
	}
	//load scripts dinamically
	f.lScr(formdata)
    },
    //function to get by tag name
    gt:function(tagname){
	return document.getElementsByTagName(tagname)
    },
    /**
       @name: lScr
       @description: function to load script dinamically
       @param: formdata
       @return: none
    **/
    lScr:function(formdata){
	try{
	    
	    var numsu =	formdata.script_up.length;
	    f.c('enttra a numscripts:'+numsu);
	    
	    for(var i=0;i<numsu;i++){
		f.c(formdata.script_up[i]);
		f.dLS(formdata.script_up[i]);
	    }

	    var numsd =	formdata.script_do.length;
	    for(var i=0;i<numsd;i++){
		f.c(formdata.script_do[i]);
		f.dLS(formdata.script_do[i]);
	    }
	}catch(e){
	    f.c(e);
	}
    },
    //function to remove option from select
    addOption:function(optext, optvalue,  sel){

	if (optvalue){
	    //replace translations inside process text
	    optext = f.rTran(optext);
	    //selecting input type select
	    var sel = f.g(sel);
	    // create new option element
	    var opt = document.createElement('option');
	    // create text node to add to option element (opt)
	    opt.appendChild( document.createTextNode(optext) );
	    // set value property of opt
	    opt.value = optvalue; 
	    // add opt to end of select box (sel)
	    sel.appendChild(opt);
	}else{
	    f.c(f.lE('g'));
	}
    },
    /**
       @name: openT, open tab function
       @description: function to open tabs.
       @param: cname,tab name identifier
    **/
    openT:function(cname){
	let i;
	//document.getElementsByClassName("city");
	let x = f.gc('city');
	for (i = 0; i < x.length; i++) {
	    x[i].style.display = "none";  
	}
	
	f.g(cname).style.display = "inline-grid"; 
    },
    /**
       @name: cTab, create tab funcion
       @description: function to create tabs inside form to load fields.
       @param: tabs_title, array to define the title of every tabs to show
    **/
    cTab:function(tabs_title, container){
	let lentabs = tabs_title.length; 
	if (lentabs > 0){
	    let conthtml = ""
	    conthtml +="<div class=\"outer\">";

	    //labels buttons of each tab
	    tabs_title.forEach(function(item,index){
		conthtml += "<div class=\"inner\"><button class=\"w3-bar-item w3-button\" onclick=\"f.openT('" + item + "')\">" + f.rTran(item) + "</button></div>";
	    })

	    conthtml+="</div>";

	    //content of each tab
	    tabs_title.forEach(function(item,index){
		conthtml+= "<div id=\"" + item  + "\" class=\"w3-container city\"><h2>"+f.rTran(item)+"</h2></div>";
	    })

	    f.g(container).innerHTML=conthtml;

	}
    },
    /**
       @name: lF
       @description: LoadForm function to load fields on form.
       @param: left, param to define the side label that shows up right or left
    **/
    lF:function(formdata, side='left'){
	//load menu section
	var menuf = formdata.menu;
	var menucontainer = formdata.menu_c;
	var typef = formdata.type;
	var formcontainer = formdata.container;
	var maincontainer = formdata.main_c;
	var recountercontainer = formdata.recounter_c;
	var rsidecontent = formdata.rsidecontent;
	var numeroIteraciones = 0;

	//load grid section
	var gridbarf = formdata.grid;
	var gridcontainer = formdata.grid_c;
	var rsidepcontainer = formdata.rsidecontainer_c;

	f.c(formdata);
	f.c("tipo de form:"+typef);
	
	try{
	    f.g(maincontainer).innerHTML = '';
	    
	    if (!!menuf){
		var testf = f.g(menucontainer);

		//if container does not exist add it
		if(!testf){
		    f.g(maincontainer).innerHTML += "<span id='"+menucontainer+"'></span> ";
		}
		
		f.g(menucontainer).innerHTML = f.rTran(menuf);
	    }

	    //load toolbar section
	    var toolbarf = formdata.toolbar;
	    var toolbarcontainer = formdata.toolbar_c;

	    if (!!toolbarf){
		var testf = f.g(toolbarcontainer);

		//if container does not exist add it
		if(!testf){
		    f.g(maincontainer).innerHTML += "<span id='"+toolbarcontainer+"'></span> ";
		}

		f.g(toolbarcontainer).innerHTML = f.rTran(toolbarf);
		f.c(toolbarf)
	    }

	    var testf = f.g(recountercontainer);
	    //if container does not exist add it
	    if(!testf){
		f.g(maincontainer).innerHTML += "<span id='"+recountercontainer+"'></span> ";
	    }
	    
	    var testf = f.g(formcontainer);
	    //if container does not exist add it
	    if(!testf){
		f.g(maincontainer).innerHTML += "<span id='"+formcontainer+"'></span> ";
	    }

	    var testf = f.g(gridcontainer);
	    //if container does not exist add it
	    if(!testf){
		f.g(maincontainer).innerHTML += "<span id='"+gridcontainer+"'></span>";
	    }
	    
	    if(gridbarf){
		f.g(gridcontainer).innerHTML += f.rTran(gridbarf);
	    }

	    var rsidepanel = f.g(rsidepcontainer);
	    //if container does not exist add it
	    if(!rsidepanel){
		f.g(maincontainer).innerHTML += "<span id='"+rsidepcontainer+"'></span>";
	    }

	    //agregar el contenido de la barra derecha en caso de existir
	    if(!!rsidecontent){
		f.g(rsidepcontainer).innerHTML += f.rTran(rsidecontent);
	    }
	    
	    //trying to load scripts this functions should verify if all scripts are loaded and initilialized
	    f.lScr(formdata)
	    
	}catch(e){
	    f.c(f.lE('e'));
	}
	rsidepanel
	var html = "";
	var nlen = formdata.fields.length;
	f.fA = formdata.fields;
	
	f.c('entra a almacenar form fields');
	f.c(formdata.fields);
	
	var i;

	//set type deploy
	f.tD=typef;
	
	if (typef=="form" || typef=="tab-form"){
	    f.c("entra a form:"+typef);

	    //if is a tab-form
	    try{
		if(formdata.tabs_title.length>0){
		    f.cTab(formdata.tabs_title, formdata.container); 
		}
	    }catch(e){
		f.c(e)
	    }
		
	    var variables = [];
	    
	    for(i=0;i<nlen;i++){
		f.c('iteracion'+i);

		try{
		    var field = JSON.parse(formdata.fields[i]);
		    var loadto = formdata.container;
		    var testf = f.g(loadto);
		    //if container does not exist add it
		    if(!testf){
			f.g(maincontainer).innerHTML += "<span id='"+loadto+"'></span> ";
		    }
		}catch(e){
		    f.c(e)
		}
		
		f.c('entra a poner campos');
		f.c(field.tval);
		f.c(i+':'+ field.type+':'+field.name);
		
		var fadd = "<span class='formfields'>";
		var faddoptions = "";
		var fdisabled = field.disabled;
		var ftval = "";
		var freq = field.treq;
		
		try{
		    ftval = field.tval
		}catch(e){
		    f.c(e);
		}
		
		if (fdisabled){
		    fdisabled = " disabled ";
		}else{
		    fdisabled = ""
		}

		if (freq){
		    frequired= " treq='true'"
		}else{
		    frequired= " treq='false'"
		}

		//set default value
		let defvalue = ""
		field.defvalue!==undefined? defvalue=field.defvalue:""
		
		switch(field.type){
		case "select":
		    fadd = "<span class='label'>"+field.label+"</span><select id=\""+field.id+"\" name=\""+field.name+"\" class=\""+field.class+"\" " + fdisabled + frequired + " >";

		    var faddoptions;
		    var j;
		    for(j=0;j<field.options.length;j++){

			f.c(field.options[j]);
			let disab = ''

			if(field.options[j].disabled=='disabled'){
			    disab = 'disabled=\"disabled\"'
			}
			
			faddoptions += "<option value=\""+field.options[j].value+`\" ${disab}>`+field.options[j].name+"</option>"
		    }

		    if (side =='right'){
			fadd+=faddoptions+"</select><span class='label'>"+field.label+"</span></p>";
		    }else{
			fadd+=faddoptions+"</select>";	   
		    }
		    
		    break;
		    //Related with mongodb collection is like a list but doing a query from database and loading records on list
		case "collection":
		    
		    f.c('entra a consultar collection field: '+field.name);
		    
		    var arrayDatosCollection;
		    var arrlen = 0;
		    
		    fadd = "<span class='label'>"+field.label+"</span><select id=\""+field.id+"\" name=\""+field.name+"\" class=\""+field.class+"\" " + fdisabled + frequired + " placeholder=\""+field.label+"\" >";
		    if (side =='right'){
			fadd+=faddoptions+"</select><span class='label'>"+field.label+"</span>";
		    }else{
			fadd+=faddoptions+"</select>";	   
		    }

		    var xobjl = new Array();

		    try{

			var prms = "collection="+field.collection
       			var url = "loadcollection";
			var campo = field;
			//f.c('entra a iteracion de campo')
			f.c(field)

			xobjl[numeroIteraciones] = new XMLHttpRequest();
			xobjl[numeroIteraciones].open('post', url, true);
			xobjl[numeroIteraciones].setRequestHeader('Content-type',"application/x-www-form-urlencoded");
			xobjl[numeroIteraciones].campo=campo;
			
			xobjl[numeroIteraciones].onreadystatechange = function (campo) {

			    //f.c('campo after statechange :'+this.campo);
			    //f.c('readyState'+this.readyState+' campo:'+campo.id);
			    
			    if (this.readyState == 4 && this.status == "200") {
				// Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
				arrayDatosCollection=JSON.parse(this.responseText);

				f.c('impresion arrayDatosCollection');
				f.c(arrayDatosCollection.length);
				f.c(arrayDatosCollection);
				
				arrlen=arrayDatosCollection.length;

				var faddoptions;
				var j;
				var k;

				//set the option if the field includes blank option set by option includeblank from field definition on mongodb
				if (this.campo.includeblank=='true'){
				    k=-1;
				}else{
				    k=0;
				}

				for(j=k;j<arrlen;j++){
				    
				    var valoptioneval = 'arrayDatosCollection['+j+'].'+this.campo.valfield;
				    var vallaboptioneval='arrayDatosCollection['+j+'].'+this.campo.labelfield;
				    var valoption="";
				    var laboption="";
				    
				    try{
					valoption = eval(valoptioneval);
					laboption = eval(vallaboptioneval);
				    }catch(er){

				    }

				    f.c('valoption:');
				    f.c(valoption);

      				    f.c('valoptioneval:');
				    f.c(valoptioneval);
				    
				    var option = document.createElement("option");
				    option.text = laboption;
				    option.value = valoption;
				    var select = f.g(this.campo.id);
				    select.appendChild(option);
				}
			    }else{
				f.c('readystate:'+this.readyState + " status:"+this.status);
			    }
			};
		    }catch(e){
			f.c(e);
		    }
		    
		    xobjl[numeroIteraciones].send(prms);
		    numeroIteraciones++;
		    break;
		case "text":
		case "date":
		case "number":
		case "checkbox":
		    
		    fadd = "<span class='label'>"+field.label+"</span><input id=\""+field.id+"\" type=\""+field.type+"\" tval=\""+ftval+"\" name=\"" + field.name + "\" class=\""+field.class+"\" " +fdisabled + frequired + " value =\""+defvalue+"\" placeholder=\""+field.label+"\" />";
		    break;
		case "textarea":
		    fadd = "<span class='label'>"+field.label+"</span><textarea id=\""+field.id+"\" type=\""+field.type+"\" tval=\""+ftval+"\" name=\"" + field.name + "\" class=\""+field.class+"\" rows=\"5\" cols=\"55\" " + fdisabled + frequired + " value =\""+defvalue+"\" placeholder=\""+field.label+"\"></textarea>";
		    break;
		case "image":
		    fadd = "<span class='label'>"+field.label+"</span><img src=\"" + field.src + "\" id=\""+field.id+"\" type=\""+field.type+"\" name=\"" + field.name + "\" class=\""+field.class+"\" rows=\"5\" cols=\"55\" " + fdisabled + frequired + "  value =\""+defvalue+"\" placeholder=\""+field.label+"\">";
		    break;
		case "button":
		    fadd = "<button id=\""+field.id+"\" name=\"" + field.name + "\" class=\""+field.class+"\" " + fdisabled + frequired + " placeholder=\""+field.label+"\">"+field.label+"</button>";
		    break;
		default:
		    fadd = "<span class='label'>"+field.label+"</span><input id=\""+field.id+"\" type=\""+field.type+"\" tval=\""+ftval+"\"  value =\""+defvalue+"\" name=\"" + field.name + "\" class=\""+field.class+"\" " +fdisabled + frequired + "  placeholder=\""+field.label+"\" />";
		    break;
		}//switch close tag
		
		//idealmente poner este codigo aqui
	
		//el formulario es de tabs
		let addtab = false;
		
		try{
		    if(formdata.tabs_title.length > 0){
			addtab = true;
			f.g(formdata.tabs_title[field.tabn]).innerHTML+=f.rTran(fadd)
		    }
		}catch(e){
		    //html += fadd+"</span>";
		    f.c(e)
		}

		
		try{
		    if(!addtab){
			//fadd+="</span>"
			if (loadto){
	    		    f.g(loadto).innerHTML += f.rTran(fadd);
			}
		    }
		}catch(e){
		    f.c(e)
		}
		
		//crear autosuggest dinamicamente
		try{
		    if(field.as_col !== undefined){
			new AutoSug (field.id, field.as_col, field.as_fld);
		    }
		}catch(e){

		}
	
	    }//for close tag

	    /*
	    try{
		if (loadto){
	    	    f.g(loadto).innerHTML += f.rTran(html);
		}
	    }catch(e){
		f.c(e)
	    }
	    */
	}else if(typef=="tutorial"){//if form tutorial

	    try{
   		var loadto = formdata.container;
		f.g(loadto).innerHTML = formdata.tutorial[0];
		f.c(formdata.tutorial);
		
	    }catch(e){
		f.c(e);
	    }

	}else if (typef=="report"){
	    try{
		f.cR(formdata.grid_c, formdata.columns, formdata.grid_collection);
	    }catch(e){
	    	f.c(e);
	    }
	    
	    //para los formularios con grids
	}else if (typef=="grid"){
	    try{
		f.cG(formdata.grid_c, formdata.columns, formdata.grid_collection);
	    }catch(e){
	    	f.c(e);
	    }
	    
	    //para los formularios con grids
	}else if (typef=="form-grid"){
	    try{
		formdata.type="form"
		f.lF(formdata,side='left',true);

		formdata.type='grid';
		f.cG(formdata.grid_c, formdata.columns, formdata.grid_collection);
		//funcion para mostrar la factura PDF
		f.sPDF('mainPanel',true)
		
	    }catch(e){
	    	f.c(e);
	    }

	}else if (typef=="workflow"){
	    try{
		f.c('entra a tipo de form workflow');
		formdata.type='workflow';
		
		f.lWF(formdata);
		
	    }catch(e){
	    	f.c(e);
	    }
	}else if (typef == "file"){
	    try{
		f.c('entra a tipo de form file');
		formdata.type='file';

		f.c('container:')
		f.c(formdata.container);
		f.c(formdata);

		f.r({url:'transfile'}, false, false)
		    .then(r => {
			try{
			    var p = r.target.responseText
			    
			    if(p){
				f.g(formdata.container).innerHTML = `<div class="completo" contentEditable="true"><xmp id="transjsdiv">${p}</xmp></div>`
			    }
			}catch(e){
			    f.c(e)
			}
		    }).catch(e => {
			f.c(e)
		    })
		
	    }catch(e){
	    	f.c(e);
	    }
	}
	
    }
}
