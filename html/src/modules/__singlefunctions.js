function pTC(text){
    if (debugMode){
	console.log(text);
    }
}

function pTClear(){
    console.log('\033[2J');
}

function nameApp(){
    return nameApp;
}

module.export.pTC=pTC;
module.export.pTClear=pTClear;
module.export.nameApp=nameApp;
