/*
  @credits:
  Part of d.pentOp function was taken from stackoverflow.com, thanks...
  @description:
  This library was created to draw process inside a canvas, using items from algoritms and lines to draw the hole process
*/

const d = {
    //canvas object
    c:f.g("myCanvas"),
    //context object
    ctx:f.g("myCanvas").getContext("2d"),
    //array de etapas del proceso
    arrayEtp:new Array(),
    //array de puntos de conexion de cada etapa del proceso para pintar las lineas
    arrayPc:new Array(),
    isLink:false,
    //default x to draw the process every process should have definition of x
    x:150,
    //array to store process data
    datosProceso:null,
    //function to set font and canvas size
    setParam:function(){
	d.ctx.font = "13px Arial";
	d.ctx.canvas.width  = window.innerWidth-30;
	d.ctx.canvas.height = window.innerHeight-40;
    },
    //funcion concatenar responsables
    conResp:function(resp){
	var responsables = "";
	if (!!resp){
	    if(resp.length>0){
		for(var i=0;i<resp.length;i++){
		    if (i+1 == resp.length){
			responsables+=resp[i];
		    }else{
			responsables+=resp[i]+",";
		    }
		}
	    }
	}
	return responsables;
    },
    //funcion para dibujar cuadrado de operacion
    rectOp:function(etapas, x, y){

	f.c(etapas);
	
	var tipo = etapas.tipo;
	var operacion = etapas.nombre;
	var responsable = etapas.responsable;
	var orden = etapas.id;
	var link= etapas.link;
	
	var w=160;
	var h=60;
	var s=5;
	var sr = 160;
	var font = "10px Arial #000";
	var ctx1 = d.ctx;
	var yop = y + 20;
	var yr = y + 55;

	d.arrayPc.push({t:tipo,x:x,y:y,w:w,c:etapas.conexiones});

	if(tipo=="inspeccion"){
	    w = 60;
	}
	
	ctx1.beginPath();
	ctx1.rect(x, y, w, h);

	switch(tipo){
	case "actividad":
	    ctx1.fillStyle = '#ccc';
	    ctx1.fill();
	    break;
	case "inilim":
	case "finlim":
	    ctx1.fillStyle = '#9ff';
	    ctx1.fill();
	    break;
	case "decision":
	    ctx1.fillStyle = '#f9f';
	    ctx1.fill();
	    break;
	case "inspeccion":
	    ctx1.fillStyle = '#39f';
	    ctx1.fill();
	    break;
	default:
	    break;
	}

	ctx1.lineWidth = 1;
	ctx1.strokeStyle = 'black';
	ctx1.stroke();

	//line 1
	var yl1 = 45;

	ctx1.beginPath();

	if(tipo=="actividad"){    
	    ctx1.beginPath();
	    ctx1.moveTo(x, y+yl1);
	    ctx1.lineTo(x+w, y+yl1);
	    ctx1.stroke();
	}
	
	ctx1.font = font;
	ctx1.fillStyle = '#000';

	ctx1.font = font;
	ctx1.fillStyle = '#000';
	ctx1.fillText(d.conResp(responsable), x+s, y+55);

	ctx1.font = font;
	ctx1.fillStyle = '#000';
	ctx1.fillText(orden, x+5, y+12);

	d.drawLink(x+5, y+20,link, operacion,w);
	d.drawLink(x+140, y+20, 'http://xsitecompany.net', '(+)',w);
	
    },
    //function to draw diamond
    drawDiam:function(x, y, width, height){
	var ctx1 = d.ctx;
	ctx1.save();
	ctx1.beginPath();
	ctx1.moveTo(x, y);
	// top left edge
	ctx1.lineTo(x - width / 2, y + height / 2);
	// bottom left edge
	ctx1.lineTo(x, y + height);
	// bottom right edge
	ctx1.lineTo(x + width / 2, y + height / 2);
	// closing the path automatically creates
	// the top right edge
	ctx1.closePath();
	ctx1.fillStyle = "#f9f";
	ctx1.fill();
	ctx1.restore();
    },
    //function to draw diamond text and call to diamond function
    diamOp:function(etapas, x, y, operacion, responsable, orden, link){

    	var tipo = etapas.tipo;
	var operacion = etapas.nombre;
	var responsable = etapas.responsable;
	var orden = etapas.id;
	var link= etapas.link;
	let s;
	
	w=100;
	h=100;
	s=5;
	sr = 160;
	yop = y + 20;
	yr = y + 40;
	font = "10px Arial #000";
	var degrees = 45;
	var ctx1 = d.ctx;
	
	ctx1.beginPath();

	d.arrayPc.push({t:tipo,x:x,y:y,w:w,c:etapas.conexiones});

	d.drawDiam(x, y, w, h);

	ctx1.fillStyle = '#f9f';
	ctx1.fill();
	ctx1.lineWidth = 1;
	ctx1.strokeStyle = 'black';
	ctx1.stroke();

	//line 1
	var yl1 = 30;

	ctx1.font = font;
	ctx1.fillStyle = '#000';

	ctx1.font = font;
	ctx1.fillStyle = '#000';
	ctx1.fillText(d.conResp(responsable), x-30, yr+25);
	ctx1.font = font;
	ctx1.fillStyle = '#000';
	ctx1.fillText(orden, x, y+30);

	d.drawLink(x-30, y+40,link,operacion,w);

    },
    //function to draw hiperlink inside rect
    drawHyperLink:function() {
	canvas = f.g("myCanvas");
	// check if supported
	if (canvas.getCtx1) {
	    ctx = canvas.getCtx1("2d");
	    ctx.font = linkHeight + 'px sans-serif';
	    ctx.fillStyle = "#0000ff";
	    ctx.fillText(linkText, linkX, linkY);
	    linkWidth = ctx.measureText(linkText).width;

	    canvas.addEventListener("mousemove", CanvasMouseMove, false);
	    canvas.addEventListener("click", Link_click, false);
	    
	}
    },
    //function to set the mouse move event
    CanvasMouseMove:function(e) {
	var x, y;
	if (e.layerX || e.layerX == 0) { // for firefox
	    x = e.layerX;
	    y = e.layerY;
	}
	x -= canvas.offsetLeft;
	y -= canvas.offsetTop;

	if (x >= linkX && x <= (linkX + linkWidth) && y <= linkY && y >= (linkY - linkHeight)) {
	    document.body.style.cursor = "pointer";
	    isLink = true;
	}else{
	    
	    document.body.style.cursor = "";
	    isLink = false;
	    
	}
    },
    // Links
    links:new Array(), // Links information
    hoverLink:"", // Href of the link which cursor points at
    setFillStyle:function(){
	ctx.fillStyle = "#0000ff"; // Default blue link color
	ctx.font = "12px Arial #ccc"; // Monospace font for links
	ctx.textBaseline = "top"; // Makes left top point a start point for rendering text
    },
    // Draw the link
    drawLink:function(x,y,href,title,maxw){
	var linkTitle = title;
        linkX = x;
        linkY = y+10;
        linkWidth = d.ctx.measureText(linkTitle).width;
        linkHeight = parseInt(d.ctx.font); // Get lineheight out of fontsize

	var textArr = title.match(/.{1,30}/g);
	var yp = 12;
	
	for(var i=0;i<textArr.length;i++){
	// Draw the link
	    d.ctx.fillText(textArr[i], linkX, linkY,maxw);
	    linkY+=yp;
	}
	
	// Add mouse listeners
	d.c.addEventListener("mousemove", d.on_mousemove, false);
	d.c.addEventListener("click", d.on_click,false);

	// Add link params to array
	d.links.push(x + ";" + y + ";" + linkWidth + ";" + linkHeight + ";" + href);
    },

    // on mouse over function
    on_mousemove:function(ev) {
	var x, y;

	// Get the mouse position relative to the canvas element
	if (ev.layerX || ev.layerX == 0) { // For Firefox
            x = ev.layerX;
            y = ev.layerY;
	}

	// Link hover
	for (var i = d.links.length - 1; i >= 0; i--) {
            var params = new Array();

            // Get link params back from array
            params = d.links[i].split(";");

            var linkX = parseInt(params[0]),
		linkY = parseInt(params[1]),
		linkWidth = parseInt(params[2]),
		linkHeight = parseInt(params[3]),
		linkHref = params[4];

            // Check if cursor is in the link area
            if (x >= linkX && x <= (linkX + linkWidth) && y >= linkY && y <= (linkY + linkHeight)){
		document.body.style.cursor = "pointer";
		hoverLink = linkHref;
		break;
            }else{
		document.body.style.cursor = "";
		hoverLink = "";
            }
	};
    },

    // Link click
    on_click:function(e, t="_self") {
	if (hoverLink){
	    try{
		f.g(hoverLink).click();
	    }catch(e){
		window.open(hoverLink, t); // Use this to open in new tab
	    }
	    
	    f.c(hoverLink);
            //window.open(hoverLink); // Use this to open in new tab
	}
    },
    //function to draw horizontal lines all over the canvas
    drawLinesH:function(ctx1){

	var x = 10;
	var y = 0;
	var x1= ctx1.canvas.width-2;
	

	for(var i=0;i<150;i++){

	    y=i*20;
	    ctx1.beginPath();
	    ctx1.moveTo(0, y);
	    ctx1.lineTo(x1, y);
	    ctx1.strokeStyle = '#ccc';
	    ctx1.stroke();
	}
	
    },
    //function to draw vertical lines all over the canvas
    drawLinesV:function(ctx1){

	var x = 10;
	var y = ctx1.canvas.height-2;
	var x1= 0;

	for(var i=0;i<190;i++){
	    x1=i*20;
	    ctx1.beginPath();
	    ctx1.moveTo(x1, 0);
	    ctx1.lineTo(x1, y);
	    ctx1.strokeStyle = '#ccc';
	    ctx1.stroke();
	}
    },
    //funcion para agregar opciones al select de procesos usando las colecciones de d_process en mongoDB
    addOToS:function(data){

	f.c('entra al callback de addtoS');
	f.c(data);
	
	d.datosProceso = data;
	
	var numitems = data.length;

	for(var i =0;i<numitems;i++){
	    var opciontexto=data[i].proceso
	    var opcionvalue=data[i]._id;
	    // get reference to select element

    	    f.addOption(opciontexto, opcionvalue, 'procselector')
	}
    },
    //function to load process
    loadP:function(){
	    try{
		//loading translation on the divprocselector div
		//f.g('divprocselector').innerHTML = f.lT('selectorproceso');
		
		//loading process from mongodb
		f.r({url:'loadcollection', params:'collection=d_process'})
		    .then(r=> {
			let data = JSON.parse(r.target.responseText)
			d.addOToS(data)
		    })
		    .catch(e=> f.c(e))
		    
	    }catch(e){
		f.c(e);
	    }
    },
    //function to clear canvas
    clearCanv:function(canvas){
	var ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	//dibujar lineas horizontales
	d.drawLinesH(ctx);
	//dibujar lineas verticales
	d.drawLinesV(ctx);
    },
    //funcion para hacer los circulos de operacion
    circleOp:function(etapas, x, y){
	
	var tipo = etapas.tipo;
	var operacion = etapas.nombre;
	var responsable = etapas.responsable;
	var orden = etapas.id;
	var link= etapas.link;
	
	var w=40;
	var h=40;
	var s=5;
	var sr = 160;
	var font = "10px Arial #000";
	var ctx1 = d.ctx;
	var yop = y + 20;
	var yr = y + 55;

	d.arrayPc.push({t:tipo,x:x+w+h,y:y,w:w,c:etapas.conexiones});

	ctx1.beginPath();
	
	ctx1.arc(x+w+h, y, w, 0, 2 * Math.PI);

	ctx1.fillStyle = "blue";
	ctx1.fill();
	
	ctx1.lineWidth = 1;
	ctx1.strokeStyle = 'black';
	ctx1.stroke();

	//line 1
	var yl1 = 40;

	ctx1.beginPath();
	
	ctx1.font = font;
	ctx1.fillStyle = '#000';

	ctx1.font = font;
	ctx1.fillStyle = '#000';
	ctx1.fillText(d.conResp(responsable), x+w+10, y+15);

	ctx1.font = font;
	ctx1.fillStyle = '#000';
	ctx1.fillText(orden, x+w+10, y-15);

	d.drawLink(x+w+10, y-5,link, operacion,w);
    },

    //funcion para hacer los circulos de operacion
    transOpD:function(etapas, x, y){
	
	var tipo = etapas.tipo;
	var operacion = etapas.nombre;
	var responsable = etapas.responsable;
	var orden = etapas.id;
	var link= etapas.link;
	
	var w=40;
	var h=40;
	var s=5;
	var sr = 160;
	var font = "10px Arial #000";
	var ctx1 = d.ctx;
	var yop = y + 20;
	var yr = y + 55;

	d.arrayPc.push({t:tipo,x:x+w+h,y:y,w:w,c:etapas.conexiones});

	ctx1.beginPath();

	ctx1.moveTo(x+20, y);
	ctx1.lineTo(x+20, y+40);
	ctx1.stroke();
	
	ctx1.moveTo(x+20, y);
	ctx1.lineTo(x+20+70, y);
	ctx1.stroke();

	ctx1.moveTo(x+20, y+40);
	ctx1.lineTo(x+20+70, y+40);
	ctx1.stroke();

	ctx1.moveTo(x+20+70, y);
	ctx1.lineTo(x+20+70, y-10);
	ctx1.stroke();

	ctx1.moveTo(x+20+70, y+40);
	ctx1.lineTo(x+20+70, y+50);
	ctx1.stroke();

	ctx1.moveTo(x+20+70, y-10);
	ctx1.lineTo(x+20+70+40,y+20);
	ctx1.stroke();

	ctx1.moveTo(x+20+70, y+50);
	ctx1.lineTo(x+20+70+40, y+20);
	ctx1.stroke();
	
	ctx1.fillStyle = "blue";
	ctx1.fill();
	
	ctx1.lineWidth = 1;
	ctx1.strokeStyle = 'black';
	ctx1.stroke();

	//line 1
	var yl1 = 40;

	ctx1.beginPath();
	
	ctx1.font = font;
	ctx1.fillStyle = '#000';

	ctx1.font = font;
	ctx1.fillStyle = '#000';
	ctx1.fillText(d.conResp(responsable), x+25, y+35);

	ctx1.font = font;
	ctx1.fillStyle = '#000';
	ctx1.fillText(orden, x+25, y+10);

	d.drawLink(x+25, y+15,link, operacion,w);
    },
    
    //funcion para hacer la figura de almacenamiento
    almOp:function(etapas, x, y){
	
	var tipo = etapas.tipo;
	var operacion = etapas.nombre;
	var responsable = etapas.responsable;
	var orden = etapas.id;
	var link= etapas.link;
	
	var w=40;
	var h=40;
	var s=5;
	var sr = 160;
	var font = "10px Arial #000";
	var ctx1 = d.ctx;
	var yop = y + 20;
	var yr = y + 55;

	d.arrayPc.push({t:tipo,x:x+w+h,y:y,w:w,c:etapas.conexiones});

	ctx1.beginPath();

	ctx1.moveTo(x+20, y);
	ctx1.lineTo(x+40+60+20, y);
	ctx1.stroke();

	ctx1.moveTo(x+20, y);
	ctx1.lineTo(x+50+20, y+60);
	ctx1.stroke();

	ctx1.moveTo(x+40+60+20, y);
	ctx1.lineTo(x+50+20, y+60);
	ctx1.stroke();

	ctx1.fillStyle = "blue";
	ctx1.fill();
	
	ctx1.lineWidth = 1;
	ctx1.strokeStyle = 'black';
	ctx1.stroke();

	//line 1
	var yl1 = 40;

	ctx1.beginPath();
	
	ctx1.font = font;
	ctx1.fillStyle = '#000';

	ctx1.font = font;
	ctx1.fillStyle = '#000';
	ctx1.fillText(d.conResp(responsable), x+50, y+35);

	ctx1.font = font;
	ctx1.fillStyle = '#000';
	ctx1.fillText(orden, x+35, y+12);

	d.drawLink(x+45, y+15,link, operacion,w);
    },
    //funcion para hacer los circulos de operacion
    transOpI:function(etapas, x, y){
	
	var tipo = etapas.tipo;
	var operacion = etapas.nombre;
	var responsable = etapas.responsable;
	var orden = etapas.id;
	var link= etapas.link;
	
	var w=40;
	var h=40;
	var s=5;
	var sr = 160;
	var font = "10px Arial #000";
	var ctx1 = d.ctx;
	var yop = y + 20;
	var yr = y + 55;

	d.arrayPc.push({t:tipo,x:x+w+h,y:y,w:w,c:etapas.conexiones});

	ctx1.beginPath();

	ctx1.moveTo(x+20+70+40, y);
	ctx1.lineTo(x+20+70+40, y+40);
	ctx1.stroke();
	
	ctx1.moveTo(x+20+70+40, y);
	ctx1.lineTo(x+20+40, y);
	ctx1.stroke();

	ctx1.moveTo(x+20+70+40, y+40);
	ctx1.lineTo(x+20+40, y+40);
	ctx1.stroke();

	ctx1.moveTo(x+20+40, y);
	ctx1.lineTo(x+20+40, y-10);
	ctx1.stroke();

	ctx1.moveTo(x+20+40, y+40);
	ctx1.lineTo(x+20+40, y+50);
	ctx1.stroke();

	ctx1.moveTo(x+20+40, y-10);
	ctx1.lineTo(x+20,y+20);
	ctx1.stroke();

	ctx1.moveTo(x+20+40, y+50);
	ctx1.lineTo(x+20, y+20);
	ctx1.stroke();
	
	ctx1.fillStyle = "blue";
	ctx1.fill();
	
	ctx1.lineWidth = 1;
	ctx1.strokeStyle = 'black';
	ctx1.stroke();

	//line 1
	var yl1 = 40;

	ctx1.beginPath();
	
	ctx1.font = font;
	ctx1.fillStyle = '#000';

	ctx1.font = font;
	ctx1.fillStyle = '#000';
	ctx1.fillText(d.conResp(responsable), x+50, y+35);

	ctx1.font = font;
	ctx1.fillStyle = '#000';
	ctx1.fillText(orden, x+50, y+10);

	d.drawLink(x+50, y+15,link, operacion,w);
    },
    //funcion para hacer la d de espera
    espOp:function(etapas, x, y){
	
	var tipo = etapas.tipo;
	var operacion = etapas.nombre;
	var responsable = etapas.responsable;
	var orden = etapas.id;
	var link= etapas.link;
	
	var w=40;
	var h=40;
	var s=5;
	var sr = 160;
	var font = "10px Arial #000";
	var ctx1 = d.ctx;
	var yop = y + 20;
	var yr = y + 55;

	d.arrayPc.push({t:tipo,x:x+w+h,y:y,w:w,c:etapas.conexiones});

	ctx1.beginPath();

	//ctx1.arc(x+w+h, y, w, -Math.PI/2, Math.PI/2);
	ctx1.ellipse(x+w+10, yop, 60, 40, 0, -Math.PI/2, Math.PI/2);
	
	ctx1.moveTo(x+10+40, y-20);
	ctx1.lineTo(x+10+40, y+60);
	ctx1.stroke();
	
	ctx1.fillStyle = "blue";
	ctx1.fill();
	
	ctx1.lineWidth = 1;
	ctx1.strokeStyle = 'black';
	ctx1.stroke();

	//line 1
	var yl1 = 40;

	ctx1.beginPath();
	
	ctx1.font = font;
	ctx1.fillStyle = '#000';

	ctx1.font = font;
	ctx1.fillStyle = '#000';
	ctx1.fillText(d.conResp(responsable), x+55, y+35);

	ctx1.font = font;
	ctx1.fillStyle = '#000';
	ctx1.fillText(orden, x+55, y+10);

	d.drawLink(x+55, y+15,link, operacion,w);
    },
    //function to draw the complete process over the canvas element
    dProc:function(etapas, x){
	//dibujo de cuadrados
	var numitems=0;
	var y = 0;
	x = parseInt(x);
	
	d.arrayPc.length=0;

	arrayEtapas = etapas;

	f.c('entra a dProc');
	f.c(etapas);
	//clear canvas
	d.clearCanv(d.c);

	if (!!arrayEtapas){
	    if(etapas.length>0){
		for(var i = 0;i < etapas.length;i++){
		    if(numitems>0){
			y+=90;
		    }
		    //reset the canvas when there are 7 elements on every row
		    if ((numitems % 7)==0){
			x+=250;
			y=0;
		    }
		    
		    numitems++;

		    switch(etapas[i].tipo){
		    case "actividad":
			y+=20;
			d.rectOp(etapas[i], x, y);
			break;
		    case "decision":
			y+=20;
			x+=80;
			d.diamOp(etapas[i], x, y);
			x-=80;
			break;
		    case "proceso":
			y+=60;
			x+=80;
			d.pentOp(etapas[i],x,y,50,0);
			x-=80;
			break;	    
		    case "inilim":
		    case "finlim":
			y+=20;
			d.rectOp(etapas[i], x, y);
			break;
		    case "operacion":
			y+=40;
			d.circleOp(etapas[i], x, y);
			break;
		    case "inspeccion":
			y+=10;
			d.rectOp(etapas[i], x+50, y);
			break;
		    case "transported":
			y+=20;
			d.transOpD(etapas[i], x, y);
			break;
		    case "transportei":
			y+=20;
			d.transOpI(etapas[i], x, y);
			break;
		    case "espera":
			y+=20;
			d.espOp(etapas[i], x, y);
			break;
		    case "almacenamiento":
			y+=20;
			d.almOp(etapas[i], x, y);
			break;
		    default:
			f.c(f.lE('b'));
			break;
		    }
		    //para dibujar las lineas de decisiones
		    if(etapas[i].tipo!="inilim"){
			d.linDec(i);
		    }
		    //para dibujar lineas entre los elementos
		    if (etapas[i].tipo != "inilim"){
			d.linProc(i);
		    }
		}
	    }
	}
    },
    //draw the lines between the decition rombs
    linDec:function(i){

	f.c('linDec');
	for(var i in d.arrayPc){
	    if(d.arrayPc[i].t == "decision"){

		try{
		    var x1 = d.arrayPc[i].x;
		    var y1 = d.arrayPc[i].y;
		    var w1 = d.arrayPc[i].w;
		    var t1 = d.arrayPc[i].t;
		    
		    var itemc = d.arrayPc[i].c[0];
		    var x2 = d.arrayPc[itemc].x;
		    var y2 = d.arrayPc[itemc].y;
		    var w2 = d.arrayPc[itemc].w;
		    var t2 = d.arrayPc[itemc].t;

		    var h = y1 - y2;

		    d.ctx.beginPath();
		    d.ctx.moveTo(x1-(w1/2), y1+(w1/2));
		    d.ctx.lineTo(x1-(w1/2)-60, y1+(w1/2));
		    d.ctx.stroke();

		    d.ctx.beginPath();
		    d.ctx.moveTo(x1-(w1/2)-60, y1+(w1/2));
		    d.ctx.lineTo(x1-(w1/2)-60, y1+(w1/2)-h);
		    d.ctx.stroke();

		    d.ctx.beginPath();
		    d.ctx.moveTo(x1-(w1/2)-60, y1+(w1/2)-h);

		    if(t2=="actividad"){
			d.ctx.lineTo(x1-w1, y1+(w1/2)-h);
		    }
		    if(t2=="decision"){
			d.ctx.lineTo(x1-(w1/2)-60+60, y1+(w1/2)-h);
		    }
		    
		    d.ctx.stroke();

		}catch(e){

		}
	    }
	}
	f.c(d.arrayPc);

	if(i>0){
	    var xd = d.arrayPc[i-1].x + (d.arrayPc[i-1].w)/2;
	    var yd = d.arrayPc[i-1].y+60;
	}
	
	var xh = d.arrayPc[i].x + (d.arrayPc[i].w)/2;
	var yh = d.arrayPc[i].y;
	
    },
    //draw the lines betwen the activities in the process
    linProc:function(i){
	try{
	    if(i>0){
		var xd = d.arrayPc[i-1].x + (d.arrayPc[i-1].w)/2;
		var yd = d.arrayPc[i-1].y+60;
	    }
	    
	    var xh = d.arrayPc[i].x + (d.arrayPc[i].w)/2;
	    var yh = d.arrayPc[i].y;

	    //si es una de las operaciones de abajo para conectar con las de arriba
	    if(i%7==0){
		f.c('entra a modulo de 7 cuando i:'+i);

		if(d.arrayPc[i-1].t=="actividad"){
		    d.ctx.beginPath();
		    d.ctx.moveTo(xd, yd);
		    d.ctx.lineTo(xd, yd+50);
		    d.ctx.stroke();

		    d.ctx.beginPath();
		    d.ctx.moveTo(xd, yd+50);
		    d.ctx.lineTo(xd+120, yd+50);
		    d.ctx.stroke();

		    d.ctx.beginPath();
		    d.ctx.moveTo(xd+120, yd+50);
		    d.ctx.lineTo(xd+120, yd-820);
		    d.ctx.stroke();

		    d.ctx.beginPath();
		    d.ctx.moveTo(xd+120, yd-818);
		    d.ctx.lineTo(xd+220, yd-818);
		    d.ctx.stroke();
		    
		    d.ctx.beginPath();
		    d.ctx.moveTo(xd+220, yd-818);
		    d.ctx.lineTo(xd+220, yd-800);
		    d.ctx.stroke();		
		}
		
		if(d.arrayPc[i-1].t=="decision"){
		    d.ctx.beginPath();
		    d.ctx.moveTo(xd-d.arrayPc[i-1].w/2, yd+40);
		    d.ctx.lineTo(xd-d.arrayPc[i-1].w/2, yd+130);
		    d.ctx.stroke();

		    d.ctx.beginPath();
		    d.ctx.moveTo(xd-d.arrayPc[i-1].w/2, yd+130);
		    d.ctx.lineTo(xd-(d.arrayPc[i-1].w/2)+120, yd+130);
		    d.ctx.stroke();

		    d.ctx.beginPath();
		    d.ctx.moveTo(xd-(d.arrayPc[i-1].w/2)+120, yd+130);
		    d.ctx.lineTo(xd-(d.arrayPc[i-1].w/2)+120, yd-740);
		    d.ctx.stroke();

		    d.ctx.beginPath();
		    d.ctx.moveTo(xd-(d.arrayPc[i-1].w/2)+120, yd-738);
		    d.ctx.lineTo(xd-(d.arrayPc[i-1].w/2)+240, yd-738);
		    d.ctx.stroke();
		    
		    d.ctx.beginPath();
		    d.ctx.moveTo(xd-(d.arrayPc[i-1].w/2)+240, yd-738);
		    d.ctx.lineTo(xd-(d.arrayPc[i-1].w/2)+240, yd-720);
		    d.ctx.stroke();		
		}

		return;    
	    }
	    
	    if((d.arrayPc[i-1].t == "actividad" || d.arrayPc[i-1].t == "inilim") && (d.arrayPc[i].t == "actividad" || d.arrayPc[i].t == "finlim")){
		d.ctx.beginPath();
		d.ctx.moveTo(xd, yd);
		d.ctx.lineTo(xh, yh);
		d.ctx.stroke();
	    }
	    if((d.arrayPc[i-1].t == "actividad" || d.arrayPc[i-1].t == "inilim") && d.arrayPc[i].t == "decision"){
		d.ctx.beginPath();
		d.ctx.moveTo(xd, yd);
		d.ctx.lineTo(xd, yh);
		d.ctx.stroke();
	    }
	    if((d.arrayPc[i-1].t == "decision") && d.arrayPc[i].t == "decision"){
		d.ctx.beginPath();
		d.ctx.moveTo(xd-d.arrayPc[i].w/2, yd+35);
		d.ctx.lineTo(xh-d.arrayPc[i].w/2, yh);
		d.ctx.stroke();
	    }
	    if((d.arrayPc[i-1].t == "actividad") && d.arrayPc[i].t == "proceso"){
		d.ctx.beginPath();
		d.ctx.moveTo(xd-d.arrayPc[i].w/2, yd+35);
		d.ctx.lineTo(xh-d.arrayPc[i].w/2, yh);
		d.ctx.stroke();
		f.c('entra a actividad proceso')
	    }
	    if((d.arrayPc[i-1].t == "proceso") && d.arrayPc[i].t == "actividad"){
		d.ctx.beginPath();
		d.ctx.moveTo(xd-d.arrayPc[i].w/2, yd+35);
		d.ctx.lineTo(xh-d.arrayPc[i].w/2, yh);
		d.ctx.stroke();
		f.c('entra a proceso actividad')
	    }
	    
	    if((d.arrayPc[i-1].t == "actividad") && d.arrayPc[i].t == "operacion"){
		d.ctx.beginPath();
		d.ctx.moveTo(xh-d.arrayPc[i].w/2, yd);
		d.ctx.lineTo(xh-d.arrayPc[i].w/2, yd+30);
		d.ctx.stroke();
		f.c('entra a actividad operacion')
	    }
	    if((d.arrayPc[i-1].t == "operacion") && d.arrayPc[i].t == "actividad"){
		d.ctx.beginPath();
		d.ctx.moveTo(xd-20, yd-20);
		d.ctx.lineTo(xd-20, yh);
		d.ctx.stroke();
		f.c('entra a operacion actividad')
	    }
	    
	    if((d.arrayPc[i-1].t == "decision") && d.arrayPc[i].t == "proceso"){
		d.ctx.beginPath();
		d.ctx.moveTo(d.arrayPc[i-1].x, yd+35);
		d.ctx.lineTo(xh-d.arrayPc[i].w/2, yh-d.arrayPc[i].w);
		d.ctx.stroke();
	    }
	    if((d.arrayPc[i-1].t == "decision") && (d.arrayPc[i].t == "actividad" || d.arrayPc[i].t == "finlim")){
		d.ctx.beginPath();
		d.ctx.moveTo(d.arrayPc[i-1].x, yd+35);
		d.ctx.lineTo(xh, yh);
		d.ctx.stroke();
	    }
	    if((d.arrayPc[i-1].t == "actividad" || d.arrayPc[i-1].t == "inilim") && d.arrayPc[i].t == "proceso"){
		d.ctx.beginPath();
		d.ctx.moveTo(xd, yd);
		d.ctx.lineTo(xh-d.arrayPc[i].w/2, yh-d.arrayPc[i].w);
		d.ctx.stroke();
	    }
	    if((d.arrayPc[i-1].t == "proceso") && d.arrayPc[i].t == "actividad"){
		d.ctx.beginPath();
		d.ctx.moveTo(xh, yd-20);
		d.ctx.lineTo(xh, yh);
		d.ctx.stroke();
	    }
	}catch(e){
	    f.lE();
	}
    },
    //draw pentagon
    pentOp:function(etapas, x, y, radius, rotation){

        var tipo = etapas.tipo;
	var operacion = etapas.nombre;
	var responsable = etapas.responsable;
	var orden = etapas.id;
	var link= etapas.link;
	
	var s=-30;
	var sr=20;
	var yp1 = 10;
	var yp2 = 20;
	var ctx = d.ctx;
	// hexagon
	var numberOfSides = 6,
	    size = radius,
	    Xcenter = x,
	    Ycenter = y;

	d.arrayPc.push({t:tipo,x:x,y:y,w:radius,c:etapas.conexiones});

	ctx.beginPath();
	ctx.moveTo (Xcenter +  size * Math.cos(0), Ycenter +  size *  Math.sin(0));          

	for (var i = 1; i <= numberOfSides;i += 1) {
	    ctx.lineTo (Xcenter + size * Math.cos(i * 2 * Math.PI / numberOfSides), Ycenter + size * Math.sin(i * 2 * Math.PI / numberOfSides));
	}

	ctx.fillStyle = '#ff9';
	ctx.fill();
	ctx.strokeStyle = "#000000";
	ctx.lineWidth = 1;
	ctx.stroke();
	ctx.font = font;
	ctx.fillStyle = '#000';
	ctx.fillText(d.conResp(responsable), x+s, y+yp1);
	ctx.font = font;
	ctx.fillStyle = '#000';
	ctx.fillText(orden, x-20, y-20);

	d.drawLink(x-40, y-10,link,operacion);

    },
    //funnction to search the steps of selected process
    buscarX:function(){
	return d.x;
    },
    //funnction to search the steps of selected process
    buscarProc:function(valProc){

	f.c('entra a buscarProc');
	f.c(d.datosProceso)
	
	var arrayProcs = d.datosProceso;
	var proc;
	
	for(var i=0;i<arrayProcs.length;i++){
	    if (arrayProcs[i]._id==valProc){
		proc = arrayProcs[i].etapas;
		if(arrayProcs[i].x){
		    d.x = arrayProcs[i].x;
		}
	    }
	}

	return proc;
    },
    cargarItems:function(etapas){

	try{

	    d.clearSel();
	    
	    var numitems = etapas.length;
	    
	for(var i =0;i<numitems;i++){
	    
	    var opciontexto=etapas[i].id + ' ' + etapas[i].nombre
	    var opcionvalue=etapas[i].id;
	    // get reference to select element
	    f.addOption(opciontexto, opcionvalue, 'selectoritems')
	}
	}catch(e){
	    f.c(e);
	}
    },
    //function to retrieve response sItem
    sItemRes:function(response){

	f.c(f.lT('guardadoexitoso'));
	f.c(response);

    },
    sItemId:function(response){

	try{
	    f.addOption(response.proceso, response._id, 'procselector')
	    
	}catch(e){
	    f.c(e);
	}
    },
    //function to remove option from select
    rmOption:function(inp1, sel1){
	
	len1 = sel1.options.length;
	for (i=0;i<len1 ;i++ )
	{
	    if (sel1.options[i].value == inp1.value)
	    {
		sel1.options[i] = null;
		//or
		//sel1.remove(i);
		break;
	    }
	}
    },
    
    clearSel:function(){
	try{
	    // get reference to select element
	    var sel = f.g('selectoritems').length=0;
	    // create new option element
	    var opt = document.createElement('option');
	    // create text node to add to option element (opt)
	}catch(e){
	    f.c(e);
	}
    },
    valJson:function(jsonobj){
	for(var key in jsonobj){
	    var val = jsonobj[key];
	    if (!val){
		return false;
	    }
	}
	return true;
    },
    //initialization function
    init:function(){
	f.c('init() -> workflow.js...')
	
	var procs = f.g('procselector');

	d.loadP();
	d.setParam();
	
	procs.addEventListener('click', function(){

	    var valup = procs.value;

	    var etapasProceso = d.buscarProc(procs.value);
	    var xini = d.buscarX();
	    
	    f.c('etapas:');
	    f.c(etapasProceso);
	    f.c('Xini'+xini);
	    //draw process
	    d.dProc(etapasProceso, xini);

	    f.c('arrayPuntos:');
	    f.c(d.arrayPc);

	    d.cargarItems(etapasProceso);
	    
	});

	var addButton = f.g('addAct');
	addButton.addEventListener('click',function(){

	    f.c('hizo click en agregar item');

	    var idproc = f.g('procselector').value
	    var actselector = f.g('actselector').value;
	    var x = parseInt(f.g('actx').value);
	    var y = parseInt(f.g('acty').value);
	    var nombreact = f.g('nombreact').value;
	    var responsableact = f.g('responsableact').value;
	    var conexiones = f.g('conexiones').value;
	    var idact = f.g('idact').value;
	    var link =f.g('link').value;
	    
	    f.c()
	    var etapa = `{"_id":"${idproc}","tipo":"${actselector}", "x":"${x}", "y":"${y}", "nombre":"${nombreact}","responsable":"${responsableact}", "conexiones":"${conexiones}", "id":"${idact}", "link":"${link}"}`

	    f.c('hizo click en agregar item ${idproc}');

	    if(idproc){
	    //enviar peticion al backend para guardar el item como parte del algoritmo
	    f.j(d.sItemRes, etapa,"senditem");
	    }else{
		f.c(f.lE('i'));
	    }
	});

	var removeButton = f.g('eliminaritem');
	removeButton.addEventListener('click',function(){

	    f.c('hizo click en eliminar item');

	    var idprocobj = {_id:f.g('procselector').value, id:f.g('selectoritems').value}
	    //enviar peticion al backend para remover el item como parte del algoritmo
	    if (d.valJson(idprocobj)){
	    f.j(d.sItemRes, idprocobj,"remitem");
	    d.rmOption('selectoritems',f.g('selectoritems'));
	    }else{
		f.c(f.lE('j'));
	    }
	});

	var addProcessButton = f.g('addprocess');
	addProcessButton.addEventListener('click',function(){

	    f.c('hizo click en agregar proceso');

	    var valueproc = f.g('addprocesstext').value;

	    var procjson = f.esc(`{"proceso":"${valueproc}", "x":"0", "etapas":[]}`)
	    var procobj = `{"collection":"d_process", "jsonstring":"${procjson}"}`

	    if(valueproc){
		f.j(d.sItemRes, procobj, "addrecordmongo");
		
		//remover el texto del cuadro
		f.g('addprocesstext').value=""
		//d.addOption(,valueproc);
	    }else{
		f.c(f.lE('h'));
    	    }
	    
	});

	var showProc = f.g('divprocshow');

	showProc.addEventListener('click',function(){

	    var dispb = f.g('menuproceditor');
	    
	    if(dispb.style.display == 'block'){
		dispb.style.display='none';
	    }else{
		dispb.style.display='block';
	    }
	});

	var canvas = f.g('myCanvas');
	var maxCanvas = f.g('maxcanvas');
	var booleanMax = false;

	var styleArr = [];
	
	//style list to restore
	var wc = canvas.width;
	var hc = canvas.height;

	styleArr.push(canvas.style.overflow);
	styleArr.push(canvas.style.margin);
	styleArr.push(canvas.style.position);
	styleArr.push(canvas.style.top);
	styleArr.push(canvas.style.left);

	maxCanvas.addEventListener('click',function(){

	    if(!booleanMax){
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		canvas.style.overflow='hidden';
		canvas.style.margin='auto 0';
		canvas.style.position='absolute';
		canvas.style.top='120px';
		canvas.style.left='0px';
		booleanMax=true;

	    }else{
		//entra a restaurar como estaba previamente
		canvas.width = wc;
		canvas.height = hc;
		canvas.style.overflow=styleArr[0];
		canvas.style.margin=styleArr[1];
		canvas.style.position=styleArr[2];
		canvas.style.top=styleArr[3];
		canvas.style.left=styleArr[4];
		booleanMax=false;
	    }
	    f.g('procselector').click();
	});
    }
}

/*
class rectangulo{
    let giro = 0;
    let ancho = 0;
    let largo = 0;
    let canvas = '';
    
    dibujar(x, y){
	
    };
    
    constructor(ancho, largo){
	this.ancho=ancho;
	this.largo=largo;
    }
}

class circulo{
    let radio = 0;

    dibujar(x, y){

    };
    constructor(radio){
	this.radio=radio;
    }
}

class cuadrado{
    let lado = 0;

    dibujar(){

    }
    constructor(lado){
	this.lado=lado;
    }
}
*/
