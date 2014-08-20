var http = require('http');
var express = require('express');
var websockets = require('./ws');

var server = express();

server.use(express.static(__dirname+"/app"));

http.createServer(server).listen(5000, function() {
	console.log("El APP node.js esta corriendo en %d", this.address().port);
	websockets(this);
});
