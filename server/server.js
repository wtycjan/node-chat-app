var path = require('path');
var http = require('http');
var express = require('express');
var socketIO = require('socket.io');

var publicPath = path.join(__dirname, '../public');
var port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

/* Listens for a new connection
 *
 * @param {string} socket - individual connected socket
 */
io.on('connection', (socket) => {
	console.log('New user connected');

	// Method emits an event to a single connection
	// socket.emit('newMessage', {
	// 	from: 'Server side',
	// 	text: 'Hello there',
	// 	createdAt: new Date()
	// });

	socket.on('createMessage', (message) => {
		console.log('createMessage: ', message);

		// Method emits to every connection
		io.emit('newMessage', {
			from: message.from,
			text: message.text,
			createdAt: new Date().getTime()
		});
	});

	socket.on('disconnect', () => {
		console.log('User was disconnected');
	});
});

server.listen(port, () => {
	console.log(`Listening on port ${port}`);
});