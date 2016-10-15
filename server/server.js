const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
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

	socket.emit('newMessage', {
		from: 'Server side',
		text: 'Hello there',
		createdAt: new Date()
	});

	socket.on('createMessage', (message) => {
		console.log('createMessage: ', message)
	});

	socket.on('disconnect', () => {
		console.log('User was disconnected');
	});
});

server.listen(port, () => {
	console.log(`Listening on port ${port}`);
});