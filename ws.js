module.exports = function(server) {
	var sio = require("socket.io")

	var ws = sio.listen(server)

	ws.on('connection', function(socket) {
		socket.emit('ready');
		socket.on('mensaje', function(msg) {
			socket.broadcast.emit('mensaje', msg);
		});
	});
};