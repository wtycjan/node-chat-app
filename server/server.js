const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage } = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

// var server = app.listen(3000);
// var io = require('socket.io').listen(server);

app.use(express.static(publicPath));

/* Listens for a new connection
 *
 * @param {string} socket - individual connected socket
 */
io.on('connection', (socket) => {
	console.log('New user connected');

	// Emits an event to a single connection
	socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

	// Emits to every connection but current user
	socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

	socket.on('createMessage', (message, callback) => {
		console.log('createMessage: ', message);
		io.emit('newMessage', generateMessage(message.from, message.text));

		callback('This is from the server');
	});

	socket.on('disconnect', () => {
		console.log('User was disconnected');
	});
});

server.listen(port, () => {
	console.log(`Listening on port ${port}`);
});