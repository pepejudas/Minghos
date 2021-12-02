//library to keep important information about application
const s = {
    //version 
    v:'0.0.1',
    user:'',
    rol:'',
    privArray:[],
    numM:0,
    urlws:'',
    cwsport:'',
    //function to translate application initially
    trApp:function(){
	/*
	let htmld = document.documentElement.innerHTML;
	f.c(htmld);
	let t = f.rTran(htmld);
	f.c(t);
	document.documentElement.innerHTML = t
	*/
    },
    //active user load params
    actUser:function(){

	f.r({url:'system', method:'post'})
	    .then(r => {
		try{
		    var p = JSON.parse(r.target.responseText)
		    
		    if(p){

			try{

			    f.c(p);
			    s.user = p.user;
			    s.urlws = p.urlws;
			    //s.rol = p.rol;
			    //s.privArray = p.privArray;
			    s.cwsport = p.cwsport;
			    l.lUM();
			    s.numM = p.numessages;

			    let urlchat = s.urlws+s.cwsport;
			    
			    const connection = new WebSocket(urlchat);
			    const box = f.g('chat')//document.getElementById('chat');
			    const chmsg = f.g('chatext')//document.getElementById('chatext');

			    connection.addEventListener('open',()=>{
				f.c('connected');
			    })

			    connection.addEventListener('message', (e)=>{
				if (e.data){
				    box.innerHTML = "<div id='chatline'>"+e.data+"</div><hr/>" + box.innerHTML;
				    msg.value = "";
				    msg.focus();
				    f.c('se ejecuto el click del evento enter');
				}
			    })

			    chmsg.addEventListener('keydown', (e) => {
				let kc = e.which || e.keyCode;

				if(kc===13){
				    let valmsg = msg.value.trim();
				    if(!valmsg==""){
					send(`${s.user}: `+msg.value);
					msg.value = ''
				    }
				}
			    })

			    function send(data){
				if(connection.readyState === WebSocket.OPEN){
				    connection.send(data);
				}else{
				    throw 'Not connected'
				}
			    }

			}catch(e){
			    f.c(e);
			}
			
		    }
		}catch(e){
		    f.c(e)
		}
	    }).catch(e => {
		f.c(e)
	    })
    },
    //function to translate the panel initial from website
    transBini:function(){
	//f.g('main').innerHTML=f.rTran();
	f.g('inicio').innerHTML = f.rTran(f.g('inicio').innerHTML)
    },
    init:function(){
	f.c('entra a init() script system.js...');	
	s.actUser();
	s.transBini();
    }
}  

s.init();
