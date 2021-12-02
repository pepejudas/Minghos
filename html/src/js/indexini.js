//initialization js script
f.g('contenedor').innerHTML = f.rTran(body);
f.g('loginbutton').value=f.rTran('{{registro}}');

var qC;
var errorPass="";

function catp(){
    try{
	//question captcha
	qC = cA.gRQ(dL);
	f.g('divcaptcha').innerHTML = qC.q;
	
    }catch(e){
	console.log(e);
    }
}

//section to test if user already exist
var uservalid = false;

//section to test if email was already registered
var emailvalid = false;

//section to verify nit
var nitvalid = false;

//section to verify company
var companyvalid = false;

function setDiv(data){
    //available
    if (data.available==1){
	uservalid = true;
	f.g('login2').innerHTML = '';
    }
    //already taken
    if(data.available==0){
	f.g('login2').innerHTML = f.rTran('<br/>{{usuarioregistrado}}');
    }
}

function setDivE(data){
    //available
    if (data.available==1){
	emailvalid = true;
	f.g('login2').innerHTML = '';
    }
    //already taken
    if(data.available==0){
	f.g('login2').innerHTML = f.rTran('<br/>{{emailregistrado}}');
    }

    return emailvalid;
}

function setDivEn(data){
    //available
    if (data.available==1){
	nitvalid = true;
	f.g('login2').innerHTML = '';
    }
    //already taken
    if(data.available==0){
	f.g('login2').innerHTML = f.rTran('<br/>{{errornitd}}');
    }

    return nitvalid;
}

function setDivEnC(data){
    //available
    if (data.available==1){
	companyvalid = true;
	f.g('login2').innerHTML = '';
    }
    //already taken
    if(data.available==0){
	f.g('login2').innerHTML = f.rTran('<br/>{{errorcompany}}');
    }

    return companyvalid;
}

function verifEmail(){
    let email = f.g('email').value;
    
    if(!!email){
	f.g('login2').innerHTML = f.rTran('');

	f.r({"url":"checkemail", "params":`{"email":"${email}"}`})
	    .then(r => {
                try{
		    var data = JSON.parse(r.target.responseText)
		    if(data){
                        setDivE(data)
		    }
                }catch(e){
		    f.c(e)
                }
	    }).catch(e => {
                f.c(e)
	    })
    }else{
	f.g('login2').innerHTML = f.rTran('<br/>{{erroremail}}');
    }
}

function verifNit(){
    let nitv = f.g('nit').value;
    
    if(!!nitv){
	f.g('login2').innerHTML = f.rTran('');

	f.r({"url":"checknit", "params":`{"nit":"${nitv}"}`})
	    .then(r => {
                try{
		    var data = JSON.parse(r.target.responseText)
		    if(data){
                        setDivEn(data)
		    }
                }catch(e){
		    f.c(e)
                }
	    }).catch(e => {
                f.c(e)
	    })
    }else{
	f.g('login2').innerHTML = f.rTran('<br/>{{erroremail}}');
    }
}


function verifCompany(){
    let companyv = f.g('company').value;
    
    if(!!companyv){
	f.g('login2').innerHTML = f.rTran('');

	f.r({"url":"checkcompany", "params":`{"company":"${companyv}"}`})
	    .then(r => {
                try{
		    var data = JSON.parse(r.target.responseText)
		    if(data){
                        setDivEnC(data)
		    }
                }catch(e){
		    f.c(e)
                }
	    }).catch(e => {
                f.c(e)
	    })
    }else{
	f.g('login2').innerHTML = f.rTran('<br/>{{errorcompany}}');
    }
}

function verifPass(){
    let passw1 = f.g('password0').value;
    let passw2 = f.g('password1').value;
    let passvalido = false;
    
    if(passw1.length > 9){
	if(passw1 == passw2){
	    passvalido = true;
	    f.g('login2').innerHTML = f.rTran('');
	    //f.g('password0').value = psenc
	    //f.g('password1').value = psenc
	    
	}else{
	    f.g('login2').innerHTML = f.rTran('<br/>{{passwnocoincide}}');
	}
    }else{
	f.g('login2').innerHTML = f.rTran('<br/>{{passnomeet}}');
    }
    
    return passvalido;
}

try{
    f.g('languaje').addEventListener('change', function(e){
	dL = f.g('languaje').value
	f.g('contenedor').innerHTML = f.rTran(body);
	catp();
	f.g('loginbutton').value=f.rTran('{{registro}}');
	localStorage.setItem("dL", dL);
    })
}catch(e){
    f.c(e)
}

try{
    let us = f.g('usuario')
    
    function gvu(){

	let vlus = us.value
	
	if (!!vlus){
	    f.c('entra a vlus')
	    f.r({"url":"checkuser", "params":`{"user":"${vlus}"}`})
		.then(r => {
		    
                    try{
			var data = JSON.parse(r.target.responseText)
			if(data){
                            setDiv(data)
			}
                    }catch(e){
			f.c(e)
                    }
		}).catch(e => {
                    f.c(e)
		})
	}else{
	    f.c('no entra a vlus')
	}
    }

    us.addEventListener('blur', function(){
	gvu();
    })

    let email = f.g('email')

    email.addEventListener('blur', function(){
	verifEmail();
    })

    let passwrd = f.g('password1')

    passwrd.addEventListener('blur', function(){
	verifPass();
    })

    let nit = f.g('nit')

    nit.addEventListener('blur', function(){
	verifNit();
    })

    let company = f.g('company')

    company.addEventListener('blur', function(){
	verifCompany();
    })
    
}catch(e){
    f.c(e)
}

var url_string = window.location;
var url = new URL(url_string);
var v = url.searchParams.get("v");
var emf = f.g('login2');
var e = f.g('usuario');

//to verify the captcha answer
try{
    var ans = f.g('captchans');
    var subtn = f.g('loginbutton');
    var nit = f.g('nit');
    var company = f.g('company');
    var representantelegal = f.g('representantelegal');
    var email = f.g('email');
    let passw1 = f.g('password0').value
    let passw2 = f.g('password1').value
    
    catp();

    ans.addEventListener("focusout", function(){
	if(ans.value == qC.a){
	    if(e.value){
		if(nitvalid){
		    if(companyvalid){
			if(representantelegal){
			    if(emailvalid){
				if(verifPass()){
				    if(uservalid){
					subtn.disabled=false;
					f.g('login2').innerHTML = '';
					localStorage.setItem("dL", dL);
					f.g('login2').innerHTML = f.rTran('');
				    }else{ 
					f.g('login2').innerHTML = f.rTran('<br/>{{usuarioregistrado}}');
				    }
				}else{
				    f.g('login2').innerHTML = f.rTran('<br/>{{passnomeet}}');
				}
			    }else{
				f.g('login2').innerHTML = f.rTran('<br/>{{emailregistrado}}');
			    }
			}else{
			    f.g('login2').innerHTML = f.rTran('<br/>{{errorreplegal}}');
			}
		    }else{
			f.g('login2').innerHTML = f.rTran('<br/>{{errorcompany}}');
		    }
		}else{
		    f.g('login2').innerHTML = f.rTran('<br/>{{errornitd}}');
		}
	    }else{
		f.g('login2').innerHTML = f.rTran('<br/>{{errornotuser}}');
	    }
	}else{
	    f.g('login2').innerHTML = f.rTran('<br/>{{invalidcaptcha}}');
	}
    });

    //store default language option
    dL = f.g('languaje').value;
    localStorage.setItem("dL", dL);
}catch(e){
    console.log(e);
}

