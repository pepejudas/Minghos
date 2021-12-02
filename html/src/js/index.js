//credits xsitecompany
const lang_es = {
    titulo:'Minghos',
    ingreso:'Ingresar',
    olvideusuario:'Olvide Usuario/Contrase&ntilde;a',
    nuevoregistro:'Nuevo Registro',
    nit:'Nit',
    nombreempresa:'Nombre Empresa',
    representantelegal:'Representante Legal',
    email:'Email',
    user:'Usuario',
    password:'Contrase&ntilde;a',
    confirmpassword:'Confirmar Contrase&ntilde;a',
    invalidpassword:'Contrase&ntilde;a Invalida - Debe tener minimo 10 caracteres alfanumerica',
    invalidemail:'El email ingresado no es valido',
    theuserpass:'El usuario/contrase&ntilde;a ha sido enviado a: ',
    passmatch:'La contrase&ntilde;a no coincide',
    registro:'Registrar',
    invalidcaptcha:'Respuesta del captcha invalida',
    erroremail:'Debe ingresar el email',
    errorreplegal:'Debe ingresar el representante legal',
    errorcompany:'Debe ingresar el nombre del negocio/empresa',
    errornit:'Debe ingresar el registro del nit de la empresa/negocio',
    errornotuser:'Debe ingresar el usuario',
    usuarioregistrado:'El usuario ya se encuentra registrado',
    passwnocoincide:'El password no coincide',
    emailregistrado:'El email ya se encuentra registrado por favor <a href=\'ilogin.html\'><i><b>ingrese</b></i></a>',
    errornitd: 'El nit que esta intentando usar ya se encuentra registrado por favor <a href=\'ilogin.html\'><i><b>ingrese</b></i></a>',
    errorcompany: 'La empresa que esta intentando usar ya se encuentra registrada por favor <a href=\'ilogin.html\'><i><b>ingrese</b></i></a>',
    passnomeet:'El password debe coincidir y tener minimo 10 caracteres',
    aceptoterminos:'Acepto los terminos y condiciones de uso',
    terminos:'Los datos aqui suministrados no seran compartidos ni vendidos a nadie por ninguna raz&oacute;n, &uacute;nicamente ser&aacute;n usados para el proceso de registro y para la ultilizaci&oacute;n de la plataforma Minghos, tambi&eacute;n es posible que sean usados para enviar comunicaciones de forma espor&aacute;dica a todos los usuarios de la plataforma'
}

const lang_en={
    titulo:'Minghos',
    ingreso:'Login',
    olvideusuario:'Forgot User/Password',
    nuevoregistro:'New Record',
    nit:'Nit',
    nombreempresa:'Company Name',
    representantelegal:'Legal Representative',
    email:'Email',
    user:'User',
    password:'Password',
    confirmpassword:'Confirm Password',
    invalidpassword:'Invalid Password - Should have minimun10 characters alphabetic and numeric',
    invalidemail:'The email is invalid',
    theuserpass:'The user/password has been sent to: ',
    passmatch:'The password do not match',
    registro:'Sign up',
    invalidcaptcha:'Invalid captcha',
    erroremail:'Should insert the email',
    errorreplegal:'Should insert the representative',
    errorcompany:'Should insert the company name',
    errornit:'Should insert the IRS comany number',
    errornotuser:'Should insert the user',
    usuarioregistrado:'The user is already taken',
    passwnocoincide:'The password does not match',
    emailregistrado:'Email already registered please <a href=\'ilogin.html\'><i><b>login</b></i></a>',
    errornitd: 'The nit value that you are trying to use is already registered please <a href=\'ilogin.html\'><i><b>login</b></i></a>',
    errorcompany: 'The company name you are trying to use is already registered please login <a href=\'ilogin.html\'><i><b>login</b></i></a>',
    passnomeet:'The password minimum lenght is 10 characters',
    aceptoterminos:'Accept terms and conditions',
    terminos:'The data provided here, will not be shared or sold to anyone for any reason, it will be only used for the registration process and for the use of the Minghos platform, It is also possible that they are used to send communications sporadically to all users of the platform'
}

const lang_fr={
    titulo:'Minghos',
    ingreso:'S\'identifier',
    olvideusuario:'Réinitialiser l\'utilisateur / mot de passe',
    nuevoregistro:'Nouvelle inscription',
    nit:'Nit',
    nombreempresa:'Nom de la compagnie',
    representantelegal:'Représentant légal',
    email:'Email',
    user:'Utilisateur',
    password:'Mot de passe',
    confirmpassword:'Confirmer mot de passe',
    invalidpassword:'le mot de passe doit contenir au moins 10 caractères alphabétiques et numériques',
    invalidemail:'L\'email n\'est pas valide',
    theuserpass:'L\'utilisateur / mot de passe a été envoyé à',
    passmatch:'Le mot de passe ne correspond pas ',
    registro:'S\ Inscrire',
    invalidcaptcha:'Réponse captcha non valide',
    aceptoterminos:'Je accepte les conditions générales de utilisation',
    terminos:'Les données fournies ici ne seront ni partagées ni vendues à quiconque pour quelque raison que ce soit, elles ne seront utilisées que pour le processus de inscription et pour la utilisation de la plateforme Minghos, Il est également possible que\'ils soient utilisés pour envoyer des communications sporadiquement à tous les utilisateurs de la plateforme'
}

const lang_pr={
    titulo:'Minghos',
    ingreso:'Login',
    olvideusuario:'Esqueceu o nome de usuário / senha',
    nuevoregistro:'Novo registro',
    nit:'Nit',
    nombreempresa:'Razão social',
    representantelegal:'Representante legal',
    email:'Correio eletrônico',
    user:'Do utilizador',
    password:'Senha',
    confirmpassword:'Confirmar Senha',
    invalidpassword:'Senha inválida - deve ter no mínimo 10 caracteres alfabéticos e numéricos',
    invalidemail:'o email é inválido',
    theuserpass:'O usuário / senha foi enviado para',
    passmatch:'A senha não corresponde',
    registro:'inscrever-se',
    invalidcaptcha:'Resposta de captcha inválida',
    aceptoterminos:'Eu aceito os termos e condições de uso',
    terminos:'Os dados aqui disponibilizados não serão partilhados ou vendidos a ninguém por qualquer motivo, apenas serão utilizados para o processo de registo e para utilização da plataforma Minghos, Também é possível que sejam utilizados para enviar comunicações esporadicamente a todos os usuários da plataforma'
}

var body = `
	  <div><a href='ilogin.html'>{{ingreso}}</a></div>
	  <div><a href='recover.html'>{{olvideusuario}}</a></div>
	</br>
	<div>
         <h3>{{nuevoregistro}}:</h3>
	</div>
	<div class='formfield'>
	<input name='nit' type='number' id='nit' style='padding:10px' required placeholder='{{nit}}'/>
	</div>
	<div class='formfield'>
	<input name='company' type='text' id='company' style='padding:10px' required  placeholder='{{nombreempresa}}' />
        </div>
	<div class='formfield'>
	<input name='representantelegal' type='text' id='representantelegal' style='padding:10px' required   placeholder='{{representantelegal}}'/>
        </div>
	<div class='formfield'>
	<input name='email' type='email' id='email'  style='padding:10px' required  placeholder='{{email}}'/>
        </div>
	<div class='formfield'>
	<input name='usuario' type='text' id='usuario'  style='padding:10px' required  placeholder='{{user}}'/>
        </div>
	<div class='formfield'>
	<input name='password0' type='password' id='password0' style='padding:10px' required  placeholder='{{password}}'/>
        </div>
	<div class='formfield'>
	<input name='password1' type='password' id='password1' style='padding:10px' required  placeholder='{{confirmpassword}}'/>
        </div>
	<div class='formfield'>
        <a href='#' onclick='alert("{{terminos}}")'>{{aceptoterminos}}:</a><input name='aceptoterms' type='checkbox' id='aceptoterms' style='padding:10px' required/>
        </div>`;

var url_string = window.location;
var url = new URL(url_string);
var v = url.searchParams.get("v");
var vemail = url.searchParams.get("vemail");
var semail = url.searchParams.get("semail");
var sm = url.searchParams.get("m");

var debugmode = true;
var ipuser;

if(v){
    f.g('login2').innerHTML = f.rTran('<br/>{{invalidpassword}}');
}
if(vemail){
    f.g('login2').innerHTML = f.rTran('<br/>{{invalidemail}}'); 
}
if(semail){
    f.g('login2').innerHTML = f.rTran('<br/>{{theuserpass}}') + semail; 
}
if(sm){
    f.g('login2').innerHTML = f.rTran(`<br/>${sm}`);
}

