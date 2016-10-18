var socket = io();

// Scroll to bottom chat area
function scrollToBottom() {
	var messages = $('#messages');
	var newMessage = messages.children('li:last-child');

	// Heights
	var clientHeight = messages.prop('clientHeight');
	var scrollTop = messages.prop('scrollTop');
	var scrollHeight = messages.prop('scrollHeight');
	var newMessageHeight = newMessage.innerHeight();
	var lastMessageHeight = newMessage.prev().innerHeight();

	if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
		messages.scrollTop(scrollHeight);
	}
}

socket.on('connect', function() {
	var params = $.deparam(window.location.search);

	socket.emit('join', params, function(err) {
		if (err) {
			alert(err);
			window.location.href = '/';
		} else {
			console.log('No error');
		}
	});
});

socket.on('disconnect', function() {
	console.log('Disconnected from server');
});

socket.on('updateUserList', function(users) {
	var ol = $('<ol></ol>');

	users.forEach(function(user) {
		ol.append($('<li>' + user + '</li>'));
	});

	$('#users').html(ol);
});


socket.on('newMessage', function(message) {
	var template = $('#message-template').html();
	var formattedTime = moment(message.createdAt).format('h:mm a');
	var html = Mustache.render(template, {
		text: message.text,
		from: message.from,
		createdAt: formattedTime
	});

	$('#messages').append(html);
	scrollToBottom();
});

socket.on('newLocationMessage', function(message) {
	var template = $('#location-message-template').html();
	var formattedTime = moment(message.createdAt).format('h:mm a');
	var html = Mustache.render(template, {
		from: message.from,
		url: message.url,
		createdAt: formattedTime
	});

	$('#messages').append(html);
	scrollToBottom();
});

$('#message-form').on('submit', function(e) {
	e.preventDefault();

	var messageTextbox = $('[name="message"]');

	socket.emit('createMessage', {
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




