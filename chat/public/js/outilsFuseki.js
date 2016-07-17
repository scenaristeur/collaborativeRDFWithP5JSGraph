function chargeData(dataset) {
  // JSON EN JS : http://www.json.org/js.html
  //http://docs.publishmydata.com/developers/270_example_using_javascript_to_request_data_from_sparql_endpoint.html
  //http://www.w3.org/TR/rdf-sparql-json-res/
 // console.log(dataset);
  // var queryEndpoint="http://127.0.0.1:3030/dc/query?";
  //  var queryTest="?query=select+*+where+%7B%3Fs+%3Fp+%3Fo+%7D&output=json";
  var location = window.location.protocol + "//" + window.location.host;
  console.log("loc " + location);
  console.log(window.location.port);
  //var url =location+"/dc/query?query=select+*+where+%7B%3Fs+%3Fp+%3Fo+%7D&output=json";
  var url = "http://127.0.0.1:3030/dc/query?query=select+*+where+%7B%3Fs+%3Fp+%3Fo+%7D&output=json";


//  var siteDomain = "fuseki-smag0.rhcloud.com"
var siteDomain="rdf-smag0.rhcloud.com/";
  var dataset = "ds";
//requete OK : var query = "SELECT * WHERE {?s ?p  ?o  } LIMIT 50 OFFSET 150"; //<http://smag0.blogspot.fr/ns/smag0#Projet>
//  var query = "SELECT * WHERE {?s ?p  ?o  } LIMIT 100 OFFSET 1100"; //<http://smag0.blogspot.fr/ns/smag0#Projet>
  //  var query = "SELECT * WHERE {?s ?p  ?o  } LIMIT 100 OFFSET 1100"; //<http://smag0.blogspot.fr/ns/smag0#Projet>
 // var query = "SELECT * WHERE {?s ?p  ?o  } ";
  var query = "SELECT * WHERE {?s ?p ?o. ?s <http://www.w3.org/1999/02/22-rdf-syntax-ns#type>	<http://smag0.blogspot.fr/NS/RobotBase#Robot> } LIMIT 10";
  
 // var query = "SELECT * WHERE {?s ?p  ?o  }";
  var url = "http://" + siteDomain + "/" + dataset + "/query?query=";
  url += encodeURIComponent(query) + "&output=json";
  loadJSON(url, drawNoeuds);

}

function drawNoeuds(jsonRes) {
  var statements = jsonRes.results.bindings;
  // console.log(statements);
  statements.forEach(createStatementsJson);
}

function createStatementsJson(statement, index, ar) {
  //   console.log("statement: " + statement + " index: " + index);

//  console.log(statement);
  var sujet = statement.s.value;
  var propriete = statement.p.value;
  var objet = statement.o.value;

  var statementDraw = new Statement(sujet, propriete, objet);
}