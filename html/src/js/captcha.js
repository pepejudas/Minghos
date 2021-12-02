// Simple captcha aplicacion for validation before sending email and password by user
// Should contain mathematical operations in witch the response could be difficult to calculate by a machine and easy for human being
//captcha array
const fi = {
    //default languaje spanish
    p:function(str) {
	return Function(`'use strict'; return (${str})`)()
    }, 
    //translation function
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
		
		try{
		    var pal = texto.substring(array1[i].index+2,array2[i].index);
		    
		    try{
			var valprop = fi.p('lang_'+dL+'.'+pal);
		    }catch(e){
			if(i==0){
			    f.c('Error loading translation:' + pal);
			}
		    }
		    if(i==0){
			texto = texto.replace('{{'+pal+'}}',valprop);
		    }else{
			texto = fi.rTran(texto);
		    }
		}catch(e){
		    fi.c(f.lE('d'));
		}
            }
        }catch(e){
            fi.c(e);
        }finally{
            return texto;
        }
    },
    c:function(txt){
	console.log(txt)
    },
    errorPass:'',
    checkForm:function(){
	inputtxt = document.getElementById('password0')
	inputtxt1 = document.getElementById('password1')
	
	var passw=  /^[A-Za-z]\w{10,50}$/;

	if(inputtxt.value == inputtxt1.value){
	    if(inputtxt.value.match(passw)){
		return true;
	    }else{
		fi.errorPass = fi.rTran("{{invalidpassword}}")
		return false;
	    }
	}else{
	    fi.errorPass = fi.rTran("{{passmatch}}")
	    return false;
	}
    }
}
//catpcha questions and answers
const cA = {
    //debug mode
    d:false,
    //default languaje questions english
    q_en:[
	'The result of two plus 25 is:',
	'How much is 8 multiplied by ten:',
	'The result of three plus 21 is:',
	'The root square of 25 is:',
	'How much is 32 minus eigthteen:',
	'The result of 24 minus twelve is:',
	'The result of 16 plus 33 is:',
	'45 times two is:',
	'Square root of 81 is:',
	'The result of 31 minus 22 is:',
	'The result of 2 plus 4 minus 6 is:',
	'How much advance a worm if goes up 3 and get back 1 at a time:',
	'The result of 11 plus 13 minus 12 is:',
	'The result of three plus eight minus 1 is:',
	'The result of two plus nine minus 3 is:',
	'Square root of twenty-five plus seven',
	'How much is twelve multiplied by 12:',
	'One means by 12 equals to:',
	'Forty five diveded by 5:',
	'Three means by 2 equals to:',
	'Common minimum multiple between three and six',
	'Common minimum multiple between three and six and two',
	'Common minimum multiple between 2,  four and one',
	'Common minimum multiple between one, seven and eleven',
	'Common minimum multiple between first three prime numbers',
	'Common minimum multiple between  2 and eleven',
	'The result of (2 * 4) + 2 ',
	'How much is 8 minus seven',
	'8 / four is equal to ',
	'8 + (four * 3)',
	'the result of 22 diveded by 11',
	'Common minimum multiple between on three and two',
	'37 multiplied by 3',
	'1422 plus 35',
	'28 divided 7',
	'21 plus 1268',
	'16 minus 11',
	'Common minimum multiple between two, 4 and 8',
	'Common minimum multiple between three and 4',
	'(4 / 2) + 6',
	'90  * (1 + 3)',
	'How much advance a worm if goes up 5 and goes back 4',
	'How much advance a worm if goes up 6 and goes back 1',
	'627 * (-1 + 4)'
    ],
    //spanish languaje questions
    q_es:[
	'El resultado de dos mas 25 es:',
	'Cuanto es 8 multiplicado por diez:',
	'El resultado de tres mas 21 es:',
	'La raiz cuadrada de 25 es:',
	'Cuanto es 32 menos dieciocho',
	'El resultado de 24 menos doce es:',
	'El resultado de 16 mas 33 es:',
	'45 veces dos es:',
	'Raiz cuadrada de 81 es:',
	'El resultado de 31 menos 22 es:',
	'El resultado de 2 mas 4 menos 6 es:',
	'Cuanto avanza un gusano si sube 3 y retrocede 1 por vez:',
	'El resultado de 11 mas 13 menos 12 es:',
	'El resultado de tres mas ocho menos 1 es:',
	'El resultado de dos mas nueve menos 3 es:',
	'La raiz cuadrada de veinticinco mas 7',
	'Cuanto es doce por 12',
	'Un medio por 12 es igual a:',
	'Cuarenta y cinco dividido 5:',
	'3 medios por 2 es igual a:',
	'Minimo comun multiplo entre tres y seis',
	'Minimo comun multiplo entre tres y seis y dos',
	'Minimo comun multiplo entre 2 cuatro y uno',
	'Minimo comun multiplo entre uno, siete y once',
	'Minimo comun multiplo entre los tres primeros numeros primos',
	'Minimo comun multiplo entre 2 y once',
	'El resultado de (2 * 4) + 2 ',
	'Cuanto es 8 menos siete',
	'8 / cuatro es igual a ',
	'8 + (cuatro * 3)',
	'el resultado de 22 dividido 11',
	'Minimo comun multiplo entre uno, tres y dos',
	'37 multiplicado por 3',
	'1422 mas 35',
	'28 dividido 7',
	'21 mas 1268',
	'16 menos 11',
	'Minimo comun multiplo entre dos, 4 y 8',
	'Minimo comun multiplo entre tres y 4',
	'(4 / 2) + 6',
	'90  * (1 + 3)',
	'cuanto avanza un gusano si sube 5 y retrocede 4',
	'cuanto avanza un gusano si sibe 6 y retrocede 1',
	'627 * (-1 + 4)'
    ],
    //portuguese languaje questions
    q_pr:[
	'O resultado de dois mais 25 é:',
        'O que é 8 multiplicado por dez:',
        'O resultado de três mais 21 é:',
        'A raiz quadrada de 25 é:',
        'O que é 32 menos 18:', 
        'O resultado de 24 menos 12 é:',
        'O resultado de 16 mais 33 é:',
        '45 vezes dois é:',
        'A raiz quadrada de 81 é:',
        'O resultado de 31 menos 22 é:',
        'O resultado de 2 mais 4 menos 6 é:',
        'Quanto um verme avança se subir 3 e voltar 1 de cada vez:',
        'O resultado de 11 mais 13 menos 12 é:',
        'O resultado de três mais oito menos um é:',
        'O resultado de dois mais nove menos três é:',
        'A raiz quadrada de vinte e cinco mais sete',
        'O que é doze por doze',
        'Uma meia vez 12 é igual a:',
        'Quarenta e cinco divididos por cinco:',
        '3 meios por 2 iguais:',
        'Multiplo mínimo comum entre três e seis',
        'Multiplo mínimo comum entre três e seis e dois',
        'Multiplo mínimo comum entre 2 quatro e um',
        'Multiplo mínimo comum entre um, sete e onze',
        'Multiplo mínimo comum entre os três primeiros números primos:',
	'Mínimo múltiplo comum entre 2 e onze',
        'O resultado de (2 * 4) + 2',
        'Quanto é 8 menos sete',
        '8 / quatro é igual a',
        '8 + (quatro * 3)',
        'o resultado de 22 dividido por 11',
        'Mínimo múltiplo comum entre um, três e dois',
        '37 multiplicado por 3 ',
        '1422 mais 35',
        '28 dividido 7 ',
        '21 mais 1268 ',
        '16 menos 11 ',
        'Mínimo múltiplo comum entre dois, 4 e 8',
        'Mínimo múltiplo comum entre três e 4',
        '(4/2) + 6',
        '90 * (1 + 3) ',
        'quanto um worm avança se sobe 5 e volta 4',
        'quanto um worm avança se o sibe 6 e volta 1',
	'627 * (-1 + 4)'
    ],
    //french languaje questions
    q_fr:[
	'Le résultat de deux plus 25 est :',
        'Ce qui est 8 multiplié par 10 :',
        'Le résultat de trois plus 21 est :',
	'La racine carrée de 25 est :',
        'Ce qui fait 32 moins 18:',
        'Le résultat de 24 moins 12 est :',
        'Le résultat de 16 plus 33 est :',
        '45 fois deux est :',
        'La racine carrée de 81 est :',
        'Le résultat de 31 moins 22 est :',
        'Le résultat de 2 plus 4 moins 6 est :',
        'Combien un ver avance s\'il monte de 3 et recule de 1 à la fois :',
        'Le résultat de 11 plus 13 moins 12 est :',
        'Le résultat de trois plus huit moins un est :',
        'Le résultat de deux plus neuf moins trois est :',
        'La racine carrée de vingt-cinq plus sept',
        'Ce qui est douze par douze',
        'Une demi-fois 12 égale :',
        'Quarante-cinq divisé par cinq :',
        '3 signifie par 2 égale :',
        'Nombre minimum de points communs entre trois et six',
        'Nombre minimum commun de multiplicateurs entre trois et six et deux',
        'Nombre minimum de points communs entre 2, 4 et 1',
        'Nombre minimum de points communs entre un, sept et onze',
        'Nombre commun minimum entre les trois premiers nombres premiers:',
	'Multiple minimum commun entre 2 et onze',
        'Le résultat de (2 * 4) + 2',
        'Qu\'est-ce que 8 moins sept',
        '8 / quatre est égal à',
        '8 + (quatre * 3)',
        'le résultat de 22 divisé par 11',
        'Multiple minimum commun entre un, trois et deux ',
        '37 multiplié par 3 ',
        '1422 plus 35',
        '28 divisé 7 ',
        '21 plus 1268',
        '16 moins 11',
        'Multiple minimum commun entre deux, 4 et 8',
        'Multiple minimum commun entre trois et 4',
        '(4/2) + 6',
        '90 * (1 + 3)',
        'combien un ver avance s\'il monte 5 et recule 4',
        'combien un ver avance s\'il sibe 6 et retourne 1',
	'627 * (-1 + 4)'
    ],
    //numeric answers to questions in the same order
    a:[
	'27',
	'80',
	'24',
	'5',
	'14',
	'12',
	'49',
	'90',
	'9',
	'9',
	'0',
	'2',
	'12',
	'10',
	'8',
	'12',
	'144',
	'6',
	'9',
	'3',
	'6',
	'6',
	'4',
	'77',
	'30',
	'22',
	'10',
	'1',
	'2',
	'20',
	'2',
	'6',
	'111',
	'1457',
	'4',
	'1289',
	'5',
	'8',
	'12',
	'8',
	'360',
	'1',
	'5',
	'1881'
    ],
    //get random number+
    gRN:function(min, max){
	return Math.floor(Math.random()*(max-min+1)+min);
    },
    p:function(str) {
	return Function(`'use strict'; return (${str})`)()
    },
    //get random question
    gRQ:function(dL1){
	var qe = cA.p(`cA.q_${dL1}`)
	
	var nmp = qe.length - 1;
	if(cA.d){
	    console.log(nmp);
	}
	var np = this.gRN(0, nmp);
	if(cA.d){
	    console.log(np);
	}

	return {q:qe[np],a:cA.a[np]};
    }
}
