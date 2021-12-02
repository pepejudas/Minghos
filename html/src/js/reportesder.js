const rd = {
    dvr:'reportesderecha',
    advr:'adivreporte',
    ac:'alcl',
    init:function(){    
	try{//efectuar consulta de los reportes que van del lado derecho del panel de odontologia
	    
	    let jsonString = `{\"tipo\":\"reporte\"}`
	    jsonString=encodeURIComponent(jsonString);
	    let sendjson = `{"collection":"d_report","conditions":"${jsonString}"}`; 
	    
	    f.r({url:'loadcollection', params:sendjson}).then(r => {
		
		try{
		    var p = JSON.parse(r.target.responseText)
		    var htmladd = "";
		    
		    if(p.length>0){
			
			p.forEach(function(item, index){
			    f.g(rd.dvr).innerHTML += f.rTran(`<div id='${rd.advr}'><a class='${rd.ac}' id_r='${item._id}' href='#loadreport'>${item.name}</a></div>`);

			    /*
			    f.g(item._id).addEventListener('click', function(){
				f.c(`hizo click en reporte ${item._id}`);
			    });
			    */
			});
		    }
		}catch(e){
		    fn.c(e)
		}
	    }).catch(e=>{
		f.c('entra al catch del save form');
		f.c(e)
	    })     
	}catch(e){
	    f.c(e)
	}
    }
}
