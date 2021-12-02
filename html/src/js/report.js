/**
   Library to generate reports dinamically with html and pdf
**/
const r = {
    init:function(){
	try{
	    f.g('reporthtml').innerHTML="<div id='reportgen' contenteditable='true'></div>";
	    //agregar barra de herramientas de editor de textos
	    let propiedad = 'format-bold';
	    
	    f.g('format-bold').addEventListener('click', function(){
		f.c('ha hecho click en format-bold');
		let sel = window.getSelection();
		let text = document.selection.createRange().text;
		let selRange = sel.getRangeAt(0);
		if(selRange.commonAncestorContainer.data.toString().includes('<b>')){
		    selRange.commonAncestorContainer.data = `<b>${selRange.commonAncestorContainer.data}</b>`;
		}else{
		    selRange.commonAncestorContainer.data = `${selRange.commonAncestorContainer.data}`;
		}
		
		//let itm = f.g('reportgen');
		//itm.innerHTML = itm.innerHTML.replace(sel, `<b>${sel}</b>`);
		f.c(selRange);
	    });
	}catch(e){
	    f.c(e);
	}
    }
};
