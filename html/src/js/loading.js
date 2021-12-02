const l = {
    //placeholder for user messages
    lm:null,
    //load user messages
    lMess:function(){
	var htmlmessages = "<div>";
	for(var key in l.lm){
	    htmlmessages+="<div>{{estado}}: "+l.lm[key].status+"</div><div><input type='checkbox'>{{mensaje}}: "+l.lm[key].message+"</div><br/>"
	}
	htmlmessages+="<button>{{marcarleido}}</button></div>";
	
	return f.rTran(htmlmessages);
    },
    lUM:function(){    
	try{
	    
	    f.c('loading automation script... ');
	    
	    f.j(l.loadNumM, `conditions={"user":"${s.user}", "status":"unread"}&collection=d_message`, 'loadcollection');
	    
	    document.getElementById('usermessages').addEventListener("click", function(){
		f.c('se ejecuto el click del evento');
		//cargar los mensajes en el panel principal de aplicacion
		document.getElementById('mainPanel').innerHTML=l.lMess(l.lm);
	    });

	    //chat functions
	}catch(er){
	    f.c(er);   
	}
    },
    loadNumM:function(data){
	f.c(data.length);

	try{
	    if (data.length>0){
		document.getElementById('numusermessages').innerHTML=data.length;
		document.getElementById('usertag').innerHTML=s.user;
		l.lm = data;
	    }
	}catch(e){
	    f.c
	    (e);
	}
    }
};
