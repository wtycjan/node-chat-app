var socket = io();

socket.on('connect', function() {
	console.log('Connected to server');
});

socket.on('newMessage', function(message) {
	console.log('newMessage: ', message);
});

socket.on('disconnect', function() {
	console.log('Disconnected from server');
});

socket.emit('createMessage', {
	from: 'Client',
	text: 'Creating from client side'
}, function(data) {
	console.log('Got it', data);
});