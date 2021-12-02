/**
 *module to get OS information and log into de console when the app start
 */
const path = require('path');
var pathObj = path.parse(__filename);
const fn = require('./functions.js');
const os = require('os');

fn.lM(pathObj)

function getOSInfo(){
    var totalMemory=(os.totalmem()/1000000).toFixed(2);
    var freeMemory=(os.freemem()/1000000).toFixed(2);
    var ops = os.type();
    var opsp = os.platform();
    var upt = os.uptime();
    var cpus = os.cpus();
    var ncpus = cpus.length;
    
    fn.c(`{\n Operative System: ${opsp}:${ops}`);
    fn.c(` Total Memory: ${totalMemory}M`);
    fn.c(` Free Memory: ${freeMemory}`);
    fn.c(` UpTime: ${upt}M\n}`);
    fn.c(` Number of CPUS: ${ncpus}`);
    fn.c(cpus[0]);
}

getOSInfo();
