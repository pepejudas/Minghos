const v = {
    creaASug:function(){
        try{
        //este codigo debe ser reemplazado por el del frameworkm.js:1650
            const vet0 = new AutoSug ('nodocumentopac', 'd_person', ['nombre', 'apellido', 'nodocumento', 'celular'])
	    const vet1 = new AutoSug ('nodocumentoes', 'd_specialist', ['nombre', 'apellido', 'nodocumento', 'celular'])
            const vet2 = new AutoSug ('diagnosticoprincipal', 's_cie10', ['descripcion', 'nombre_capitulo', 'descripcion_cuatro'])
            const vet3 = new AutoSug ('diagnosticosecundario', 's_cie10', ['descripcion', 'nombre_capitulo', 'descripcion_cuatro'])
            const vet4 = new AutoSug ('diagnosticorelacionado', 's_cie10', ['descripcion', 'nombre_capitulo', 'descripcion_cuatro'])
        }catch(e){
            f.c(e)
        }
    },
    init:function(){
	v.creaASug();
    }
}
