var http = require('http');
var express = require('express');
var websockets = require('./ws');

var server = express();

server.use(express.static(__dirname+"/app"));

server.set('port', process.env.PORT || 3000);

http.createServer(server).listen(server.get('port'), function() {
	console.log("El APP node.js esta corriendo en %d", server.get('port'));
	websockets(this);
});
