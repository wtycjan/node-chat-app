const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');
const { Users } = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

/* Listens for a new connection
 *
 * @param {string} socket - individual connected socket
 */
io.on('connection', (socket) => {
	console.log('New user connected');

	// Grab user name and chat room url parameters
	socket.on('join', (params, callback) => {
		if (!isRealString(params.name) || !isRealString(params.room)) {
			return callback('Name and room name are required.');
		}

		// When user submits proper info, join proper room
		socket.join(params.room);
		users.removeUser(socket.id);
		users.addUser(socket.id, params.name, params.room);

		io.to(params.room).emit('updateUserList', users.getUserList(params.room));

		// Emits an event to a single connection
		socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

		// Emits to every connection (in the room) except current user
		socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));

		callback();
	});

	socket.on('createMessage', (message, callback) => {
		console.log('createMessage: ', message);
		io.emit('newMessage', generateMessage(message.from, message.text));

		callback();
	});

	socket.on('createLocationMessage', (coords) => {
		io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
	});

	socket.on('disconnect', () => {
		var user = users.removeUser(socket.id);

		// If user was removed, we're going to emit two events to everyone in chat room
		if (user) {
			io.to(user.room).emit('updateUserList', users.getUserList(user.room));
			io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
		}
	});
});

server.listen(port, () => {
	console.log(`Listening on port ${port}`);
});