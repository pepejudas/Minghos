/*
******************************************
AppController
*/
const loadform = 'panel1';
let collPrinc = '';
let dataArray = new Array();
let currentRecord = 0;
let lenghtArray;

//line to load menu items
f.lM(loadform);

try{
    document.body.addEventListener('click', function(e){

	let idform

	try{
	    //for side menu opening forms on right panel
	    idform = e.target.attributes.id.value;
	}catch(Error){
	    // capture to handle all clicks that come from menu options or all other places from page
	    try{
		f.c("log evento:");    
		f.c(e);
		
		switch(e.srcElement.hash){

		case "#minimize":
		    //get the name of panel to minimize on attribute form [2]
		    let pn = e.srcElement.attributes[2].value;

		    if(!f.g(pn).style.display || f.g(pn).style.display=="block"){
			f.g(pn).style.display = "none"
		    }else if(f.g(pn).style.display=="none"){
			f.g(pn).style.display = "block"
		    }
		    
		    
		    break;
	        //option to delete the current record from form object
		case "#delete":
		    
		    let delreg = f.g('_id').value;
		    f.r({url:'delete', params:`{"table":"${collPrinc}", "id":"${delreg}"}`})
			.then(r => {
			    try{
				let p = JSON.parse(r.target.responseText)

				if(p){
				    let htmladd = "";
				    dataArray = p.data;
				    lenghtArray = dataArray.length
				    currentRecord = 0;		
				    let data = dataArray[currentRecord];
				    f.lD(data);
				    f.lRN(1, lenghtArray, 'recounter');
				}
			    }catch(e){
				f.c(e)
			    }
			}).catch(e=>{
			    f.c(e)
			})
		    break;
		case "#send":
		    //id  comunication
		    let idcom = f.g('_id').value;
		    let typedoc = f.g('type').value;
		    let group = f.g('grupo').value;
   		    let typec = f.g('typec').value;
   		    let titulo = f.g('titulo').value;
   		    let comunicado = f.g('comunicado').value;

		    f.r({url:'send', params:`{"id":"${idcom}", "type":"${typedoc}", "group":"${group}", "typec":"${typec}", "titulo":"${titulo}", "comunicado":"${comunicado}"}`})
			.then(r => {
			    try{
				var p = JSON.parse(r.target.responseText)
				
				if(p){
				    var htmladd = "";
				    dataArray = p.data;
				    lenghtArray = dataArray.length
				    currentRecord = 0;		
				    var data = dataArray[currentRecord];
				    f.lD(data);
				    f.lRN(1, lenghtArray, 'recounter');
				}
			    }catch(e){
				f.c(e)
			    }
			}).catch(e=>{
			    f.c(e)
			})
		    /*
                      $http({
		      method:"POST",
		      params:{"id":idcom, "type":typedoc, "group":group, "typec":typec, "titulo":titulo, "comunicado":comunicado},
		      url:"/send"
		      }).then(function mySuccess(response) {
		      //iterate form components to var htmladd;
		      var htmladd = "";
		      dataArray = response.data;
		      lenghtArray = dataArray.length
		      currentRecord = 0;
		      var data = dataArray[currentRecord];
		      f.lD(data);
		      f.lRN(1, lenghtArray, 'recounter');
		      }, function myError(response){
		      //set the parameters and form for all requested parameters
		      //$scope.myWelcome = response.data;
		      f.c('errror on request:');
		      });
		    */
		    break;
		case "#seecalendar":
		    f.c('click en ver calendario')
		    break;
		case "#loadrecord":
		    //var txts =  f.g('textsearch').value;
		    let txts = e.srcElement.attributes._id.value
		    let criterial = "_id";

		    f.s(collPrinc, txts, criterial);

		    break;
		case "#cancel":
		    //var txts =  f.g('textsearch').value;
		    let idtxts = e.srcElement.attributes._id.value
		    //let crt = "_id";
		    f.c('entra a cancel del controller...')
		    f.upF(idtxts,'d_meet', 'estado', 'cancelado');
		    
		    break;
		case "#notify":
		    //var txts =  f.g('textsearch').value;
		    let idtx = e.srcElement.attributes._id.value
		    //let crt = "_id";
		    f.c('entra a notify del controller...')
		    f.notF(idtx);
		    
		    break;
		    //activar usuario
		case "#activate":

		    let id = f.g('_id').value;
		    let email = f.g('email').value;
		    let usuario = f.g('user').value;
   		    let password = f.g('password').value;
		    let tipo = f.g('tipo').value;
		    let lang = f.g('idioma').value

		    f.actU(id, usuario, password, email, lang, tipo, function(){
			f.c('el usuario se ha creado con exito')
		    })
		    
		    /*
		    var idcom = f.g('_id').value;
		    var typedoc = f.g('type').value;
		    var group = f.g('grupo').value;
   		    var typec = f.g('typec').value;
   		    var titulo = f.g('titulo').value;
   		    var comunicado = f.g('comunicado').value;
		    
		    f.r({url:'send', params:`{"id":"${idcom}", "type":"${typedoc}", "group":"${group}", "typec":"${typec}", "titulo":"${titulo}", "comunicado":"${comunicado}"}`})
			.then(r => {
			    try{
				var p = JSON.parse(r.target.responseText)
				
				if(p){
				    var htmladd = "";
				    dataArray = p.data;
				    lenghtArray = dataArray.length
				    currentRecord = 0;		
				    var data = dataArray[currentRecord];
				    f.lD(data);
				    f.lRN(1, lenghtArray, 'recounter');
				}
			    }catch(e){
				f.c(e)
			    }
			}).catch(e=>{
			    f.c(e)
			})
		    */
		    break;
		    //desactivar usuario
		case "#loadreport":
		    //var txts =  f.g('textsearch').value;
		    let idtxt = e.srcElement.attributes.id_r.value
		    f.c(`hizo click en cargar reporte ${idtxt}`)

		    if(f.g('divopac') == null){

			f.r({url:'ftsearch', params:`{"table":"d_report", "value":"${idtxt}", "criterial":"_id"}`}).then(r => {
			    try{                                                                    
				var p = JSON.parse(r.target.responseText);
				var htmladd = "";                                                   
				if(p.length>0){
				    f.g('rsidebar').innerHTML+="<div id='divopac'></div><div id='dvr'></div>";
				    let formparam = {container:'divopac', fields:p[0].access_tag, main_c:'dvr', type:'form'};

				    f.lF(formparam);
				    f.g('generareporte').addEventListener('click', function(){
					f.c('click en el generar reporte');
					let xform = f.g('divopac');
					let inputElements = xform.querySelectorAll("input, select, checkbox, textarea");
					let b = f.v(inputElements);
					if(b){
					    //llamar el servicio de reportes
					    let jsonp = f.gjv(inputElements);
					    
					    f.r({url:'reporting', params:jsonp}, false, false).then(function(rp){
						try{
						    //var pr = JSON.parse(rp.target.responseText);

						    f.g('rsidebar').innerHTML+=`<span id='divopac'><embed src='pdf/${rp.target.responseText}' width='350' height='500' type='application/pdf'><a href='#' onclick='this.parentNode.remove();'>X</a></span>`
						}catch(e){
						    f.c(e)
						}
					    }).catch(e=>{
						f.c('entra al catch del evento:220')
					    })
					
					    xform.remove();
					}
				    })
				}
			    }catch(e){
				f.c(e)
			    }
			}).catch(e=>{
			    f.c('entra al catch del evento:206')
			})
		    }
		    /*
		      formd = 
		      f.g('rsidebar') = f.lf()
		    */
		    
		    /*
		      document.body.innerHTML += "<span id='divopac'><embed src='pdf/a4.pdf' width='500' height='375' type='application/pdf'><a href='#'>X</a></span>"
		    */
		    
		    /*
		    let txts = e.srcElement.attributes._id.value
		    let criterial = "_id";
		    f.c()
		    f.s(collPrinc, txts, criterial);
		    */
		    break;
		
		case "#unactivate":
		    //var txts =  f.g('textsearch').value;
		    /*
		    let txts = e.srcElement.attributes._id.value
		    let criterial = "_id";
		    
		    f.s(collPrinc, txts, criterial);
		    */
		    break;
		case "#add1k":
		    //var txts =  f.g('textsearch').value;

		    let numregf = f.g('numregadd').value

		    if(numregf>0){
			for(let i=0;i<=numregf;i++){
			    f.sv('mainPanel', collPrinc);
			}
		    }
		    break;
		}
	    }catch(Er){
		f.c(Er);
	    }
	}
	
	e=window.event? event.srcElement: e.target;

	if(e.className && e.className.indexOf(loadform)!=-1 && !!idform){

	    f.c("entra a controller.js");

	    try{
		if(idform=="exit"){
		    f.exit()
		    throw new Error();
		}
	   
	    f.r({url:'loadform', params:`{"id":"${idform}"}`})
		.then(r => {
		    try{
			var p = JSON.parse(r.target.responseText)
			
			if(p){
			    var htmladd = "";
			    var data = p[0];

			    try{
				//set the collection to search records
				collPrinc = p[0].collection;
				f.c("collection:"+ p[0].collection);
				
				//if response is not null
				if (!!data){
				    if (!f.lFa){
					var html = f.lF(p[0]);
				    }
				}
			    }catch(e){
				f.c('No se puede cargar el formulario solicitado');
				f.c(e);
			    }
			}
		    }catch(e){
			f.c(e)
		    }
		}).catch(e=>{
		    f.c(e)
		})
	    }catch(e){
		//console.error(e)
	    }
	}

	switch(e.value){
	    //save form data
	case "Save":
	    
	    f.sv('mainPanel', collPrinc);

	    break;
	    //last record    
	case ">II":

	    //function to clean form before load data
	    f.clF();
	    currentRecord = lenghtArray - 1;	    
	    var data = dataArray[currentRecord];
	    f.lD(data);
	    f.lRN(currentRecord+1, lenghtArray, 'recounter');
	    break;
	    //first record    
	case "II<":

	    //function to clean form before load data
	    f.clF();
	    currentRecord = 0;
	    var data = dataArray[currentRecord];
	    f.lD(data);
	    f.lRN(currentRecord+1, lenghtArray, 'recounter');
	    break;
	    //next record    
	case ">>":

	    //function to clean form before load data
	    f.clF();
	    if (currentRecord + 1 < lenghtArray){
		currentRecord += 1;
	    }
	    var data = dataArray[currentRecord];
	    f.lD(data);
	    f.lRN(currentRecord+1, lenghtArray, 'recounter');
	    break;
	    // previous record    
	case "<<":
	    //function to clean form before load data
	    f.clF();
	    if (currentRecord > 0){
		currentRecord -= 1;
	    }
	    var data = dataArray[currentRecord];
	    f.lD(data);
	    f.lRN(currentRecord+1, lenghtArray, 'recounter');
	    break;
	    //new record    
	case ">II*":
	    //llamar a una funcion para limpiar los formularios clearform
	    f.clF();
	    break;
	    //next record    
	case "Search":
	    f.c("entra a buscar");
	    let txts =  f.g('textsearch').value;
	    let crit = ''
	    f.s(collPrinc, txts, crit);
	    break;
	case "Save File":
	    //para el caso de las traducciones
	    f.c("entra a guardar archivo");
	    
	    let txtrans =  f.g('transjsdiv').innerHTML;

	    f.sFl(txtrans, function(){
		f.c('saved successfully')
	    })
	    break;
	default:
	    break;
	    f.c(e.value);
	}

	if(e.className && e.className.indexOf('control')!=-1)

	    //conditional for search
	    if (e.id =="search"){
		var st = f.g('searchtext').value;

		f.r({url:'search', params:`{"st":${st}}`})
		    .then(r => {
			try{
			    
			    var p = JSON.parse(r.target.responseText)
			    f.g('description').innerHTML = p.data;
			    f.c(response.data);

			}catch(e){
			    f.c(e)
			}
    		    }).catch(e=>{
			f.c(e)
		    })
            } 
    })

    //if close the tab without exit
    document.body.addEventListener('unload', function(){
	f.exit()
    })
    
}catch(e){
    f.c(e)
}
