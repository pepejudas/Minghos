const lang_es = {
    titulo:'Minghos',
    user:'Usuario',
    password:'Contrase&ntilde;a',
    ingresar:'Ingresar',
    olvidopass:'Olvide contrase&ntilde;a',
    erroruserpass:'Debe ingresar usuario y password',
    errorcaptcha:'Captcha incorrecto'
}

const lang_en = {
    titulo:'Minghos',
    user:'User',
    password:'Password',
    ingresar:'Login',
    olvidopass:'Forgot Password',
    erroruserpass:'Please fill user and password',
    errorcaptcha:'Invalid Captcha'
}

const lang_fr = {
    titulo:'Minghos',
    user:'Utilisateur',
    password:'Mot de passe',
    ingresar:'Login',
    olvidopass:'Mot de passe oublié',
    erroruserpass:'Vous devez entrer le nom d\'utilisateur et le mot de passe',
    errorcaptcha:'Captcha incorrect'
}

const lang_pr = {
    titulo:'Minghos',
    user:'Do utilizador',
    password:'Senha',
    ingresar:'Login',
    olvidopass:'Esqueceu a senha',
    erroruserpass:'Você deve inserir nome de usuário e senha',
    errorcaptcha:'Captcha incorreto'
}

var url_string = window.location;
var url = new URL(url_string);
var v = url.searchParams.get("v");
var vemail = url.searchParams.get("vemail");
var semail = url.searchParams.get("semail");
var sm = url.searchParams.get("m");

var debugmode = true;
var ipuser;

if (v){
    document.getElementById('login2').innerHTML = '<br/>Invalid User/Password';
}
if (vemail){
    document.getElementById('login2').innerHTML = '<br/>Invalid Email Account'; 
}
if (semail){
    document.getElementById('login2').innerHTML = '<br/>The user/password has been sent to ' + semail; 
}
if(sm){
    document.getElementById('login2').innerHTML = `<br/>${sm} `;
}

var url_string = window.location;
var url = new URL(url_string);
var v = url.searchParams.get("v");
var emf = document.getElementById('login2');

var qC;

//initialization js script
var body = `<img src='/images/svg/user-shape.svg' height='20px'>&nbsp;<input name='user' type='text' id='user' style='padding:10px' autofocus  required  placeholder='{{user}}'/><br/>
	  <img src='/images/svg/foursquare-button.svg' height='20px'>&nbsp;<input name='password' type='password' id='password' style='padding:10px' required  placeholder='{{password}}'/><br/>`
	  
document.getElementById('contenedor').innerHTML = f.rTran(body);
document.getElementById('loginbutton').value = f.rTran('{{ingresar}}');
document.getElementById('forgpass').value= f.rTran(`<a href='recover.html'>{{olvidopass}}</a>`)
      
var qC;
var errorPass="";

function catp(){
    try{
	//question captcha
	qC = cA.gRQ(dL);
	document.getElementById('divcaptcha').innerHTML = qC.q;
	
    }catch(e){
	console.log(e);
    }
}
function rlTrans(){
    dL = document.getElementById('languaje').value
    document.getElementById('contenedor').innerHTML = f.rTran(body);
    catp();
    document.getElementById('loginbutton').value=f.rTran('{{ingresar}}');
    document.getElementById('forgpass').value= f.rTran(`<a href='recover.html'>{{olvidopass}}</a>`)
}

try{

    catp()

    var l = document.getElementById('languaje');
    var dL = localStorage.getItem('dL');

    l.value=dL;

    rlTrans();
    
    l.addEventListener('change', function(e){
	rlTrans()
    })
}catch(e){
    f.c(e)
}
//to verify the captcha answer
try{

    let ans = document.getElementById('captchans');

    ans.addEventListener("focusout", function(){

	let subtn = document.getElementById('loginbutton');
	
	let e = document.getElementById('user');
	let p = document.getElementById('password');
	let a = document.getElementById('captchans').value;
	
	if( a == qC.a){
	    if(e.value && p.value){
		subtn.disabled=false;
		document.getElementById('login2').innerHTML = f.rTran(`<br/>`);
	    }else{
		document.getElementById('login2').innerHTML = f.rTran(`<br/>{{erroruserpass}}`);
	    }
	}else{
	    document.getElementById('login2').innerHTML = f.rTran(`<br/>{{errorcaptcha}}`)
	}
    });
}catch(e){
    console.log(e);
}
