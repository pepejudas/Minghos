//library to create the odontology panel
class Muela{
    x=0;
    y=0;
    ctx = null;
    
    constructor(x, y, ctx, sqs){
	this.x=x;
	this.y=y;
	this.ctx=ctx;

	ctx.beginPath();
	ctx.strokeStyle = '#111';
	ctx.rect(x, y, sqs, sqs);
	ctx.rect(x, y-15, sqs, sqs);
	ctx.rect(x, y-30, sqs, sqs);
	ctx.rect(x-15, y, sqs, sqs);
	ctx.rect(x+15, y, sqs, sqs);
	ctx.rect(x, y+15, sqs, sqs);
	ctx.rect(x, y+30, sqs, sqs);
	ctx.stroke();
    }
}

const o = {
    //image odontogram
    i:'oinicial.png',
    //square size
    sqs:15,
    squares:[],
    drawLinesH:function(ctx1){
        var x = 10;
        var y = 315;
        var x1= ctx1.canvas.width-2;

        ctx1.beginPath();
        ctx1.moveTo(0, y);
        ctx1.lineTo(x1, y);
        ctx1.strokeStyle = '#ccc';
        ctx1.stroke();
    },
    drawLinesV:function(ctx1){
        
        var x = 10;
        var y = ctx1.canvas.height-2;
        var x1= 520;
        
        ctx1.beginPath();
        ctx1.moveTo(x1, 0);
        ctx1.lineTo(x1, y);
        ctx1.strokeStyle = '#ccc';
        ctx1.stroke();
    },
    // Get mouse position within canvas
    mouseClick:function(e) {
	f.c(e.offsetX);
	f.c(e.offsetY);
    },
    mouseClick2:function(e){
	f.c('ha hecho click en el canvas');
	f.c(e);
    },
    oC:'odontocanvas',
    cD:'canvasdiv',
    rOpt:function(candiv){
	let colname = 'd_odoptions';
	f.r({url:'loadcollection', params:`collection=${colname}`})
            .then(r => {
                try{
                    var data = JSON.parse(r.target.responseText);

		    //let sel = "<select>";
		    var sel = document.getElementById('odoption');
		    
		    
		    // create text node to add to option element (opt)

		    data.forEach(function(item, index){

			// create new option element
			let opt = document.createElement('option');
		    
			opt.appendChild(document.createTextNode(f.rTran(item.label)) );
			// set value property of opt
			opt.value = item.name;
			opt.dataset.color = item.color;
		    
			// add opt to end of select box (sel)
			sel.appendChild(opt);
			
		    });

		}catch(e){
		    f.c(e);
		}
	    });
    },
    grid_c : 'grid-container',
    //array para guardar el conjunto de eventos de la creacion del odontograma
    odoArr:[],
    odoAdd:function(odocentro, odops, odop, color){

	let x1=0;
	let y1=0;
	
	let xspl = odocentro.split('_');
	
	x1=parseInt(xspl[0]);
	y1=parseInt(xspl[1]);

	base_img = new Image();
	
	y1-=30;
	switch(odops){
	case "A":
	    //y1+=-30;
	    base_img.src = `images/a_${color}.png`;
	    break;
	case "B":
	    base_img.src = `images/b_${color}.png`;
	    //y1+=-25;
	    break;
	case "C":
	    base_img.src = `images/c_${color}.png`;
	    //y1+=0;
	    break;
	case "D":
	    base_img.src = `images/d_${color}.png`;
	    //y1+=15;
	    break;
	case "E":
	    base_img.src = `images/e_${color}.png`;
	    //y1+=30;
	    break;
	case "F":
	    base_img.src = `images/f_${color}.png`;
	    //x1+=-15;
	    break;
	case "G":
	    base_img.src = `images/g_${color}.png`;
	    //x1+=15;
	    break;
	}

	base_img.onload = function(){
	    o.ctx.drawImage(this, x1, y1);
	}
	
	f.c(`ha hecho click en agregar ${odop}, ${odocentro} ${odops} ${color}`);
	f.c(color);
    },
    lOdo:function(){

	try{
	    //o.odoArr = data;
	    let data = o.datArr[o.curOdo].odontogram;
	    o.odoArr = data;
	    f.g('odontoid').value = o.datArr[o.curOdo]._id;
	    f.g('fechaodontoid').value = o.datArr[o.curOdo].fecha;
	    
	    data.forEach(function(item, index){
		
		//same select odoption
		let odop = item.odop;
		let odocol = item.odocol;
		let color = item.color;
		//diente
		let odocentro = item.odocentro;
		//superficie
		let odops = item.odops;
		
		//let odojson = {odop:odop, odocol:odocol, color:color, odocentro:odocentro, odops:odops}
		o.odoAdd(odocentro, odops, odop, color);
	    })
	}catch(e){
	    f.c(e);
	}
    },
    curOdo:0,
    lD:function(){
	f.c('se ejecuta el evento ld');
	
	f.g(o.grid_c).innerHTML += f.rTran(`<div id="${o.cD}"><input type="text" id="odontoid" disabled="disabled"></br><input type="text" id="fechaodontoid" disabled="disabled"></br><select id='odoption'></select></br><select id='diente'><option value='0_100'>18</option><option value='65_100'>17</option><option value='130_100'>16</option><option value='195_100'>15</option><option value='260_100'>14</option><option value='325_100'>13</option><option value='390_100'>12</option><option value='455_100' selected='selected'>11</option><option value='520_100'>21</option><option value='585_100'>22</option><option value='650_100'>23</option><option value='715_100'>24</option><option value='780_100'>25</option><option value='845_100'>26</option><option value='910_100'>27</option><option value='975_100'>28</option><option value='195_230'>55</option><option value='260_230'>54</option><option value='325_230'>53</option><option value='390_230'>52</option><option value='455_230'>51</option><option value='520_230'>61</option><option value='585_230'>62</option><option value='650_230'>63</option><option value='715_230'>64</option><option value='780_230'>65</option><option value='195_360'>85</option><option value='260_360'>84</option><option value='325_360'>83</option><option value='390_360'>82</option><option value='455_360'>81</option><option value='520_360'>71</option><option value='585_360'>72</option><option value='650_360'>73</option><option value='715_360'>74</option><option value='780_360'>75</option><option value='0_490'>48</option><option value='65_490'>47</option><option value='130_490'>46</option><option value='195_490'>45</option><option value='260_490'>44</option><option value='325_490'>43</option><option value='390_490'>42</option><option value='455_490'>41</option><option value='520_490'>31</option><option value='585_490'>32</option><option value='650_490'>33</option><option value='715_490'>34</option><option value='780_490'>35</option><option value='845_490'>36</option><option value='910_490'>37</option><option value='975_490'>38</option></select></br><select id='superficie'><option>A</option><option>B</option><option selected="selected">C</option><option>D</option><option>E</option><option>F</option><option>G</option></select><br/><button id='agregarodo'>+</button><button id='eliminarodo'>-</button><button id='newodo'>N</button><button id='prevodo'><</button><button id='nextodo'>></button><button id='saveodo'>S</button><button id='loadodo'>L</button></div><canvas id="odontocanvas" width="1100" height="600"></canvas>`);

	f.g('newodo').addEventListener('click', function(){
	    f.g('odontoid').value = '';
	    f.g('fechaodontoid').value = '';
	    //o.lD();
	    o.odoArr= [];
	    o.DM();
	});

	f.g('searchbtn').addEventListener('click', function(){
	    f.g('newodo').click();
	    o.curOdo=0;
	    f.g('panelevolucion').innerHTML='';
	});

	f.g('II<').addEventListener('click', function(){
	    f.g('newodo').click();
	    o.curOdo=0;
	    f.g('panelevolucion').innerHTML='';
	});

	f.g('<<').addEventListener('click', function(){
	    f.g('newodo').click();
	    o.curOdo=0;
	    f.g('panelevolucion').innerHTML='';
	});

	f.g('>>').addEventListener('click', function(){
	    f.g('newodo').click();
	    o.curOdo=0;
	    f.g('panelevolucion').innerHTML='';
	});

	f.g('>II').addEventListener('click', function(){
	    f.g('newodo').click();
	    o.curOdo=0;
	    f.g('panelevolucion').innerHTML='';
	});

	f.g('>II*').addEventListener('click', function(){
	    f.g('newodo').click();
	    o.curOdo=0;
	    f.g('panelevolucion').innerHTML='';
	});
	
	f.g('eliminarodo').addEventListener('click', function(){
	    f.g('odoption').value = "B";
	    let odop = f.g('odoption').value;
	    let odocentro = f.g('diente').value;
	    let odops = f.g('superficie').value;
	    let odocol = f.g('odoption').selectedIndex;
	    let color = "blanco";
	    let odojson = {odop:odop, odocentro:odocentro, odops:odops, odocol:odocol, color:color};
	    o.odoArr.push(odojson);
	    o.odoAdd(odocentro, odops, odop, color);
	})

	f.g('nextodo').addEventListener('click', function(){
	    if(!!o.datArr){
		if(o.datArr.length-1 > o.curOdo){
		    o.curOdo += 1;
		    f.g('newodo').click();
		    o.lOdo();
		}else{
		    f.c('no hay mas items');
		}
		
		//f.g('loadodo').click()
	    }else{
		f.c('no se ha cargado el array');
	    }
	});

	f.g('prevodo').addEventListener('click', function(){
	    if(!!o.datArr){
		if(o.curOdo>0){
		    o.curOdo -=1;
		    f.g('newodo').click();
		    o.lOdo();
		}else{
		    f.c('no hay mas items');
		}
		//f.g('loadodo').click()
	    }else{
		f.c('no se ha cargado el array');
	    }
	});
	
	f.g('loadodo').addEventListener('click', function(){

	    f.g('newodo').click();
	    
	    let idodo = f.g('_id').value;
	    let sendjson = `{"table":"d_odontogram", "criterial":"id_odontology","value":"${idodo}"}`;

	    if(!!idodo){
		f.r({url:'ftsearch', params:sendjson})
		    .then(r => {
			try{
			    let data0 = JSON.parse(r.target.responseText);
			    o.datArr = data0;
			    //f.g('odontoid').value = o.datArr[o.curOdo]._id;
			    o.lOdo();
			    
			}catch(e){
			    f.c(e);
			}
		    });
	    }
	});
	
	//f.g('panelevolucion').innerHTML='';
	//f.g('panelevolucion').innerHTML='';
	
	f.g('saveodo').addEventListener('click', function(){

	    if(o.odoArr.length > 0){

		let idodo0 = f.g('odontoid').value;
		let idodo = f.g('_id').value;
		let colprinc = "d_odontogram";
		let stringodoarr = f.iArr(o.odoArr);
		var currentTime = new Date();
		let jsonString = `{"id_odontology":"${idodo}", "fecha":"${currentTime}", "odontogram":${stringodoarr}}`;
		
		jsonString=encodeURIComponent(jsonString);

		let sendjson = `{"_id":"${idodo0}","collection":"${colprinc}","jsonString":"${jsonString}"}`;
		f.c('jsonString print after esc');
		f.c(jsonString);

		f.r({url:'saveform', params:sendjson})
                    .then(r => {
			try{ 

			    var data = JSON.parse(r.target.responseText);
			    var sel = document.getElementById('odoption');
			    
			}catch(e){
			    f.c(e);
			}
		    });
	    }
	});					   
					   
	f.g('agregarodo').addEventListener('click', function(){
	    
	    let odop = f.g('odoption').value;
	    let odocentro = f.g('diente').value;
	    let odops = f.g('superficie').value;
	    let odocol = f.g('odoption').selectedIndex;
	    let color = f.g('odoption')[f.g('odoption').selectedIndex].getAttribute('data-color');
	    
	    let odojson = {odop:odop, odocentro:odocentro, odops:odops, odocol:odocol, color:color};

	    o.odoArr.push(odojson);

	    o.odoAdd(odocentro, odops, odop, color);
	});

	//add foto event listener
	f.g('foto').addEventListener('click', function(){
	    f.c('hizo click en la foto');
	});

	o.c = f.g(o.oC);
	o.ctx = o.c.getContext("2d");
	o.drawLinesH(o.ctx);
	o.drawLinesV(o.ctx)

	o.rOpt(o.grid_c);
	
	o.ctx.font = "25px RobotoCondensed-Light";
	o.ctx.fillText(f.rTran('{{odontograma}}'), 15, 40);

	//convenciones para poner en el grafico y editar el odontograma
	o.c.addEventListener('click', o.mouseClick);

	//panel para agregar cada evolucion de tratamiento
	f.g('{{evolucion}}').innerHTML += "<div id='panelevolucion'></div>";
	
	let evolucion = 0;

	f.g('agregaevolucion').addEventListener('click', function(){

	    f.c('hizo click en agregarevolucion');
	    let fechae = '';
	    let descripte = '';

	    try{
		o.datArr[evolucion].fechaevolucion!='' ? fechae = o.datArr[evolucion].fechaevolucion :'';

		o.datArr[evolucion].descripcionevolucion!=''? descripte = o.datArr[evolucion].descripcionevolucion:'';
		
	    }catch(e){
		
	    }

	    evolucion++;
	    
	    f.g('panelevolucion').innerHTML += f.rTran(`<div id='lineaevolucion_${evolucion}'><p class='psup'>{{evolucion}} ${evolucion}</p><p><input type='date' id='fechaevolucion_${evolucion}' class='formc' value='${fechae}'></p><p><textarea class='formc' rows='10' cols='10' id='descripcionevolucion_${evolucion}' placeholder='{{evolucion}}'>${descripte}</textarea></p><p><a href='#' onclick='f.g("lineaevolucion_${evolucion}").remove();'>X</a></p></div>`);
	    
	})

	f.g('cargaevolucion').addEventListener('click', function(){

	    f.c('hizo click en cargar evolucion');

	    let idodo = f.g('_id').value;
	    let sendjson = `{"table":"d_odontology_evolution", "criterial":"id_d_odontology","value":"${idodo}"}`;
	    
	    if(!!idodo){
		f.r({url:'ftsearch', params:sendjson})
		    .then(r => {
			try{
			    let data0 = JSON.parse(r.target.responseText);
			    o.datArr = data0;
			    //f.g('odontoid').value = o.datArr[o.curOdo]._id;
			    //o.lOdo();
			    o.datArr.forEach(function(){
				f.g('agregaevolucion').click();
				//f.c(item.fechaevolucion);
				//f.c(item.descripcionevolucion);
			    });
			    //f.g('agregaevolucion').click();
			    //f.c(o.datArr.length)
			}catch(e){
			    f.c(e);
			}
		    });
	    }
	});
    },
    clTab:function(){
	let cn = 'inner';
	f.gc(cn)[0].childNodes[0].click();
    },
    //dibujar muelas
    dM:function(){
	//linea de muelas superior adulto
	x = 0;
	y = 150;

	for(let j=1;j<=4;j++){
	    for(let i=1;i<17;i++){
		x += 65;
		
		if(j==1){
		    const m = new Muela(x, y, o.ctx, o.sqs);
		}
		
		if(j==2 || j==3){
		    if(i>3 && i<14){
			const m = new Muela(x, y, o.ctx, o.sqs);
		    }
		}

		if(j==4){
		    const m = new Muela(x, y, o.ctx, o.sqs);
		}
	    }
	    
	    x=0;
	    y+=125;
	}
    },
    creaASug:function(){
        try{
	    //este codigo debe ser reemplazado por el del frameworkm.js:1650
            const as0 = new AutoSug ('nodocumentopac', 'd_person', ['nombre', 'apellido', 'nodocumento', 'celular']);
	    const as1 = new AutoSug ('diagnosticoprincipal', 's_cie10', ['descripcion', 'nombre_capitulo', 'descripcion_cuatro']);
	    const as2 = new AutoSug ('diagnosticosecundario', 's_cie10', ['descripcion', 'nombre_capitulo', 'descripcion_cuatro']);
	    const as3 = new AutoSug ('diagnosticorelacionado', 's_cie10', ['descripcion', 'nombre_capitulo', 'descripcion_cuatro']);
        }catch(e){
            f.c(e);
        }
    },
    DM:function(){
	var c = f.g(o.oC) //document.querySelector("canvas"),
	var ctx = c.getContext("2d");

	//var img = new Image();   // Create new img element
	//img.src = '/images/muela.png'; // Set source path
	function make_base(){

	    base_image = new Image();
	    base_image.src = 'images/muela.png';

	    let yini = 70;
	    let xini = 0;

	    base_image.onload = function(){
		//imagen de sinopsis
		ctx.drawImage(base_image, 930, 270);
		
		for(let j=1;j<=4;j++){
		    for(let i=1;i<=16;i++){
			if(j==2 || j==3){
			    if(i>3 && i<14){
				ctx.drawImage(base_image, xini, yini);
			    }
			}else{
			    ctx.drawImage(base_image, xini, yini);
			}
			xini+=65;
		    }
		    yini+=130;
		    xini=0;
		}

		o.ctx.font = "13px RobotoCondensed-Light";
		
		ctx.fillText("A", 958, 285);
		ctx.fillText("B", 958, 297);
		ctx.fillText("C", 958, 313);
		ctx.fillText("D", 958, 330);
		ctx.fillText("E", 958, 338);
		ctx.fillText("F", 940, 313);
		ctx.fillText("G", 972,313);
	    }
	}

	make_base();
	
	o.ctx.font = "15px RobotoCondensed-Light";

	//textos de numeracion de odontograma
	o.ctx.fillText("11", 480,70);
	o.ctx.fillText("18", 25,70);
	o.ctx.fillText("21", 545,70);
	o.ctx.fillText("28", 995,70);

	o.ctx.fillText("51", 480, 200);
	o.ctx.fillText("55", 220, 200);
	o.ctx.fillText("61", 545, 200);
	o.ctx.fillText("65", 800, 200);

	o.ctx.fillText("81", 480, 330);
	o.ctx.fillText("85", 220, 330);
	o.ctx.fillText("71", 545, 330);
	o.ctx.fillText("75", 800, 330);

	o.ctx.fillText("41", 480, 460);
	o.ctx.fillText("48", 25, 460);
	o.ctx.fillText("31", 545, 460);
	o.ctx.fillText("38", 995, 460);

    },
    init:function(){
	f.c('init() -> odontologia.js________________________________________________');
	o.lD();
	o.DM();
	o.clTab();
	o.creaASug();
    }
}
