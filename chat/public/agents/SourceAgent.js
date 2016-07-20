  /**
   * Custom agent prototype
   * @param {String} id
   * @constructor
   * @extend eve.Agent
   */
  function SourceAgent(id) {
    // execute super constructor
    eve.Agent.call(this, id);

    // connect to all transports configured by the system
    this.connect(eve.system.transports.getAll());
  }

  // extend the eve.Agent prototype
  SourceAgent.prototype = Object.create(eve.Agent.prototype);
  SourceAgent.prototype.constructor = SourceAgent;

  /**
   * Send a greeting to an agent
   * @param {String} to
   */
  SourceAgent.prototype.sayHello = function(to) {
    this.send(to, 'Hello ' + to + '!');
  };

  /**
   * Handle incoming greetings. This overloads the default receive,
   * so we can't use SourceAgent.on(pattern, listener) anymore
   * @param {String} from     Id of the sender
   * @param {*} message       Received message, a JSON object (often a string)
   */
  SourceAgent.prototype.receive = function(from, message) {
    console.log(from + ' said: ' + JSON.stringify(message) + '<br>');

    if (message.indexOf('Hello') === 0) {
      // reply to the greeting
      this.send(from, 'Hi ' + from + ', nice to meet you!');
	  var agent4 = new SourceAgent('agent4');
	  agent4.send('agent1', 'Hello agent1!');
    }
  };
