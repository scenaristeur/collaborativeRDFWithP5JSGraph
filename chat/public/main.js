$(function() {
	
	var FADE_TIME = 150; // ms
	var TYPING_TIMER_LENGTH = 400; // ms
	var COLORS = [
		'#e21400', '#91580f', '#f8a700', '#f78b00',
		'#58dc00', '#287b00', '#a8f07a', '#4ae8c4',
		'#3b88eb', '#3824aa', '#a700ff', '#d300e7'
	];
	
	// Initialize variables
	var $window = $(window);
	var $usernameInput = $('.usernameInput'); // Input for username
	var $messages = $('.messages'); // Messages area
	// var $inputMessage = $('.inputMessage'); // Input message input box
	var $sujetInput = $('.sujetInput'); // Sujet input box
	var $proprieteInput = $('.proprieteInput'); // propriete input box
	var $objetInput = $('.objetInput'); // Objet input box
	
	var $loginPage = $('.login.page'); // The login page
	var $chatPage = $('.chat.page'); // The chatroom page
	
	// Prompt for setting a username
	var username;
	var connected = false;
	var typing = false;
	var lastTypingTime;
	var $currentInput = $usernameInput.focus();
	
	var socket = io();
	
	function addParticipantsMessage (data) {
		var message = '';
		if (data.numUsers === 1) {
			message += "there's 1 participant";
			} else {
			message += "there are " + data.numUsers + " participants";
		}
		log(message);
	}
	
	// Sets the client's username
	function setUsername () {
		username = cleanInput($usernameInput.val().trim());
		
		// If the username is valid
		if (username) {
			$loginPage.fadeOut();
			$chatPage.show();
			$loginPage.off('click');
			//$currentInput = $inputMessage.focus();
			$currentInput = $sujetInput.focus();
			
			// Tell the server your username
			socket.emit('add user', username);
		}
	}
	
	// Sends a chat message
	function sendMessage () {
		
		if ( $sujetInput.val() == ''){
			$sujetInput.val($sujetInput.attr('placeholder'));
		}
		
	    if ( $proprieteInput.val() == ''){
			$proprieteInput.val($proprieteInput.attr('placeholder'));
		}
		if ( $objetInput.val() == ''){
			$objetInput.val($objetInput.attr('placeholder'));
		}
		
		
		var message={};
		// Prevent markup from being injected into the message
		message.sujet = cleanInput($sujetInput.val());
		message.propriete  = cleanInput($proprieteInput.val());
		message.objet= cleanInput($objetInput.val());
		
		// if there is a non-empty message and a socket connection
		if (message && connected) {
			$sujetInput.focus();
			$sujetInput.attr("placeholder", $sujetInput.val());
			$proprieteInput.attr("placeholder", $proprieteInput.val());
			$objetInput.attr("placeholder", $objetInput.val());
			$sujetInput.val('');
			$proprieteInput.val('');
			$objetInput.val('');
			addChatMessage({
				username: username,
				message: message
			});
			// tell server to execute 'new message' and send along one parameter
			socket.emit('new message', message);
		}
	}
	
	// Log a message
	function log (message, options) {
		var $el = $('<li>').addClass('log').text(message);
		addMessageElement($el, options);
	}
	
	// Adds the visual chat message to the message list
	function addChatMessage (data, options) {
		// Don't fade the message in if there is an 'X was typing'
		var $typingMessages = getTypingMessages(data);
		options = options || {};
		if ($typingMessages.length !== 0) {
			options.fade = false;
			$typingMessages.remove();
		}
		
		//	console.log(data.message);
		var sujet=data.message.sujet;
		var propriete=data.message.propriete;
		var objet=data.message.objet;
		var triplet=sujet+" "+propriete+" "+objet;
		//console.log(triplet);
		if(sujet != 'is typing'){
			var newStatement = new Statement(sujet, propriete, objet);
			newStatement.add2Statements();
		} 
		
		var $usernameDiv = $('<span class="username"/>')
		.text(data.username)
		.css('color', getUsernameColor(data.username));
		var $messageBodyDiv = $('<span class="messageBody">')
		.text(triplet.toString());
		
		var typingClass = data.typing ? 'typing' : '';
		var $messageDiv = $('<li class="message"/>')
		.data('username', data.username)
		.addClass(typingClass)
		.append($usernameDiv, $messageBodyDiv);
		
		addMessageElement($messageDiv, options);
	}
	
	// Adds the visual chat typing message
	function addChatTyping (data) {
		data.typing = true;
		data.message={};
		data.message.sujet = 'is typing';
		data.message.propriete = '';
		data.message.objet = '';
		addChatMessage(data);
	}
	
	// Removes the visual chat typing message
	function removeChatTyping (data) {
		getTypingMessages(data).fadeOut(function () {
			$(this).remove();
		});
	}
	
	// Adds a message element to the messages and scrolls to the bottom
	// el - The element to add as a message
	// options.fade - If the element should fade-in (default = true)
	// options.prepend - If the element should prepend
	//   all other messages (default = false)
	function addMessageElement (el, options) {
		var $el = $(el);
		
		// Setup default options
		if (!options) {
			options = {};
		}
		if (typeof options.fade === 'undefined') {
			options.fade = true;
		}
		if (typeof options.prepend === 'undefined') {
			options.prepend = true;
		}
		
		// Apply options
		if (options.fade) {
			$el.hide().fadeIn(FADE_TIME);
		}
		if (options.prepend) {
			$messages.prepend($el);
			} else {
			$messages.append($el);
		}
		$messages[0].scrollTop = $messages[0].scrollHeight;
	}
	
	// Prevents input from having injected markup
	function cleanInput (input) {
		return $('<div/>').text(input).text();
	}
	
	// Updates the typing event
	function updateTyping () {
		if (connected) {
			if (!typing) {
				typing = true;
				socket.emit('typing');
			}
			lastTypingTime = (new Date()).getTime();
			
			setTimeout(function () {
				var typingTimer = (new Date()).getTime();
				var timeDiff = typingTimer - lastTypingTime;
				if (timeDiff >= TYPING_TIMER_LENGTH && typing) {
					socket.emit('stop typing');
					typing = false;
				}
			}, TYPING_TIMER_LENGTH);
		}
	}
	
	// Gets the 'X is typing' messages of a user
	function getTypingMessages (data) {
		return $('.typing.message').filter(function (i) {
			return $(this).data('username') === data.username;
		});
	}
	
	// Gets the color of a username through our hash function
	function getUsernameColor (username) {
		// Compute hash code
		var hash = 7;
		for (var i = 0; i < username.length; i++) {
			hash = username.charCodeAt(i) + (hash << 5) - hash;
		}
		// Calculate color
		var index = Math.abs(hash % COLORS.length);
		return COLORS[index];
	}
	
	// Keyboard events
	
	$window.keydown(function (event) {
		// Auto-focus the current input when a key is typed
		if (!(event.ctrlKey || event.metaKey || event.altKey)) {
			//$currentInput.focus();
		}
		// When the client hits ENTER on their keyboard
		if (event.which === 13) {
			if (username) {
				sendMessage();
				socket.emit('stop typing');
				typing = false;
				} else {
				setUsername();
			}
		}
	});
	
	$sujetInput.on('input', function() {
		updateTyping();
	});
	$proprieteInput.on('input', function() {
		updateTyping();
	});
	$objetInput.on('input', function() {
		updateTyping();
	});
	
	// Click events
	
	// Focus input when clicking anywhere on login page
	$loginPage.click(function () {
		$currentInput.focus();
	});
	
	// Focus input when clicking on the message input's border
	$sujetInput.click(function () {
		$sujetInput.focus();
	});
	
	// Focus input when clicking on the message input's border
	$proprieteInput.click(function () {
		$proprieteInput.focus();
	});
	
	// Focus input when clicking on the message input's border
	$objetInput.click(function () {
		$objetInput.focus();
	});
	
	// Socket events
	
	// Whenever the server emits 'login', log the login message
	socket.on('login', function (data) {
		connected = true;
		var triplets=data.triplets;
		//console.log(triplets);
		// Display the welcome message
		var message = "Welcome to DreamCatcher (Smag0) Socket.IO Chat – ";
		log(message, {
			prepend: true
		});
		addParticipantsMessage(data);
				for (triplet of triplets){
			var newStatement = new Statement(triplet.sujet, triplet.propriete, triplet.objet); 
			newStatement.add2Statements();
		}
		$sujetInput.attr("placeholder", username);
		$proprieteInput.attr("placeholder", "type");
		$objetInput.attr("placeholder", "Joueur");
		
		
		
	});
	
	// Whenever the server emits 'new message', update the chat body
	socket.on('new message', function (data) {
					var options={};
				options.prepend=true;
		addChatMessage(data);
	});
	
	// Whenever the server emits 'user joined', log it in the chat body
	socket.on('user joined', function (data) {
		log(data.username + ' joined');
		addParticipantsMessage(data);
				var newStatement = new Statement(data.username, "type", "Joueur"); 
		newStatement.add2Statements();
	});
	
	// Whenever the server emits 'user left', log it in the chat body
	socket.on('user left', function (data) {
		log(data.username + ' left');
		addParticipantsMessage(data);
		removeChatTyping(data);
	});
	
	// Whenever the server emits 'typing', show the typing message
	socket.on('typing', function (data) {
		addChatTyping(data);
	});
	
	// Whenever the server emits 'stop typing', kill the typing message
	socket.on('stop typing', function (data) {
		removeChatTyping(data);
	});
	
	
		//test agents EVEJS
	// create two agents
	var agent1 = new HelloAgent('agent1');
	var agent2 = new HelloAgent('agent2');
	var agent3 = new SourceAgent('agent3');
	// send a message to agent1
	agent2.send('agent3', 'Hello agent3!');
	agent3.send('agent2', 'Hello agent2!');
	agent3.send('agent1', 'Hello agent1!');
	
	for (i=10;i<21;i++){
		var agenti = new SourceAgent('agent'+i);
		agenti.send('agent1', 'Hello agent1!');
	}
});
