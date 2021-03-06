// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

server.listen(port, function () {
	console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(__dirname + '/public'));

// Chatroom

var numUsers = 0;
var triplets= [];

io.on('connection', function (socket) {
	var addedUser = false;
	
	// when the client emits 'new message', this listens and executes
	socket.on('new message', function (data) {
		// we tell the client to execute 'new message'
		//console.log(data.sujet);
		//console.log(data.propriete);
		//console.log(data.objet);
		var triplet={
			sujet : data.sujet,
			propriete: data.propriete,
			objet:data.objet
		};
		triplets.push(triplet);
		socket.broadcast.emit('new message', {
			username: socket.username,
			message: data
		});
	});

// when the client emits 'add user', this listens and executes
socket.on('add user', function (username) {
if (addedUser) return;

// we store the username in the socket session for this client
socket.username = username;
++numUsers;
addedUser = true;

var triplet={
sujet : username,
propriete: "type",
objet:"Joueur"
};
triplets.push(triplet);
//console.log(triplets);

socket.emit('login', {
numUsers: numUsers,
triplets: triplets
});
// echo globally (all clients) that a person has connected
socket.broadcast.emit('user joined', {
username: socket.username,
numUsers: numUsers
});
});

// when the client emits 'typing', we broadcast it to others
socket.on('typing', function () {
socket.broadcast.emit('typing', {
username: socket.username
});
});

// when the client emits 'stop typing', we broadcast it to others
socket.on('stop typing', function () {
socket.broadcast.emit('stop typing', {
username: socket.username
});
});

// when the user disconnects.. perform this
socket.on('disconnect', function () {
if (addedUser) {
--numUsers;

// echo globally that this client has left
socket.broadcast.emit('user left', {
username: socket.username,
numUsers: numUsers
});
}
});
});
