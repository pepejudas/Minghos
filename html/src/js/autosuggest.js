class AutoSug {
    //div to show the options
    d=''
    //collection to load on keypress
    c=''
    //input to work
    i=''
    //fields array
    f=[]
    //num of keypress defined to launch the search to database, default 4 characters
    nkp=4
    //num records by page, maximum number of records to show on every page
    nrp=20
    //data array to iterate
    datAutoS=null
    //numreg inside data array
    numReg=0
    //params to iterate over data array
    iniPag=0
    endPag=0
    //function to set click event
    setCE(aclass){
	var that = this
	const numi = document.getElementsByClassName(aclass).length

	for(var i=0;i<numi;i++){
	    var el = document.getElementsByClassName(aclass)

	    el[i].addEventListener('click', function(){
		f.c('ha seleccionado un paciente:' + this.id+this.innerHTML);
	
		f.g(that.d).innerHTML = ''
		f.g(that.i).value = /*'['+this.id+'] '+*/ this.innerHTML
		f.g(that.d).style.display='none'
	    }, false)
	}
    }
    
    setAutoS(data){
	let div = f.g(this.d)

        if(data){
	    this.datAutoS = data
	    this.numReg=data.length
	}

        var iterator = 0
        var size = this.datAutoS.length
        let lim = this.endPag

	if(this.endPag > this.numReg){
            lim = this.numReg
        }

	var contenidohtml = "";
	var classname = 'nodocselpatient'
	
	for(var i = this.iniPag;i < lim;i++){
            contenidohtml+="<div id='autosuggestline'><a href='#' class='" + classname  + "' id='"+this.datAutoS[i]._id+"'>" + this.datAutoS[i].nodocumento + " " + this.datAutoS[i].nombre  + " " + this.datAutoS[i].apellido  + "</a></div>"
        }

	if (this.numReg > this.nrp){
	    contenidohtml+="<div><a href='#' id='fpage' class='pagination_a'>II<</a>&nbsp;<a href='#' id='ppage' class='pagination_a'><<</a>&nbsp;<a href='#' id='npage' class='pagination_a'>>></a>&nbsp;<a href='#' id='lpage' class='pagination_a'>>II</a></div>"
        }
	
        div.innerHTML=contenidohtml;
        this.pageAuS();
	this.setCE(classname);
    }
    
    //pagination function set iniPag and endPag
    pageAuS(){
        var that = this
        try{
	    //si los registros no caben en una pagina
	    if(this.numReg > this.nrp){
		f.c('inicializado el paginador de autosuggest')
		f.g('fpage').addEventListener('click', function(){
                    that.iniPag = 0
                    that.endPag = as.nrp
                    that.setAutoS()
		})
		
		f.g('ppage').addEventListener('click', function(){
                    if (that.iniPag>=that.nrp){
			that.iniPag-=that.nrp
			that.endPag-=that.nrp
                    }
                    that.setAutoS()
		})
		
		f.g('npage').addEventListener('click', function(){
                    if(that.numReg>that.endPag){
			that.iniPag+=that.nrp
			that.endPag+=that.nrp
                    }
                    that.setAutoS()
		})
		
		f.g('lpage').addEventListener('click', function(){
		    that.iniPag = Math.trunc(that.numReg/that.nrp) * that.nrp
		    that.endPag = that.iniPag + that.nrp 
		    that.setAutoS()
		})
            }
	}catch(e){
            f.c(e);
	}
    }
    
    launchS(){

	//agregar el div de resultados
	let par = f.g(this.i).parentNode
	//agregar el div de resultados
	let element = document.createElement("div");
	element.id = this.d
	element.className = 'displaysuggestresult'
	par.appendChild(element)

	// añade el elemento creado y su contenido al DOM
	var currentDiv = f.g(this.i);
	currentDiv.after(element);
	
	var that = this
	//autosuggest searching for document number name or last name
        var ndas = f.g(this.i)
	ndas.autocomplete="off"
	//minimun lenght to fires the search event on database
        ndas.addEventListener('keyup', function(){
	    
	    f.c('entro al evento de autosugest');
            var ndasl = ndas.value.length;

            if(ndasl >= that.nkp){
		
		var expr = ndas.value;
		var cond = that.crCond(that.f, expr)

		f.r({url:'loadcollection', params:`collection=${that.c}&conditions=${cond}`})
		//f.r({url:'ftsearch', params:`table=${that.c}&value=${expr}`})
		    .then(r => {
			try{
			    let data = JSON.parse(r.target.responseText)
			    
			    if(data){

				let div = f.g(that.d)
				
				if(data){
				    that.datAutoS = data
				    that.numReg=data.length
				}

				var iterator = 0
				var size = that.datAutoS.length
				let lim = that.endPag

				if(that.endPag > that.numReg){
				    lim = that.numReg
				}

				var contenidohtml = "";
				var classname = 'nodocselpatient'
				
				for(var i = that.iniPag;i < lim;i++){
				    let obj = that.datAutoS[i]
				    let len = that.f.length
				    let cadenastr = ""
				    
				    for(let k=0;k<len;k++){
					f.c(that.f[k])
					if(obj[that.f[k]] != undefined){
					    cadenastr += " " + obj[that.f[k]]
					}
				    }

				    contenidohtml+="<div id='autosuggestline'><a href='#' class='" + classname  + "' id='"+that.datAutoS[i]._id+"'>" + cadenastr  + "</a></div>"
				    //contenidohtml+="<div id='autosuggestline'><a href='#' class='" + classname  + "' id='"+that.datAutoS[i][0]+"'>" + that.datAutoS[i][1] + " " + that.datAutoS[i][2]  + " " + that.datAutoS[i][3]  + "</a></div>"
				}

				if (that.numReg > that.nrp){
				    contenidohtml+="<div><a href='#' id='fpage' class='pagination_a'>II<</a>&nbsp;<a href='#' id='ppage' class='pagination_a'><<</a>&nbsp;<a href='#' id='npage' class='pagination_a'>>></a>&nbsp;<a href='#' id='lpage' class='pagination_a'>>II</a></div>"
				}
				
				if(i>0){
				    div.style.display='block'
				}
				
				div.innerHTML=contenidohtml;
				that.pageAuS();
				that.setCE(classname);
			    }
			}catch(e){
			    f.c(e)
			}
		    }).catch(e => {
			f.c(e)
		    })
	
		//clean the div because not enought caracters to launch the search
	    }else{
		f.g(that.d).innerHTML=""
		f.g(that.d).style.display='none'
	    }
        })
    }
    //create conditions
    crCond(arrayFields, expr){
	let conditions = "{ \"$or\": ["
	var item = ""
	let l = arrayFields.length
	var iterator = 0;
	var coma
	
	for(var key in arrayFields){
	    parseInt(key)+1==l? coma="":coma=","

	    item = "{ \"" + arrayFields[key] + "\": { \"$regex\": \""+expr+"\" } } " + coma
	    iterator++

	    conditions+=item
	}

	conditions+="]}"
	return conditions
    }
    
    constructor(inputid, collectiontoquery, fieldsarray){
	f.c('constructor() -> autosuggest.js...')

	this.d=inputid+'_div'
	this.c=collectiontoquery
	this.i=inputid
	this.f=fieldsarray
	//number of items by page default 20
	this.endPag=this.nrp
	this.launchS()
    }
}
