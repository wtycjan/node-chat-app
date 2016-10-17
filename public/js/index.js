var socket = io();

socket.on('connect', function() {
	console.log('Connected to server');
});

socket.on('disconnect', function() {
	console.log('Disconnected from server');
});


socket.on('newMessage', function(message) {
	console.log('newMessage: ', message);
	var li = $('<li></li>');
	li.text(`${message.from}: ${message.text}`);


	$('#messages').append(li);
});

socket.on('newLocationMessage', function(message) {
	var li = $('<li></li>');
	var a = $('<a target="_blank">My current location</a>');

	li.text(`${message.from}: `);
	a.attr('href', `${message.url}`);

	li.append(a);
	$('#messages').append(li);
});

$('#message-form').on('submit', function(e) {
	e.preventDefault();

	var messageTextbox = $('[name="message"]');

	socket.emit('createMessage', {
		from: 'User',
		text: messageTextbox.val()
	},
	// A callback we're passing to the createMessage listener in server.js
	function() {
		messageTextbox.val('');
	});
});

var locationButton = $('#send-location');

locationButton.on('click', function() {
	if (!navigator.geolocation) {
		return alert('Geolocation is not supported by your browser!');
	}

	// Prevent user from spamming Send Location button
	locationButton.attr('disabled', 'disabled').text('Sending location...');

	// Grab current position of the device
	navigator.geolocation.getCurrentPosition(function(position) {

		// Once Send Location has finished location, re-enable button event
		locationButton.removeAttr('disabled').text('Send location');

		socket.emit('createLocationMessage', {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		})
	}, function() {
		locationButton.removeAttr('disabled').text('Send location');
		alert('Unable to fetch location');
	});
});




