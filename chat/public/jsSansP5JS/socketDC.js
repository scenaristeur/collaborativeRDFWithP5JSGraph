function initSession() {
  var websocketDreamCatcher;
  var testjson = {
    type: "test"
  };
  var dataToSend = JSON.stringify(testjson);
  initSocket(dataToSend);
}



function initSocket(data) {
  //recuperation des projets
  var messagesList = document.getElementById('messages');
  var connectList = document.getElementById('connect');
  // Create a new WebSocket.
  var openshiftWebSocketPort = 8000; // Or use 8443 for wss
 // var wsUriDreamCatcher = "ws://" + window.location.hostname + ":" + openshiftWebSocketPort + "/dreamcatcherSession";
   var wsUriDreamCatcher = "ws://" + "smag-smag0.rhcloud.com" + ":" + openshiftWebSocketPort + "/dreamcatcherSession";
  websocketDreamCatcher = new WebSocket(wsUriDreamCatcher);


  websocketDreamCatcher.onopen = function(event) {
    //socketStatusListe.innerHTML = 'Connected to: ' + event.currentTarget.url;
    //socketStatusListe.className = 'open';
    socketConnected = true;
   // connectList.innerHTML = "<li>CONNECTE</li>";
    console.log("open");
   // websocketDreamCatcher.send(data);
  };

  websocketDreamCatcher.onerror = function(error) {
    console.log('WebSocket Liste Error: ' + error);
   // connectList.innerHTML = "<li>DECONNECTE</li>";
  };


  // Show a disconnected message when the WebSocket is closed.
  websocketDreamCatcher.onclose = function(event) {
    socketConnected = false;
    // var sketch = Processing.getInstanceById( getProcessingSketchId() );
    // sketch.session=null;
   // connectList.innerHTML = "<li>DECONNECTE</li>";
    console.log("close") //socketStatusListe.innerHTML = 'Disconnected from WebSocket ListeProjets.';
      //socketStatusListe.className = 'closed';
  };

  //recupere ListeProjets
  websocketDreamCatcher.onmessage = function(event) {
    var message = event.data;
    console.log(event.data);
    obj = JSON.parse(event.data);
    var i = 0;
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
       // connectList.innerHTML = '<li class="received">' + obj["nombre"] + ' utilisateurs connectes</li>';
        // messagesList.innerHTML='<li class="received">'+obj["message"]+'</li>';
        if (obj["type"] == "synchro") {
          delete obj["type"];
          console.log("reponse de synchro après add ");
          for (var key in obj) {
            if (obj.hasOwnProperty(key)) {

              console.log(obj[key].sujet + " " + obj[key].propriete + " " + obj[key].objet);
              var sujet = obj[key].sujet;
              var propriete = obj[key].propriete;
              var objet = obj[key].objet;
              console.log("Retour " + sujet + " " + propriete + " " + objet);
             // messagesList.innerHTML = sujet + " " + propriete + " " + objet;
              //  var sketch = Processing.getInstanceById( getProcessingSketchId() );
              //    sketch.ajouteInformationFromOthers(sujet,propriete,objet) ;
            };
          }


        } else
        if (obj["type"] == "nouveauNoeud") {
          console.log("nouveauNoeud");
          var messageRetour = obj["message"];
          console.log("Retour " + messageRetour);
        //  messagesList.innerHTML = messageRetour;
        } else
        if (obj["type"] == "nouvelleInfo") {
          console.log("nouvelleInfo");
          var sujet = obj["sujet"];
          var propriete = obj["propriete"];
          var objet = obj["objet"];
          console.log("Retour " + sujet + " " + propriete + " " + objet);
        //  messagesList.innerHTML = sujet + " " + propriete + " " + objet;
          var statement = new Statement(sujet, propriete, objet);
          // var sketch = Processing.getInstanceById( getProcessingSketchId() );
          //  sketch.ajouteInformationFromOthers(sujet,propriete,objet);
          break;
        } else
        if (obj["type"] == "conversion") {
          console.log("retour Conversion");

          retourConversionexport("test");
          break;
        }
      }
    }
    return websocketDreamCatcher;
  }
}