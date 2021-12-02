/*
Library to serve the chat application websocket
*/
const fn = require('./modules/functions.js'); 
const pathproperties =  __dirname + '/conf/conf.properties';
const properties = fn.loadProperties(pathproperties); 
const cwsport = properties.get('app.cwsport');

const WebSocket = require('ws'),
      server = new WebSocket.Server({
	  port:cwsport,
      });

function broadcast(data){
    server.clients.forEach(ws=>{
	console.log(data);
	ws.send(data);
    });
}

server.on('connection', ws=>{
    ws.on('message', data=>{
	console.log(data);
	broadcast(data);
    })
})
