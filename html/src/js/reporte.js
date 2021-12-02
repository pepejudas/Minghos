const r = {
    //contenedor del formulario de reporte un div editable
    gridc:'grid-container',
    colprinc:'d_report_content',
    init:function(){
	f.c('entra a init() function');

	f.g('#loadcontent').addEventListener('click', function(){
	    var pdf = new jsPDF('p', 'pt', 'letter');
	    pdf.canvas.height = 72 * 11;
	    pdf.canvas.width = 72 * 8.5;
	    pdf.fromHTML(f.rTran(f.g('reportext').value));

	    let d = new Date();
	    
	    pdf.setProperties({
		title: 'Title',
		subject: `This is the subject ${d}`,
		author: 'James Rodriguez',
		keywords: 'generated, javascript, web 2.0, ajax',
		creator: 'Test'
	    });
	    
	    pdf.save('test.pdf');
	});

	/*
	f.g('#loadcontent').addEventListener('click', function(){
	    let idrep = f.g('_id').value
	    if(idrep!==""){
		let jsonString = `{"id_report":"${idrep}"}`;
                
                jsonString=encodeURIComponent(jsonString);

		let sendjson = `{"_id":"","collection":"${r.colprinc}","conditions":"${jsonString}"}`;
		
		f.r({url:'loadcollection', params:sendjson})
                    .then(r => {
			try{
                            let data = JSON.parse(r.target.responseText)
			    if(data.length>0){
				f.g('contentreport').innerHTML = data[0].content
				f.g('id_report').value = data[0].id_report
			    }else{
				f.g('contentreport').innerHTML = ""
				f.g('id_report').value = ""
			    }
			}catch(e){
                            f.c(e)
			}
                    });
	    }
    });
*/
	
	f.g('#updatereport').addEventListener('click', function(){
	    let idreporte = f.g('_id').value
	    let idcontent = f.g('id_report').value
	    
	    if(idreporte !== ""){
		let contentreport = f.g('contentreport').value
		
		var currentTime = new Date();
		let jsonString = `{"id_report":"${idcontent}", "fecha":"${currentTime}", "content":${contentreport}}`;
		jsonString=encodeURIComponent(jsonString);
		let sendjson = `{"_id":"${idreporte}","collection":"${r.colprinc}","jsonString":"${jsonString}"}`;
		
		f.c('jsonString print after esc');
		f.c(jsonString);
		
		f.r({url:'saveform', params:sendjson})
                    .then(r => {
			try{
                            var data = JSON.parse(r.target.responseText)
                            var sel = document.getElementById('odoption');
			}catch(e){
                            f.c(e)
			}
                    });
	    }
	});

	f.g('reportext').rows = "30";
	f.g('reportext').cols = "30";
	//f.g(r.gridc).innerHTML = f.rTran(`<input type='text' id='id_report'><div class="completo" id="contentreport" contenteditable="true">{{defectoreporte}}</div>`)
    }
}
