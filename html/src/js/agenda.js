//library to create the graphic agenda by month or by week
const a = {
    //function to load controls in principalagenda
    y:5,
    autoSClick:function(){
	f.c('funcion ejecutada al cargar script');
	//finally hidde container div
	//f.gId(a.autoSName).style.display='none';
    },
    makeid:function(length) {
	var result           = '';
	var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var charactersLength = characters.length;
	for ( var i = 0; i < length; i++ ) {
	    result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
    },
    insertM:function(callback, collection, objtoinsert, sendmode=false){
	f.c('entra al insertM')
	
	var xobj = new XMLHttpRequest();
        var url='addrecordmongo?collection=' + collection  + '&jsonstring='+objtoinsert;
        
	xobj.overrideMimeType("application/json");
        xobj.open('POST', url, true); // Replace 'my_data' with the path to your file
	xobj.onreadystatechange = function () {
            
            if (xobj.readyState == 4 && xobj.status == "200") {
                // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
		callback(xobj.responseText);
            }
        };

        if(sendmode){
            xobj.send(null);
	}else{
	    f.c('sending test url: ' + url);
	}
    },
    testMultiInsert:function(){
	var addtoc = f.g('addtocalendar');

	addtoc.addEventListener('click',function(){
	    
	    var lim = 10000;
	    
	    for(var i=0;i<lim;i++){
		a.insertM(a.setAutoS, "{\"ident\":\""+i+"\",\"nombre\":\"patient_"+i+"\", \"identificador\":\""+a.makeid(5)+"\"}", true)
	    }
	});
    },
    //add meet patient and especialist information
    addMeetPE:function(){

    },
    shPan:function(panel){
	var formadd = f.g(panel);

	if(formadd.style.display=='block'){
	    formadd.style.display='none'
	}else{
	    formadd.style.display='block'
	}
    },
    //add meet function
    addMeet:function(){

	a.creaASug()
    },
    //creating suggest fields
    creaASug:function(){
	try{
	    //autosuggest paciente constructor
	    const as0 = new AutoSug ('nodocumentoas', 'd_person', ['nodocumento', 'nombre', 'apellido', , 'celular'])
	    //autosuggest especialista constructor
	    const as1 = new AutoSug ('nodocumentoes', 'd_specialist', ['nodocumento', 'nombre', 'apellido', 'celular'])

	}catch(e){
	    f.c(e)
	}
    },
    lD:function(){
	//add anos to selectano
	var dateselector = 'datecalendar'
	
	f.g(dateselector).valueAsDate = new Date();
	a.initCalendar()
	
	f.g(dateselector).onchange = function(){
	    a.initCalendar()    
	}
    },
    initCalendar:function(){
	let grid_c = 'grid-container';
	f.g(grid_c).innerHTML = f.rTran("<div class='grid-item-h firstgi'>{{domingo}}</div><div class='grid-item-h'>{{lunes}}</div><div class='grid-item-h'>{{martes}}</div><div class='grid-item-h'>{{miercoles}}</div><div class='grid-item-h'>{{jueves}}</div><div class='grid-item-h'>{{viernes}}</div><div class='grid-item-h lastgi'>{{sabado}}</div>")
	
	f.c('entra a init calendar');
	let dateselector = 'datecalendar'
	
	//replace - for / because day off on date creation
	let datselv0 = new Date(f.g(dateselector).value.replace(/-/g, '\/'))
	let datselv1 = new Date()
	
	var dat0 = new Date(datselv0)
	var numd0 = a.daysInM(dat0.getMonth(), dat0.getFullYear())
	var dat1 = new Date(dat0.getFullYear(), dat0.getMonth(), 1)
	var numd1 = dat1.getDay()
	var dat2 = new Date(dat0.getFullYear(), dat0.getMonth() + 1, 0)
	var dat0iso = dat1.toISOString()
	var dat1iso = dat2.toISOString()
	
	f.c('numdays in month:'+numd0+' '+numd1)

	for(var i=1;i<=(numd0+numd1);i++){
	    let classcd = "";

	    //condition for set class for current day
	    if(datselv0.getFullYear()==datselv1.getFullYear() && datselv0.getMonth()==datselv1.getMonth() && datselv1.getDate()+numd1==i){
		classcd = "cday"
	    }
	    
	    if (i>numd1){
		f.g(grid_c).innerHTML+=`<div class='grid-item ${classcd}' id='agendadia${i-numd1}'>${i-numd1}</div>`
	    }else{
		f.g(grid_c).innerHTML+=`<div class='grid-item'></div>`
	    }
	}
	
	f.r({url:'agendabymonth', params:`{"table":"d_meet", "dateini":"${dat0iso}","datefin":"${dat1iso}"}`})
	    .then(function(r){
		try{
		    var data = JSON.parse(r.target.responseText)
		    f.c(data)
		    for(var i =0;i<data.length;i++){
			var datemeet = new Date(data[i].fechacita+'T12:00:00Z')
			var diameet = datemeet.getDate()
			f.c(`fechacita: ${data[i].fechacita} datemeet:${datemeet} diameet:${diameet}`);
			let classmeet = ""
			
			if(!!data[i].estado){
			    classmeet = data[i].estado
			}
			
			f.g(`agendadia${diameet}`).innerHTML+=f.rTran(`<div class='${data[i].estado}'><a href='#cancel' _id='${data[i]._id}' title={{cancelar}}>X</a>&nbsp;<a href='#notify' _id='${data[i]._id}' title='{{notificar}}'>&#10148;</a>&nbsp;<a href='#loadrecord' _id='${data[i]._id}' title='{{veregistro}}'>${data[i].horacita} ${data[i].nodocumentoas}</a></div>`)
		    }
		}catch(e){
		    f.c(e)
		}
	    })
	    .catch(function(e){
		f.c(e)
	    })
    },
    daysInM:function (month, year) {
        return new Date(year, month+1, 0).getDate(); 
    },
    init:function(){
	f.c('init() -> agenda.js________________________________________________')
	a.lD()
	a.creaASug()
    }
}
